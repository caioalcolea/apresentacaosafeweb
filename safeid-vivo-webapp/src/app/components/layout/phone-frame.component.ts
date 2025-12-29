import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-phone-frame',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
    <div class="phone-frame">
      <!-- Status Bar -->
      <div class="status-bar">
        <span class="time">9:41</span>
        <div class="status-icons">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      <!-- Header Vivo -->
      <div class="vivo-header">
        <button class="back-btn" *ngIf="showBack">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span class="header-title">{{ title }}</span>
        <button class="help-btn" *ngIf="showHelp">
          <mat-icon>help_outline</mat-icon>
        </button>
      </div>

      <!-- Content Area -->
      <div class="content-area">
        <ng-content></ng-content>
      </div>

      <!-- Bottom Action -->
      <div class="bottom-action" *ngIf="showBottomAction">
        <ng-content select="[bottom-action]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .phone-frame {
      width: 375px;
      height: 667px;
      background: #f5f5f5;
      border-radius: 40px;
      border: 8px solid #1a1a1a;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      position: relative;
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
      transition: background 0.2s;
    }

    .back-btn:hover, .help-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .header-title {
      color: white;
      font-size: 18px;
      font-weight: 600;
      flex: 1;
      text-align: center;
    }

    .content-area {
      flex: 1;
      overflow-y: auto;
      background: #f5f5f5;
    }

    .bottom-action {
      padding: 16px;
      background: white;
      border-top: 1px solid var(--vivo-gray-border);
    }
  `]
})
export class PhoneFrameComponent {
  @Input() title = 'SafeID';
  @Input() showBack = true;
  @Input() showHelp = true;
  @Input() showBottomAction = false;
}
