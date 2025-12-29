import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressBarModule],
  template: `
    <div class="dashboard-container">
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
        <span class="header-title">Meu SafeID</span>
        <button class="help-btn">
          <mat-icon>help_outline</mat-icon>
        </button>
      </div>

      <!-- Content -->
      <div class="content">
        <!-- Profile Card -->
        <div class="profile-card animate-fade-in">
          <div class="profile-info">
            <div class="avatar">
              <mat-icon>person</mat-icon>
            </div>
            <div class="user-details">
              <h2 class="user-name">João Silva</h2>
              <p class="user-cpf">CPF: •••.•••.789-00</p>
            </div>
          </div>
          <div class="status-badge-container">
            <div class="status-badge active">
              <span class="status-dot"></span>
              <span>ATIVO</span>
            </div>
            <p class="valid-until">até 15/12/2028</p>
          </div>
        </div>

        <!-- Usage Card -->
        <div class="usage-card animate-fade-in">
          <div class="usage-header">
            <span class="usage-title">Assinaturas este mês</span>
            <span class="usage-count">2 de 3 usadas</span>
          </div>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 67%;"></div>
            </div>
            <span class="progress-percent">67%</span>
          </div>
          <p class="renew-info">Renova em 15 dias</p>
        </div>

        <!-- Divider -->
        <div class="divider"></div>

        <!-- Actions Menu -->
        <div class="actions-menu">
          <div class="action-item primary animate-slide-in" (click)="assinar()">
            <div class="action-icon">✍️</div>
            <span class="action-text">Assinar Documento</span>
            <mat-icon class="action-arrow">chevron_right</mat-icon>
          </div>

          <div class="action-item animate-slide-in">
            <div class="action-icon">📋</div>
            <span class="action-text">Histórico</span>
            <mat-icon class="action-arrow">chevron_right</mat-icon>
          </div>

          <div class="action-item animate-slide-in">
            <div class="action-icon">⬆️</div>
            <span class="action-text">Fazer Upgrade</span>
            <mat-icon class="action-arrow">chevron_right</mat-icon>
          </div>

          <div class="action-item animate-slide-in">
            <div class="action-icon">❓</div>
            <span class="action-text">Ajuda e Suporte</span>
            <mat-icon class="action-arrow">chevron_right</mat-icon>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="recent-section animate-fade-in">
          <h3 class="section-label">Atividade recente</h3>
          <div class="activity-item">
            <div class="activity-icon success">✓</div>
            <div class="activity-content">
              <p class="activity-title">Contrato_Aluguel.pdf</p>
              <p class="activity-date">Assinado em 28/12/2025</p>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon success">✓</div>
            <div class="activity-content">
              <p class="activity-title">Procuracao_Simples.pdf</p>
              <p class="activity-date">Assinado em 25/12/2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
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

    .back-btn, .help-btn {
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

    .profile-card {
      background: linear-gradient(135deg, var(--vivo-purple) 0%, var(--vivo-purple-dark) 100%);
      border-radius: 16px;
      padding: 20px;
      color: white;
      margin-bottom: 16px;
    }

    .profile-info {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 16px;
    }

    .avatar {
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar mat-icon {
      font-size: 28px;
    }

    .user-name {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 4px 0;
    }

    .user-cpf {
      font-size: 13px;
      opacity: 0.8;
      margin: 0;
    }

    .status-badge-container {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 10px;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .status-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 700;
    }

    .status-badge.active {
      color: #4ADE80;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background: #4ADE80;
      border-radius: 50%;
    }

    .valid-until {
      font-size: 12px;
      opacity: 0.8;
      margin: 0;
    }

    .usage-card {
      background: white;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .usage-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .usage-title {
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }

    .usage-count {
      font-size: 13px;
      color: #666;
    }

    .progress-container {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .progress-bar {
      flex: 1;
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--vivo-purple) 0%, var(--vivo-purple-light) 100%);
      border-radius: 4px;
      transition: width 0.5s ease;
    }

    .progress-percent {
      font-size: 14px;
      font-weight: 600;
      color: var(--vivo-purple);
      min-width: 40px;
    }

    .renew-info {
      font-size: 11px;
      color: #888;
      margin: 0;
    }

    .divider {
      height: 1px;
      background: var(--vivo-gray-border);
      margin: 8px 0 16px 0;
    }

    .actions-menu {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }

    .action-item {
      background: white;
      border-radius: 12px;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 14px;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    }

    .action-item:hover {
      transform: translateX(4px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .action-item.primary {
      background: linear-gradient(90deg, var(--vivo-purple) 0%, var(--vivo-purple-light) 100%);
      color: white;
    }

    .action-item.primary .action-arrow {
      color: white;
    }

    .action-icon {
      font-size: 20px;
    }

    .action-text {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
    }

    .action-arrow {
      color: #ccc;
    }

    .recent-section {
      margin-top: 8px;
    }

    .section-label {
      font-size: 12px;
      font-weight: 600;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0 0 12px 0;
    }

    .activity-item {
      background: white;
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .activity-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }

    .activity-icon.success {
      background: var(--vivo-green-bg);
      color: var(--vivo-green);
    }

    .activity-content {
      flex: 1;
    }

    .activity-title {
      font-size: 13px;
      font-weight: 500;
      color: #333;
      margin: 0 0 2px 0;
    }

    .activity-date {
      font-size: 11px;
      color: #888;
      margin: 0;
    }
  `]
})
export class DashboardComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }

  assinar() {
    // Simular ação de assinatura
    console.log('Iniciar processo de assinatura');
  }
}
