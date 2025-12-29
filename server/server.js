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
  contentSecurityPolicy: false, // Disable for inline styles in slides
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

// Slide navigation API
app.get('/api/slides', (req, res) => {
  const slides = [
    { id: 1, file: 'slide01_capa.html', title: 'Capa', category: 'Abertura' },
    { id: 2, file: 'slide02_fraudes.html', title: 'Fraudes Digitais', category: 'Ato 1: O Problema' },
    { id: 3, file: 'slide03_govbr_vs_icp.html', title: 'Gov.br vs ICP-Brasil', category: 'Ato 1: O Problema' },
    { id: 4, file: 'slide04_timeline.html', title: 'Timeline Regulatório', category: 'Ato 1: O Problema' },
    { id: 5, file: 'slide05_mercado.html', title: 'Mercado', category: 'Ato 2: A Oportunidade' },
    { id: 6, file: 'slide06_safeweb.html', title: 'Safeweb', category: 'Ato 2: A Oportunidade' },
    { id: 7, file: 'slide07_drivers.html', title: 'Drivers de Compra', category: 'Ato 2: A Oportunidade' },
    { id: 8, file: 'slide08_conceito.html', title: 'Conceito SafeID', category: 'Ato 2: A Oportunidade' },
    { id: 9, file: 'slide09_jornada_app.html', title: 'Jornada do App', category: 'Ato 2: A Oportunidade' },
    { id: 10, file: 'slide10_diferencial.html', title: 'Diferencial Competitivo', category: 'Ato 2: A Oportunidade' },
    { id: 11, file: 'slide11_dominancia.html', title: 'Dominância de Mercado', category: 'Ato 3: A Parceria' },
    { id: 12, file: 'slide12_modelo_comercial.html', title: 'Modelo Comercial SVA', category: 'Ato 3: A Parceria' },
    { id: 13, file: 'slide13_projecao_receita.html', title: 'Projeção de Receita', category: 'Ato 3: A Parceria' },
    { id: 14, file: 'slide14_roadmap.html', title: 'Roadmap', category: 'Ato 3: A Parceria' },
    { id: 15, file: 'slide15_cta.html', title: 'Call to Action', category: 'Fechamento' }
  ];
  res.json(slides);
});

// Index page - presentation viewer
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Safeweb × Vivo - Apresentação</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #15274f 0%, #0954ce 100%);
      min-height: 100vh;
      color: white;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 50px;
    }
    .header h1 {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .header p {
      font-size: 18px;
      opacity: 0.8;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }
    .card {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 30px;
      text-decoration: none;
      color: white;
      transition: all 0.3s ease;
      border: 1px solid rgba(255,255,255,0.2);
    }
    .card:hover {
      transform: translateY(-5px);
      background: rgba(255,255,255,0.2);
    }
    .card h2 {
      font-size: 24px;
      margin-bottom: 10px;
    }
    .card p {
      opacity: 0.8;
      font-size: 14px;
    }
    .card .icon {
      font-size: 40px;
      margin-bottom: 15px;
    }
    .viewer-container {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .viewer-nav {
      background: #15274f;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .viewer-nav button {
      background: #0c56de;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }
    .viewer-nav button:hover {
      background: #0954ce;
    }
    .viewer-nav button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .viewer-nav span {
      font-size: 14px;
    }
    .slide-frame {
      width: 100%;
      height: 540px;
      border: none;
    }
    .slide-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
      margin-top: 30px;
    }
    .slide-thumb {
      background: rgba(255,255,255,0.1);
      padding: 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
    }
    .slide-thumb:hover, .slide-thumb.active {
      background: rgba(255,255,255,0.25);
    }
    .slide-thumb span {
      font-size: 12px;
      display: block;
    }
    .slide-thumb strong {
      font-size: 11px;
      opacity: 0.7;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Safeweb × Vivo</h1>
      <p>Certificação Digital para 33 milhões de brasileiros</p>
    </div>

    <div class="cards">
      <a href="#presentation" class="card" onclick="showViewer()">
        <div class="icon">📊</div>
        <h2>Apresentação</h2>
        <p>15 slides interativos com dados de mercado, projeções e roadmap</p>
      </a>
      <a href="/app" class="card">
        <div class="icon">📱</div>
        <h2>Demo SafeID Vivo</h2>
        <p>Protótipo interativo do app de certificação digital</p>
      </a>
    </div>

    <div id="viewer" class="viewer-container" style="display: none;">
      <div class="viewer-nav">
        <button onclick="prevSlide()" id="prevBtn">← Anterior</button>
        <span id="slideInfo">Slide 1 / 15</span>
        <button onclick="nextSlide()" id="nextBtn">Próximo →</button>
      </div>
      <iframe id="slideFrame" class="slide-frame" src="/slides/slide01_capa.html"></iframe>
    </div>

    <div class="slide-grid" id="slideGrid"></div>
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
    const titles = [
      'Capa', 'Fraudes', 'Gov.br vs ICP', 'Timeline', 'Mercado', 'Safeweb',
      'Drivers', 'Conceito', 'Jornada App', 'Diferencial', 'Dominância',
      'Modelo SVA', 'Projeção', 'Roadmap', 'CTA'
    ];

    function showViewer() {
      document.getElementById('viewer').style.display = 'block';
      updateSlide();
    }

    function updateSlide() {
      document.getElementById('slideFrame').src = '/slides/' + slides[currentSlide - 1];
      document.getElementById('slideInfo').textContent = 'Slide ' + currentSlide + ' / ' + totalSlides + ' - ' + titles[currentSlide - 1];
      document.getElementById('prevBtn').disabled = currentSlide === 1;
      document.getElementById('nextBtn').disabled = currentSlide === totalSlides;
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
      showViewer();
    }

    function updateThumbs() {
      document.querySelectorAll('.slide-thumb').forEach((el, i) => {
        el.classList.toggle('active', i + 1 === currentSlide);
      });
    }

    // Build slide grid
    const grid = document.getElementById('slideGrid');
    slides.forEach((s, i) => {
      const div = document.createElement('div');
      div.className = 'slide-thumb';
      div.innerHTML = '<span>' + (i + 1) + '. ' + titles[i] + '</span>';
      div.onclick = () => goToSlide(i + 1);
      grid.appendChild(div);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });
  </script>
</body>
</html>
  `);
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
