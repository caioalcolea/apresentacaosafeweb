import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Plano {
  id: string;
  nome: string;
  preco: string;
  periodo: string;
  assinaturas: string;
  destaque: boolean;
  recomendado: boolean;
  features?: string[];
}

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatRadioModule, FormsModule],
  template: `
    <div class="planos-container">
      <!-- Status Bar -->
      <div class="status-bar">
        <span class="time">9:41</span>
        <div class="status-icons">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      <!-- Header -->
      <div class="vivo-header">
        <button class="back-btn" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span class="header-title">Escolha seu plano</span>
        <div style="width: 40px;"></div>
      </div>

      <!-- Content -->
      <div class="content">
        <!-- Info Text -->
        <div class="info-text animate-fade-in">
          <p class="info-label">Seu plano Vivo inclui:</p>
          <p class="info-highlight">3 assinaturas digitais/mês</p>
        </div>

        <!-- Plano Grátis (Destacado) -->
        <div class="plano-card gratis animate-fade-in"
             [class.selected]="planoSelecionado() === 'gratis'"
             (click)="selecionarPlano('gratis')">
          <div class="plano-badge">✓ RECOMENDADO</div>
          <div class="plano-header">
            <div class="plano-nome">GRÁTIS</div>
            <div class="plano-assinaturas">3 assinaturas/mês</div>
          </div>
          <div class="plano-features">
            <div class="feature"><mat-icon>check</mat-icon> Validade jurídica plena</div>
            <div class="feature"><mat-icon>check</mat-icon> Funciona em cartórios</div>
            <div class="feature"><mat-icon>check</mat-icon> Sem token físico</div>
          </div>
          <button class="btn-ativar" (click)="continuar($event)">
            ATIVAR GRÁTIS
          </button>
        </div>

        <!-- Outros Planos -->
        <div class="outros-planos-label">Precisa de mais?</div>

        <div class="planos-grid">
          <!-- Essencial -->
          <div class="plano-card pequeno animate-slide-in"
               [class.selected]="planoSelecionado() === 'essencial'"
               (click)="selecionarPlano('essencial')">
            <div class="plano-nome">Essencial</div>
            <div class="plano-preco">R$ 2,99</div>
            <div class="plano-assinaturas">10/mês</div>
            <button class="btn-escolher">ESCOLHER</button>
          </div>

          <!-- Profissional -->
          <div class="plano-card pequeno animate-slide-in"
               [class.selected]="planoSelecionado() === 'profissional'"
               (click)="selecionarPlano('profissional')">
            <div class="plano-nome">Profissional</div>
            <div class="plano-preco">R$ 6,99</div>
            <div class="plano-assinaturas">50/mês</div>
            <button class="btn-escolher">ESCOLHER</button>
          </div>
        </div>

        <!-- Ilimitado -->
        <div class="plano-card ilimitado animate-slide-in"
             [class.selected]="planoSelecionado() === 'ilimitado'"
             (click)="selecionarPlano('ilimitado')">
          <div class="plano-row">
            <div>
              <div class="plano-nome">Ilimitado</div>
              <div class="plano-assinaturas">Assinaturas ilimitadas</div>
            </div>
            <div class="plano-preco-right">
              <span class="preco">R$ 21,99</span>
              <span class="periodo">/mês</span>
            </div>
          </div>
          <button class="btn-escolher full">ESCOLHER</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .planos-container {
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
      padding: 0 8px;
    }

    .back-btn {
      width: 40px;
      height: 40px;
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .header-title {
      color: white;
      font-size: 18px;
      font-weight: 600;
    }

    .content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }

    .info-text {
      text-align: center;
      margin-bottom: 16px;
    }

    .info-label {
      font-size: 14px;
      color: #666;
      margin: 0 0 4px 0;
    }

    .info-highlight {
      font-size: 16px;
      font-weight: 600;
      color: var(--vivo-purple);
      margin: 0;
    }

    .plano-card {
      background: white;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
      border: 2px solid transparent;
      transition: all 0.2s;
      cursor: pointer;
    }

    .plano-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .plano-card.selected {
      border-color: var(--vivo-purple);
    }

    .plano-card.gratis {
      background: linear-gradient(135deg, #f0fff4 0%, #d4edda 100%);
      border: 2px solid var(--vivo-green);
    }

    .plano-badge {
      background: var(--vivo-green);
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 12px;
    }

    .plano-header {
      margin-bottom: 12px;
    }

    .plano-nome {
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }

    .plano-assinaturas {
      font-size: 13px;
      color: #666;
      margin-top: 2px;
    }

    .plano-features {
      margin-bottom: 16px;
    }

    .feature {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #333;
      margin-bottom: 6px;
    }

    .feature mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: var(--vivo-green);
    }

    .btn-ativar {
      width: 100%;
      height: 44px;
      background: var(--vivo-green);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .btn-ativar:hover {
      opacity: 0.9;
    }

    .outros-planos-label {
      font-size: 14px;
      color: #666;
      margin: 8px 0 12px 0;
    }

    .planos-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 12px;
    }

    .plano-card.pequeno {
      padding: 14px;
      text-align: center;
    }

    .plano-card.pequeno .plano-nome {
      font-size: 14px;
      margin-bottom: 4px;
    }

    .plano-preco {
      font-size: 20px;
      font-weight: 700;
      color: var(--vivo-purple);
    }

    .plano-card.pequeno .plano-assinaturas {
      font-size: 11px;
      margin-bottom: 12px;
    }

    .btn-escolher {
      width: 100%;
      height: 36px;
      background: transparent;
      color: var(--vivo-purple);
      border: 2px solid var(--vivo-purple);
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-escolher:hover {
      background: var(--vivo-purple);
      color: white;
    }

    .btn-escolher.full {
      margin-top: 12px;
    }

    .plano-card.ilimitado {
      background: linear-gradient(135deg, #f8f5ff 0%, #efe8ff 100%);
      border: 2px solid var(--vivo-purple);
    }

    .plano-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .plano-preco-right {
      text-align: right;
    }

    .plano-preco-right .preco {
      font-size: 20px;
      font-weight: 700;
      color: var(--vivo-purple);
    }

    .plano-preco-right .periodo {
      font-size: 12px;
      color: #888;
    }
  `]
})
export class PlanosComponent {
  planoSelecionado = signal('gratis');

  constructor(private router: Router) {}

  selecionarPlano(plano: string) {
    this.planoSelecionado.set(plano);
  }

  continuar(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/emissao']);
  }

  goBack() {
    this.router.navigate(['/onboarding']);
  }
}
