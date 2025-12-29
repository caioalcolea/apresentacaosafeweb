import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/descoberta/descoberta.component').then(m => m.DescobertaComponent)
  },
  {
    path: 'showcase',
    loadComponent: () => import('./pages/showcase/showcase.component').then(m => m.ShowcaseComponent)
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./pages/onboarding/onboarding.component').then(m => m.OnboardingComponent)
  },
  {
    path: 'planos',
    loadComponent: () => import('./pages/planos/planos.component').then(m => m.PlanosComponent)
  },
  {
    path: 'emissao',
    loadComponent: () => import('./pages/emissao/emissao.component').then(m => m.EmissaoComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
