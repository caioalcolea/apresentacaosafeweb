const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3080;
const HOST = process.env.HOST || '0.0.0.0';

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || '*'
}));

// Compression
app.use(compression());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Safeweb Vivo Presentation',
    version: '1.0.0',
    slides: 15,
    app: '/app'
  });
});

// Serve Angular webapp at /app
app.use('/app', express.static(path.join(__dirname, 'webapp'), {
  maxAge: '1d',
  etag: true
}));

// Angular app - handle client-side routing
app.get('/app/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'webapp', 'index.html'));
});

// Serve presentation slides
app.use('/slides', express.static(path.join(__dirname, 'slides'), {
  maxAge: '1h',
  etag: true
}));

// Serve assets (logo, images)
app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  maxAge: '7d',
  etag: true
}));

// Serve theme CSS
app.use('/theme-safeweb.css', express.static(path.join(__dirname, 'slides', 'theme-safeweb.css'), {
  maxAge: '1h'
}));

// Index page - FULLSCREEN presentation viewer
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Safeweb × Vivo</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #0a0a0a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .presentation {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .slide-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }

    .slide-frame {
      width: 100%;
      height: 100%;
      border: none;
      background: #fff;
    }

    /* Navigation Controls */
    .nav-controls {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 16px;
      background: rgba(21, 39, 79, 0.95);
      padding: 12px 24px;
      border-radius: 50px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .presentation:hover .nav-controls,
    .nav-controls:hover {
      opacity: 1;
    }

    .nav-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: none;
      background: rgba(255,255,255,0.1);
      color: white;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .nav-btn:hover {
      background: #0c56de;
      transform: scale(1.1);
    }

    .nav-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      transform: none;
    }

    .slide-info {
      color: white;
      font-size: 14px;
      font-weight: 500;
      min-width: 100px;
      text-align: center;
    }

    .progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: #0c56de;
      transition: width 0.3s ease;
      z-index: 1001;
    }

    /* Slide thumbnails panel */
    .thumbnails {
      position: fixed;
      left: 0;
      top: 0;
      width: 80px;
      height: 100%;
      background: rgba(21, 39, 79, 0.98);
      display: flex;
      flex-direction: column;
      padding: 12px 8px;
      gap: 8px;
      overflow-y: auto;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 999;
    }

    .thumbnails:hover,
    .thumbnails.show {
      transform: translateX(0);
    }

    .thumb-trigger {
      position: fixed;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 60px;
      background: rgba(21, 39, 79, 0.8);
      border-radius: 0 8px 8px 0;
      cursor: pointer;
      z-index: 998;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 10px;
    }

    .thumb {
      width: 64px;
      height: 36px;
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255,255,255,0.6);
      font-size: 11px;
      font-weight: 600;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .thumb:hover {
      background: rgba(255,255,255,0.2);
    }

    .thumb.active {
      background: #0c56de;
      color: white;
    }

    /* Fullscreen button */
    .fullscreen-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 44px;
      height: 44px;
      border-radius: 8px;
      border: none;
      background: rgba(21, 39, 79, 0.9);
      color: white;
      font-size: 18px;
      cursor: pointer;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .presentation:hover .fullscreen-btn {
      opacity: 1;
    }

    .fullscreen-btn:hover {
      background: #0c56de;
    }

    /* Demo button */
    .demo-btn {
      position: fixed;
      top: 20px;
      right: 76px;
      height: 44px;
      padding: 0 20px;
      border-radius: 8px;
      border: none;
      background: rgba(21, 39, 79, 0.9);
      color: white;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .presentation:hover .demo-btn {
      opacity: 1;
    }

    .demo-btn:hover {
      background: #660099;
    }

    /* Keyboard hint */
    .keyboard-hint {
      position: fixed;
      bottom: 90px;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255,255,255,0.5);
      font-size: 11px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .presentation:hover .keyboard-hint {
      opacity: 1;
    }
  </style>
</head>
<body>
  <div class="presentation">
    <div class="progress-bar" id="progress"></div>

    <div class="thumb-trigger" onmouseenter="showThumbs()" onclick="toggleThumbs()">›</div>

    <div class="thumbnails" id="thumbnails" onmouseleave="hideThumbs()"></div>

    <div class="slide-container">
      <iframe id="slideFrame" class="slide-frame" src="/slides/slide01_capa.html"></iframe>
    </div>

    <a href="/app" class="demo-btn">
      <span>📱</span> Demo App
    </a>

    <button class="fullscreen-btn" onclick="toggleFullscreen()" title="Fullscreen (F)">⛶</button>

    <div class="nav-controls">
      <button class="nav-btn" onclick="prevSlide()" id="prevBtn" title="Anterior (←)">‹</button>
      <span class="slide-info" id="slideInfo">1 / 15</span>
      <button class="nav-btn" onclick="nextSlide()" id="nextBtn" title="Próximo (→)">›</button>
    </div>

    <div class="keyboard-hint">Use ← → ou clique para navegar • F para fullscreen</div>
  </div>

  <script>
    let currentSlide = 1;
    const totalSlides = 15;
    const slides = [
      'slide01_capa.html', 'slide02_fraudes.html', 'slide03_govbr_vs_icp.html',
      'slide04_timeline.html', 'slide05_mercado.html', 'slide06_safeweb.html',
      'slide07_drivers.html', 'slide08_conceito.html', 'slide09_jornada_app.html',
      'slide10_diferencial.html', 'slide11_dominancia.html', 'slide12_modelo_comercial.html',
      'slide13_projecao_receita.html', 'slide14_roadmap.html', 'slide15_cta.html'
    ];

    function updateSlide() {
      document.getElementById('slideFrame').src = '/slides/' + slides[currentSlide - 1];
      document.getElementById('slideInfo').textContent = currentSlide + ' / ' + totalSlides;
      document.getElementById('prevBtn').disabled = currentSlide === 1;
      document.getElementById('nextBtn').disabled = currentSlide === totalSlides;
      document.getElementById('progress').style.width = ((currentSlide / totalSlides) * 100) + '%';
      updateThumbs();
    }

    function prevSlide() {
      if (currentSlide > 1) { currentSlide--; updateSlide(); }
    }

    function nextSlide() {
      if (currentSlide < totalSlides) { currentSlide++; updateSlide(); }
    }

    function goToSlide(n) {
      currentSlide = n;
      updateSlide();
    }

    function updateThumbs() {
      document.querySelectorAll('.thumb').forEach((el, i) => {
        el.classList.toggle('active', i + 1 === currentSlide);
      });
    }

    function showThumbs() {
      document.getElementById('thumbnails').classList.add('show');
    }

    function hideThumbs() {
      document.getElementById('thumbnails').classList.remove('show');
    }

    function toggleThumbs() {
      document.getElementById('thumbnails').classList.toggle('show');
    }

    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }

    // Build thumbnails
    const thumbs = document.getElementById('thumbnails');
    for (let i = 1; i <= totalSlides; i++) {
      const div = document.createElement('div');
      div.className = 'thumb' + (i === 1 ? ' active' : '');
      div.textContent = i;
      div.onclick = () => goToSlide(i);
      thumbs.appendChild(div);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
      if (e.key === 'Home') { currentSlide = 1; updateSlide(); }
      if (e.key === 'End') { currentSlide = totalSlides; updateSlide(); }
    });

    // Click navigation (click right half = next, left half = prev)
    document.querySelector('.slide-container').addEventListener('click', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x > rect.width / 2) {
        nextSlide();
      } else {
        prevSlide();
      }
    });

    // Initialize
    updateSlide();
  </script>
</body>
</html>`);
});

// Start server
app.listen(PORT, HOST, () => {
  console.log('');
  console.log('Safeweb Presentation Server running on http://' + HOST + ':' + PORT);
  console.log('');
  console.log('Endpoints:');
  console.log('  /         - Presentation Viewer');
  console.log('  /app      - SafeID Vivo Demo App');
  console.log('  /slides   - Individual slides');
  console.log('  /health   - Health check');
  console.log('');
});
