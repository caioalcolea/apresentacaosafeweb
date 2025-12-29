import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-descoberta',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="descoberta-container">
      <!-- Status Bar -->
      <div class="status-bar">
        <span class="time">9:41</span>
        <div class="status-icons">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      <!-- Header Meu Vivo -->
      <div class="vivo-header">
        <mat-icon class="back-icon">arrow_back</mat-icon>
        <span class="header-title">Meu Vivo</span>
        <mat-icon class="menu-icon">more_vert</mat-icon>
      </div>

      <!-- Content -->
      <div class="content">
        <!-- Hero Banner -->
        <div class="hero-banner animate-fade-in">
          <div class="banner-icon">🔐</div>
          <h2 class="banner-title">CERTIFICADO DIGITAL</h2>
          <p class="banner-subtitle">Incluso no seu plano!</p>
          <p class="banner-text">Assine documentos com validade jurídica direto do seu celular</p>
          <div class="banner-actions">
            <button class="btn-conhecer" (click)="goToOnboarding()">CONHECER</button>
            <button class="btn-ativar" (click)="goToOnboarding()">ATIVAR AGORA</button>
          </div>
        </div>

        <!-- MEI Alert -->
        <div class="mei-alert animate-fade-in">
          <div class="alert-icon">⚠️</div>
          <div class="alert-content">
            <strong>ATENÇÃO MEI</strong>
            <p>Em 2027, certificado digital será OBRIGATÓRIO para você!</p>
          </div>
          <button class="btn-saiba-mais">SAIBA MAIS</button>
        </div>

        <!-- Menu Items -->
        <div class="menu-section">
          <div class="menu-item animate-slide-in">
            <mat-icon class="menu-icon-left">smartphone</mat-icon>
            <span>Meu Plano</span>
            <mat-icon class="menu-arrow">chevron_right</mat-icon>
          </div>
          <div class="menu-item animate-slide-in">
            <mat-icon class="menu-icon-left">receipt</mat-icon>
            <span>Faturas</span>
            <mat-icon class="menu-arrow">chevron_right</mat-icon>
          </div>
          <div class="menu-item animate-slide-in">
            <mat-icon class="menu-icon-left">card_giftcard</mat-icon>
            <span>Benefícios</span>
            <mat-icon class="menu-arrow">chevron_right</mat-icon>
          </div>

          <!-- SafeID Card -->
          <div class="safeid-card animate-slide-in" (click)="goToOnboarding()">
            <div class="card-left">
              <div class="card-icon">🔐</div>
              <div class="card-text">
                <strong>Certificado Digital</strong>
                <span>3 assinaturas grátis no seu plano!</span>
              </div>
            </div>
            <mat-icon class="card-arrow">chevron_right</mat-icon>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .descoberta-container {
      width: 375px;
      height: 667px;
      background: #f5f5f5;
      border-radius: 40px;
      border: 8px solid #1a1a1a;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .status-bar {
      height: 24px;
      background: var(--vivo-purple);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      font-size: 12px;
      color: white;
    }

    .status-icons {
      display: flex;
      gap: 4px;
      font-size: 10px;
    }

    .vivo-header {
      height: 56px;
      background: linear-gradient(135deg, var(--vivo-purple) 0%, var(--vivo-purple-dark) 100%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      color: white;
    }

    .header-title {
      font-size: 18px;
      font-weight: 600;
    }

    .content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }

    .hero-banner {
      background: linear-gradient(135deg, var(--vivo-orange) 0%, #cc5200 100%);
      border-radius: 12px;
      padding: 20px;
      color: white;
      margin-bottom: 12px;
    }

    .banner-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }

    .banner-title {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 4px 0;
    }

    .banner-subtitle {
      font-size: 14px;
      margin: 0 0 8px 0;
      opacity: 0.9;
    }

    .banner-text {
      font-size: 12px;
      margin: 0 0 16px 0;
      opacity: 0.85;
      line-height: 1.4;
    }

    .banner-actions {
      display: flex;
      gap: 8px;
    }

    .btn-conhecer {
      background: transparent;
      border: 2px solid white;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-ativar {
      background: white;
      border: none;
      color: var(--vivo-orange);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
    }

    .mei-alert {
      background: #FFF3E0;
      border-left: 4px solid var(--vivo-orange);
      border-radius: 8px;
      padding: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .alert-icon {
      font-size: 24px;
    }

    .alert-content {
      flex: 1;
    }

    .alert-content strong {
      font-size: 12px;
      color: var(--vivo-orange);
      display: block;
    }

    .alert-content p {
      font-size: 11px;
      color: #666;
      margin: 4px 0 0 0;
    }

    .btn-saiba-mais {
      background: var(--vivo-orange);
      border: none;
      color: white;
      padding: 6px 12px;
      border-radius: 15px;
      font-size: 10px;
      font-weight: 600;
      cursor: pointer;
    }

    .menu-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .menu-item {
      background: white;
      border-radius: 10px;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .menu-icon-left {
      color: var(--vivo-purple);
      font-size: 22px;
    }

    .menu-item span {
      flex: 1;
      font-size: 14px;
      color: #333;
    }

    .menu-arrow {
      color: #ccc;
    }

    .safeid-card {
      background: linear-gradient(135deg, #f8f5ff 0%, #efe8ff 100%);
      border: 2px solid var(--vivo-purple);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      margin-top: 8px;
      transition: transform 0.2s;
    }

    .safeid-card:hover {
      transform: scale(1.02);
    }

    .card-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .card-icon {
      font-size: 28px;
    }

    .card-text {
      display: flex;
      flex-direction: column;
    }

    .card-text strong {
      font-size: 14px;
      color: var(--vivo-purple);
    }

    .card-text span {
      font-size: 11px;
      color: #666;
    }

    .card-arrow {
      color: var(--vivo-purple);
    }
  `]
})
export class DescobertaComponent {
  constructor(private router: Router) {}

  goToOnboarding() {
    this.router.navigate(['/onboarding']);
  }
}
