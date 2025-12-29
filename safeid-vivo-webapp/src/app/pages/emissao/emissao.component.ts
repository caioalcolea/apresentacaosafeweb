import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emissao',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule
  ],
  template: `
    <div class="emissao-container">
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
        <span class="header-title">Emitir Certificado</span>
        <div style="width: 40px;"></div>
      </div>

      <!-- Content -->
      <div class="content">
        <h2 class="section-title animate-fade-in">Confirme seus dados</h2>

        <!-- Form Fields -->
        <div class="form-section animate-fade-in">
          <div class="form-group">
            <label class="form-label">Nome completo</label>
            <div class="form-input readonly">
              <span>João da Silva Santos</span>
              <mat-icon class="lock-icon">lock</mat-icon>
            </div>
            <span class="helper-text">✓ Dados do cadastro Vivo</span>
          </div>

          <div class="form-group">
            <label class="form-label">CPF</label>
            <div class="form-input readonly">
              <span>123.456.789-00</span>
              <mat-icon class="lock-icon">lock</mat-icon>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">E-mail</label>
            <div class="form-input readonly">
              <span>joao&#64;email.com</span>
              <mat-icon class="lock-icon">lock</mat-icon>
            </div>
          </div>
        </div>

        <!-- Video Validation Card -->
        <div class="video-card animate-slide-in">
          <div class="video-icon">📹</div>
          <div class="video-content">
            <h3>VALIDAÇÃO POR VÍDEO</h3>
            <p>Para sua segurança, vamos confirmar sua identidade por videoconferência.</p>
            <div class="video-duration">
              <mat-icon>schedule</mat-icon>
              <span>Duração: ~3 minutos</span>
            </div>
          </div>
        </div>

        <!-- Terms Checkbox -->
        <div class="terms-section animate-fade-in">
          <label class="checkbox-container">
            <input type="checkbox" [(ngModel)]="termosAceitos">
            <span class="checkmark"></span>
            <span class="terms-text">Li e aceito os <a href="#">termos de uso</a> e <a href="#">política de privacidade</a></span>
          </label>
        </div>
      </div>

      <!-- Bottom Action -->
      <div class="bottom-action">
        <button
          class="btn-emitir"
          [class.disabled]="!termosAceitos"
          [disabled]="!termosAceitos"
          (click)="emitir()">
          EMITIR CERTIFICADO
        </button>
        <p class="cobranca-info">Cobrança na sua fatura Vivo</p>
      </div>
    </div>
  `,
  styles: [`
    .emissao-container {
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
      padding: 20px 16px;
    }

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin: 0 0 20px 0;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 12px;
      font-weight: 500;
      color: #666;
    }

    .form-input {
      background: white;
      border: 1px solid var(--vivo-gray-border);
      border-radius: 8px;
      padding: 14px 16px;
      font-size: 14px;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .form-input.readonly {
      background: #f8f8f8;
    }

    .lock-icon {
      font-size: 18px;
      color: #ccc;
    }

    .helper-text {
      font-size: 11px;
      color: var(--vivo-green);
    }

    .video-card {
      background: #FFF5EB;
      border: 1px solid var(--vivo-orange);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      gap: 14px;
      margin-bottom: 20px;
    }

    .video-icon {
      font-size: 32px;
    }

    .video-content h3 {
      font-size: 13px;
      font-weight: 700;
      color: var(--vivo-orange);
      margin: 0 0 6px 0;
    }

    .video-content p {
      font-size: 12px;
      color: #666;
      margin: 0 0 10px 0;
      line-height: 1.4;
    }

    .video-duration {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: #888;
    }

    .video-duration mat-icon {
      font-size: 14px;
      width: 14px;
      height: 14px;
    }

    .terms-section {
      margin-bottom: 16px;
    }

    .checkbox-container {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      cursor: pointer;
      font-size: 12px;
      color: #666;
    }

    .checkbox-container input {
      width: 18px;
      height: 18px;
      accent-color: var(--vivo-purple);
      cursor: pointer;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .terms-text a {
      color: var(--vivo-purple);
      text-decoration: none;
    }

    .bottom-action {
      padding: 16px;
      background: white;
      border-top: 1px solid var(--vivo-gray-border);
    }

    .btn-emitir {
      width: 100%;
      height: 48px;
      background: linear-gradient(90deg, var(--vivo-purple) 0%, var(--vivo-purple-light) 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-emitir:hover:not(.disabled) {
      opacity: 0.9;
    }

    .btn-emitir.disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .cobranca-info {
      text-align: center;
      font-size: 11px;
      color: #888;
      margin: 10px 0 0 0;
    }
  `]
})
export class EmissaoComponent {
  termosAceitos = false;

  constructor(private router: Router) {}

  emitir() {
    if (this.termosAceitos) {
      this.router.navigate(['/dashboard']);
    }
  }

  goBack() {
    this.router.navigate(['/planos']);
  }
}
