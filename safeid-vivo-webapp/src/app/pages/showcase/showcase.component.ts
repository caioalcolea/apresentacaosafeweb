import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="showcase-container">
      <!-- Title Zone -->
      <div class="title-zone">
        <p class="category">EXPERIÊNCIA DO USUÁRIO</p>
        <h1 class="title">Jornada no App Meu Vivo</h1>
      </div>

      <!-- Phones Container -->
      <div class="phones-container">
        <!-- Screen 1: Descoberta -->
        <div class="phone-wrapper">
          <p class="step-label">1. Descoberta</p>
          <div class="phone-frame mini">
            <div class="status-bar">
              <span>9:41</span>
              <span>📶 🔋</span>
            </div>
            <div class="vivo-header">
              <span>Meu Vivo</span>
            </div>
            <div class="content">
              <div class="hero-banner">
                <span class="icon">🔐</span>
                <strong>Certificado Digital</strong>
                <p>Você é MEI? Em 2027 será obrigatório.</p>
                <button class="btn-small">SAIBA MAIS</button>
              </div>
              <div class="menu-item">📱 Meu Plano</div>
              <div class="menu-item">💳 Faturas</div>
              <div class="menu-item">🎁 Benefícios</div>
            </div>
          </div>
        </div>

        <!-- Screen 2: Onboarding -->
        <div class="phone-wrapper">
          <p class="step-label">2. Onboarding</p>
          <div class="phone-frame mini">
            <div class="status-bar">
              <span>9:41</span>
              <span>📶 🔋</span>
            </div>
            <div class="vivo-header">
              <span>SafeID</span>
            </div>
            <div class="content center">
              <div class="icon-circle">🔐</div>
              <strong>O que é SafeID?</strong>
              <p class="description">Certificado digital ICP-Brasil com validade jurídica plena. Funciona em cartórios e tribunais.</p>
              <div class="progress-dots">
                <span class="dot active"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
              <button class="btn-primary">PRÓXIMO</button>
              <span class="skip-link">Pular</span>
            </div>
          </div>
        </div>

        <!-- Screen 3: Escolha -->
        <div class="phone-wrapper">
          <p class="step-label">3. Escolha</p>
          <div class="phone-frame mini">
            <div class="status-bar">
              <span>9:41</span>
              <span>📶 🔋</span>
            </div>
            <div class="vivo-header">
              <span>Escolha seu plano</span>
            </div>
            <div class="content">
              <div class="plan-card free">
                <span class="badge">✓ GRÁTIS</span>
                <p>3 assinaturas/mês</p>
                <small>Incluso no seu plano</small>
              </div>
              <div class="plan-card">
                <strong>Essencial</strong>
                <p>10 assinaturas • R$ 2,99</p>
              </div>
              <div class="plan-card">
                <strong>Profissional</strong>
                <p>50 assinaturas • R$ 6,99</p>
              </div>
              <div class="plan-card">
                <strong>Ilimitado</strong>
                <p>Sem limite • R$ 21,99</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Screen 4: Emissão -->
        <div class="phone-wrapper">
          <p class="step-label">4. Emissão</p>
          <div class="phone-frame mini">
            <div class="status-bar">
              <span>9:41</span>
              <span>📶 🔋</span>
            </div>
            <div class="vivo-header">
              <span>Emitir Certificado</span>
            </div>
            <div class="content">
              <div class="form-group">
                <label>Nome completo</label>
                <div class="input-field">João da Silva Santos</div>
              </div>
              <div class="form-group">
                <label>CPF</label>
                <div class="input-field">***.***.***-00</div>
              </div>
              <div class="video-card">
                <span>📹 Videoconferência</span>
              </div>
              <button class="btn-primary">EMITIR AGORA</button>
              <small class="footer-note">Cobrança na sua fatura Vivo</small>
            </div>
          </div>
        </div>

        <!-- Screen 5: Uso -->
        <div class="phone-wrapper">
          <p class="step-label">5. Uso</p>
          <div class="phone-frame mini">
            <div class="status-bar">
              <span>9:41</span>
              <span>📶 🔋</span>
            </div>
            <div class="vivo-header">
              <span>Meu Certificado</span>
            </div>
            <div class="content">
              <div class="status-card">
                <small>Status</small>
                <strong>✓ ATIVO</strong>
                <p>Válido até 12/2028</p>
              </div>
              <button class="btn-primary action">📝 ASSINAR DOCUMENTO</button>
              <div class="menu-item small">📋 Histórico de uso</div>
              <div class="menu-item small">⬆️ Upgrade de plano</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer-zone">
        <p><strong>Jornada completa em ~5 minutos</strong> • Integração via API REST • Cobrança na fatura Vivo (modelo SVA)</p>
      </div>
    </div>
  `,
  styles: [`
    .showcase-container {
      width: 960px;
      height: 540px;
      background: #f5f5f5;
      display: flex;
      flex-direction: column;
      font-family: 'Roboto', Arial, sans-serif;
    }

    .title-zone {
      padding: 20px 40px 10px;
    }

    .category {
      font-size: 12px;
      color: var(--vivo-purple, #660099);
      text-transform: uppercase;
      letter-spacing: 3px;
      margin: 0 0 6px 0;
    }

    .title {
      font-size: 32px;
      color: #1d1d1d;
      font-weight: 700;
      margin: 0;
    }

    .phones-container {
      flex: 1;
      display: flex;
      justify-content: center;
      gap: 15px;
      padding: 10px 30px;
    }

    .phone-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .step-label {
      font-size: 10px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0;
    }

    .phone-frame.mini {
      width: 140px;
      height: 280px;
      background: white;
      border-radius: 20px;
      border: 3px solid #333;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      display: flex;
      flex-direction: column;
    }

    .status-bar {
      background: #660099;
      padding: 4px 8px;
      display: flex;
      justify-content: space-between;
      font-size: 7px;
      color: white;
    }

    .vivo-header {
      background: linear-gradient(135deg, #660099 0%, #4A0072 100%);
      padding: 8px 10px;
      color: white;
      font-size: 10px;
      font-weight: 600;
    }

    .content {
      flex: 1;
      padding: 8px;
      overflow: hidden;
    }

    .content.center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 12px;
    }

    .hero-banner {
      background: linear-gradient(135deg, #FF6600 0%, #cc5200 100%);
      border-radius: 8px;
      padding: 10px;
      color: white;
      margin-bottom: 8px;
    }

    .hero-banner .icon {
      font-size: 16px;
    }

    .hero-banner strong {
      display: block;
      font-size: 8px;
      margin: 4px 0 2px 0;
    }

    .hero-banner p {
      font-size: 6px;
      margin: 0 0 6px 0;
      opacity: 0.9;
    }

    .btn-small {
      background: white;
      color: #FF6600;
      border: none;
      padding: 3px 8px;
      border-radius: 10px;
      font-size: 6px;
      font-weight: 600;
    }

    .menu-item {
      background: #f5f5f5;
      padding: 8px;
      border-radius: 6px;
      margin-bottom: 4px;
      font-size: 7px;
      color: #333;
    }

    .menu-item.small {
      padding: 6px 8px;
      font-size: 6px;
    }

    .icon-circle {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #660099 0%, #4A0072 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      margin-bottom: 12px;
    }

    .content strong {
      font-size: 10px;
      color: #333;
      margin-bottom: 6px;
    }

    .description {
      font-size: 7px;
      color: #666;
      line-height: 1.4;
      margin: 0 0 10px 0;
    }

    .progress-dots {
      display: flex;
      gap: 4px;
      margin-bottom: 12px;
    }

    .dot {
      width: 16px;
      height: 4px;
      background: #e0e0e0;
      border-radius: 2px;
    }

    .dot.active {
      background: #660099;
      width: 20px;
    }

    .btn-primary {
      width: 100%;
      background: #660099;
      color: white;
      border: none;
      padding: 8px;
      border-radius: 6px;
      font-size: 8px;
      font-weight: 600;
      margin-bottom: 6px;
    }

    .btn-primary.action {
      background: linear-gradient(135deg, #660099 0%, #4A0072 100%);
      margin-bottom: 8px;
    }

    .skip-link {
      font-size: 7px;
      color: #888;
    }

    .plan-card {
      background: #f5f5f5;
      padding: 8px;
      border-radius: 6px;
      margin-bottom: 5px;
    }

    .plan-card.free {
      background: linear-gradient(135deg, #f0fff4 0%, #d4edda 100%);
      border: 2px solid #28A745;
    }

    .plan-card .badge {
      font-size: 7px;
      color: #28A745;
      font-weight: 700;
    }

    .plan-card strong {
      font-size: 8px;
      color: #333;
    }

    .plan-card p {
      font-size: 6px;
      color: #666;
      margin: 2px 0 0 0;
    }

    .plan-card small {
      font-size: 5px;
      color: #888;
    }

    .form-group {
      margin-bottom: 6px;
    }

    .form-group label {
      font-size: 6px;
      color: #888;
      display: block;
      margin-bottom: 2px;
    }

    .input-field {
      background: #f5f5f5;
      padding: 6px;
      border-radius: 4px;
      font-size: 7px;
      color: #333;
    }

    .video-card {
      background: #fff5eb;
      border: 1px solid #FF6600;
      padding: 6px;
      border-radius: 4px;
      font-size: 7px;
      color: #FF6600;
      margin-bottom: 8px;
    }

    .footer-note {
      display: block;
      text-align: center;
      font-size: 5px;
      color: #888;
    }

    .status-card {
      background: linear-gradient(135deg, #28A745 0%, #1e7e34 100%);
      padding: 12px 10px;
      border-radius: 8px;
      margin-bottom: 8px;
      color: white;
    }

    .status-card small {
      font-size: 6px;
      opacity: 0.8;
    }

    .status-card strong {
      display: block;
      font-size: 12px;
      color: white;
      margin: 3px 0;
    }

    .status-card p {
      font-size: 6px;
      opacity: 0.8;
      margin: 0;
    }

    .footer-zone {
      padding: 10px 40px;
      background: #e8e8e8;
    }

    .footer-zone p {
      font-size: 10px;
      color: #666;
      margin: 0;
      text-align: center;
    }
  `]
})
export class ShowcaseComponent {}
