import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

interface OnboardingStep {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="onboarding-container">
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
        <span class="header-title">SafeID</span>
        <button class="help-btn">
          <mat-icon>help_outline</mat-icon>
        </button>
      </div>

      <!-- Content -->
      <div class="content">
        <div class="step-content animate-fade-in" [class.slide-left]="isAnimating()">
          <!-- Icon Circle -->
          <div class="icon-circle">
            <span class="step-icon">{{ steps[currentStep()].icon }}</span>
          </div>

          <!-- Title -->
          <h1 class="step-title">{{ steps[currentStep()].title }}</h1>

          <!-- Description -->
          <p class="step-description">{{ steps[currentStep()].description }}</p>
        </div>

        <!-- Progress Indicators -->
        <div class="progress-indicators">
          @for (step of steps; track $index) {
            <div
              class="indicator"
              [class.active]="$index === currentStep()"
              [class.completed]="$index < currentStep()">
            </div>
          }
        </div>
      </div>

      <!-- Bottom Actions -->
      <div class="bottom-actions">
        <button class="btn-primary" (click)="nextStep()">
          {{ currentStep() === steps.length - 1 ? 'COMEÇAR' : 'PRÓXIMO' }}
        </button>
        <button class="btn-skip" (click)="skip()" *ngIf="currentStep() < steps.length - 1">
          Pular
        </button>
      </div>
    </div>
  `,
  styles: [`
    .onboarding-container {
      width: 375px;
      height: 667px;
      background: white;
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
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 24px;
      text-align: center;
    }

    .step-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all 0.3s ease;
    }

    .step-content.slide-left {
      opacity: 0;
      transform: translateX(-20px);
    }

    .icon-circle {
      width: 120px;
      height: 120px;
      background: linear-gradient(135deg, var(--vivo-purple) 0%, var(--vivo-purple-dark) 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32px;
      box-shadow: 0 8px 32px rgba(102, 0, 153, 0.3);
    }

    .step-icon {
      font-size: 48px;
    }

    .step-title {
      font-size: 24px;
      font-weight: 700;
      color: #333;
      margin: 0 0 16px 0;
      line-height: 28px;
    }

    .step-description {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
      margin: 0;
      max-width: 280px;
    }

    .progress-indicators {
      display: flex;
      gap: 8px;
      margin-top: 40px;
    }

    .indicator {
      width: 32px;
      height: 6px;
      background: #e0e0e0;
      border-radius: 3px;
      transition: all 0.3s ease;
    }

    .indicator.active {
      background: var(--vivo-purple);
      width: 40px;
    }

    .indicator.completed {
      background: var(--vivo-purple-light);
    }

    .bottom-actions {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .btn-primary {
      width: 100%;
      height: 48px;
      background: linear-gradient(90deg, var(--vivo-purple) 0%, var(--vivo-purple-light) 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .btn-primary:hover {
      opacity: 0.9;
    }

    .btn-skip {
      background: transparent;
      border: none;
      color: #888;
      font-size: 14px;
      cursor: pointer;
      padding: 8px;
    }

    .btn-skip:hover {
      color: var(--vivo-purple);
    }
  `]
})
export class OnboardingComponent {
  currentStep = signal(0);
  isAnimating = signal(false);

  steps: OnboardingStep[] = [
    {
      icon: '🔐',
      title: 'O que é SafeID?',
      description: 'Certificado digital ICP-Brasil com validade jurídica plena. Funciona no cartório, tribunal e conselhos profissionais.'
    },
    {
      icon: '👨‍⚕️',
      title: 'Quem precisa?',
      description: 'Advogados, médicos, contadores, engenheiros e MEIs. Em 2027, será obrigatório para Microempreendedores.'
    },
    {
      icon: '📱',
      title: 'Por que na Vivo?',
      description: '3 assinaturas grátis por mês, direto no app, sem token físico. A praticidade que você precisa!'
    }
  ];

  constructor(private router: Router) {}

  nextStep() {
    if (this.currentStep() < this.steps.length - 1) {
      this.isAnimating.set(true);
      setTimeout(() => {
        this.currentStep.update(v => v + 1);
        this.isAnimating.set(false);
      }, 150);
    } else {
      this.router.navigate(['/planos']);
    }
  }

  skip() {
    this.router.navigate(['/planos']);
  }

  goBack() {
    if (this.currentStep() > 0) {
      this.currentStep.update(v => v - 1);
    } else {
      this.router.navigate(['/']);
    }
  }
}
