SafeID Vivo — Especificação UX/UI
Webapp Integrado ao App Meu Vivo

1. PALETA DE CORES
Cores Primárias (Vivo Brand)
CorHEXUsoRoxo Vivo#660099Headers, CTAs primários, ícones ativosRoxo Escuro#4A0072Gradientes, hover statesBranco#FFFFFFBackgrounds, textos sobre roxo
Cores Secundárias
CorHEXUsoLaranja Vivo#FF6600Alertas, badges urgentes, destaquesVerde Sucesso#28A745Status ativo, confirmações, checksVermelho Alerta#DC3545Erros, certificado expiradoCinza Texto#333333Texto principalCinza Secundário#666666Texto secundário, labelsCinza Background#F5F5F5Cards, separadores
Gradientes
css/* Header principal */
background: linear-gradient(135deg, #660099 0%, #4A0072 100%);

/* Botão CTA */
background: linear-gradient(90deg, #660099 0%, #8B31B8 100%);

/* Banner promocional */
background: linear-gradient(135deg, #FF6600 0%, #FF8533 100%);

2. TIPOGRAFIA
Fonte Principal
Vivo Type (ou fallback: Roboto / SF Pro)
ElementoPesoTamanhoLine HeightH1 (Título tela)Bold 70024px28pxH2 (Subtítulo)SemiBold 60018px22pxH3 (Card title)SemiBold 60016px20pxBodyRegular 40014px20pxCaptionRegular 40012px16pxLabelMedium 50012px16pxButtonSemiBold 60014px20px

3. ESTRUTURA DE TELA
Layout Base (Mobile-first)
┌─────────────────────────────────┐
│  STATUS BAR (sistema)     24px  │
├─────────────────────────────────┤
│  HEADER VIVO              56px  │
│  ← Voltar    SafeID    [?]      │
├─────────────────────────────────┤
│                                 │
│  CONTENT AREA                   │
│  (scroll vertical)              │
│  padding: 16px                  │
│                                 │
│                                 │
├─────────────────────────────────┤
│  BOTTOM ACTION (se houver) 72px │
│  [    BOTÃO PRIMÁRIO    ]       │
└─────────────────────────────────┘
Header (56px altura)

Background: Roxo Vivo #660099
Ícone voltar: Branco, 24px, esquerda (16px margin)
Título: Branco, 18px SemiBold, centralizado
Ícone ajuda: Branco, 24px, direita (16px margin)

Espaçamentos Padrão
ElementoValorMargin lateral tela16pxGap entre cards12pxPadding interno card16pxBorder radius card12pxBorder radius botão8px

4. COMPONENTES UI
Card Padrão
┌────────────────────────────────┐
│  16px padding                  │
│  ┌──────┐                      │
│  │ ICON │  Título Card         │
│  │ 40px │  Descrição secundária│
│  └──────┘                      │
│                          [→]   │
└────────────────────────────────┘
Background: #FFFFFF
Border: 1px solid #E0E0E0
Shadow: 0 2px 8px rgba(0,0,0,0.08)
Botão Primário
┌────────────────────────────────┐
│      TEXTO DO BOTÃO            │
└────────────────────────────────┘
Height: 48px
Background: Gradient roxo
Text: Branco, 14px SemiBold
Border-radius: 8px
Botão Secundário
┌────────────────────────────────┐
│      TEXTO DO BOTÃO            │
└────────────────────────────────┘
Height: 48px
Background: Transparente
Border: 2px solid #660099
Text: #660099, 14px SemiBold
Badge de Status
[● ATIVO]     → Background: #E8F5E9, Text: #28A745
[● PENDENTE]  → Background: #FFF3E0, Text: #FF6600
[● EXPIRADO]  → Background: #FFEBEE, Text: #DC3545
Input Field
┌────────────────────────────────┐
│  Label                         │
│  ┌──────────────────────────┐  │
│  │ Placeholder...           │  │
│  └──────────────────────────┘  │
│  Helper text                   │
└────────────────────────────────┘
Height input: 48px
Border: 1px solid #E0E0E0
Border focus: 2px solid #660099
Border-radius: 8px

5. FLUXO DE TELAS
Jornada Completa (5 telas principais)
[HOME VIVO] → [DESCOBERTA] → [ONBOARDING] → [ESCOLHA PLANO] → [EMISSÃO] → [DASHBOARD]
                  ↓              ↓               ↓              ↓            ↓
              Banner ou      3 telas de       4 opções       Formulário   Status +
              Card promo     explicação       de plano       + validação   ações

TELA 1: DESCOBERTA (Entry Point)
Localização: Home do app Meu Vivo, seção "Para Você" ou "Novidades"
┌─────────────────────────────────┐
│  ← Voltar       Meu Vivo        │
├─────────────────────────────────┤
│                                 │
│  [BANNER HERO - 160px altura]   │
│  ┌─────────────────────────────┐│
│  │ 🔐                          ││
│  │ CERTIFICADO DIGITAL         ││
│  │ Incluso no seu plano!       ││
│  │                             ││
│  │ Assine documentos com       ││
│  │ validade jurídica           ││
│  │                             ││
│  │ [CONHECER]  [ATIVAR AGORA]  ││
│  └─────────────────────────────┘│
│  Background: Gradient laranja   │
│                                 │
│  ─────────────────────────────  │
│                                 │
│  Ou como CARD na lista:         │
│  ┌─────────────────────────────┐│
│  │ 🔐  Certificado Digital     ││
│  │     3 assinaturas grátis    ││
│  │     no seu plano!      [→]  ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
Variação para MEI (urgência):
┌─────────────────────────────────┐
│  ⚠️ ATENÇÃO MEI                 │
│  Em 2027, certificado digital   │
│  será OBRIGATÓRIO para você!    │
│  [SAIBA MAIS]                   │
└─────────────────────────────────┘
Background: #FFF3E0 (laranja claro)
Border-left: 4px solid #FF6600

TELA 2: ONBOARDING (3 steps com swipe)
┌─────────────────────────────────┐
│  ← Voltar      SafeID     [?]   │
├─────────────────────────────────┤
│                                 │
│           [ ILUSTRAÇÃO ]        │
│              180px              │
│                                 │
│  ─────────────────────────────  │
│                                 │
│        O que é SafeID?          │
│           (H1 24px)             │
│                                 │
│  Certificado digital ICP-Brasil │
│  com validade jurídica plena.   │
│  Funciona no cartório, tribunal │
│  e conselhos profissionais.     │
│        (Body 14px, center)      │
│                                 │
│         ● ○ ○  (indicador)      │
│                                 │
├─────────────────────────────────┤
│  [        PRÓXIMO        ]      │
│  [        PULAR          ]      │
└─────────────────────────────────┘
Step 1: O que é SafeID?

Ilustração: Documento com check
Texto: Certificado digital qualificado

Step 2: Quem precisa?

Ilustração: Advogado, médico, contador
Texto: Profissionais liberais + MEIs

Step 3: Por que na Vivo?

Ilustração: Smartphone com escudo
Texto: 3 grátis + no app + sem token


TELA 3: ESCOLHA DE PLANO
┌─────────────────────────────────┐
│  ← Voltar    Escolha seu plano  │
├─────────────────────────────────┤
│                                 │
│  Seu plano Vivo inclui:         │
│  3 assinaturas digitais/mês     │
│                                 │
│  ┌─────────────────────────────┐│
│  │ ✓ RECOMENDADO               ││
│  │ ─────────────────────────── ││
│  │ GRÁTIS                      ││
│  │ 3 assinaturas/mês           ││
│  │                             ││
│  │ ✓ Validade jurídica plena   ││
│  │ ✓ Funciona em cartórios     ││
│  │ ✓ Sem token físico          ││
│  │                             ││
│  │ [     ATIVAR GRÁTIS     ]   ││
│  └─────────────────────────────┘│
│  Border: 2px solid #28A745      │
│                                 │
│  Precisa de mais?               │
│                                 │
│  ┌──────────┐ ┌──────────┐     │
│  │ESSENCIAL │ │PROFISSION│     │
│  │ R$ 2,99  │ │ R$ 6,99  │     │
│  │ 10/mês   │ │ 50/mês   │     │
│  │[ESCOLHER]│ │[ESCOLHER]│     │
│  └──────────┘ └──────────┘     │
│                                 │
│  ┌─────────────────────────────┐│
│  │ ILIMITADO         R$ 21,99  ││
│  │ Assinaturas ilimitadas      ││
│  │ [ESCOLHER]                  ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
Destaque visual:

Plano grátis: Border verde, badge "RECOMENDADO"
Outros planos: Cards menores, grid 2 colunas
Ilimitado: Card full width no final


TELA 4: EMISSÃO DO CERTIFICADO
┌─────────────────────────────────┐
│  ← Voltar    Emitir Certificado │
├─────────────────────────────────┤
│                                 │
│  Confirme seus dados            │
│                                 │
│  ┌─────────────────────────────┐│
│  │ Nome completo               ││
│  │ ┌─────────────────────────┐ ││
│  │ │ JOÃO SILVA SANTOS       │ ││
│  │ └─────────────────────────┘ ││
│  │ ✓ Dados do cadastro Vivo    ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ CPF                         ││
│  │ ┌─────────────────────────┐ ││
│  │ │ 123.456.789-00          │ ││
│  │ └─────────────────────────┘ ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ E-mail                      ││
│  │ ┌─────────────────────────┐ ││
│  │ │ joao@email.com          │ ││
│  │ └─────────────────────────┘ ││
│  └─────────────────────────────┘│
│                                 │
│  ─────────────────────────────  │
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📹 VALIDAÇÃO POR VÍDEO      ││
│  │                             ││
│  │ Para sua segurança, vamos   ││
│  │ confirmar sua identidade    ││
│  │ por videoconferência.       ││
│  │                             ││
│  │ Duração: ~3 minutos         ││
│  └─────────────────────────────┘│
│  Background: #F5F5F5            │
│                                 │
│  ☑️ Li e aceito os termos       │
│                                 │
├─────────────────────────────────┤
│  [    EMITIR CERTIFICADO    ]   │
│                                 │
│  Cobrança na sua fatura Vivo    │
│  (caption 12px, center)         │
└─────────────────────────────────┘
Estados do formulário:

Campos pré-preenchidos: Background #F5F5F5, não editáveis
Campos editáveis: Background branco, border #E0E0E0
Erro: Border #DC3545, helper text vermelho


TELA 5: DASHBOARD (Certificado Ativo)
┌─────────────────────────────────┐
│  ← Voltar    Meu SafeID    [?]  │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│
│  │                             ││
│  │  [AVATAR]   João Silva      ││
│  │             CPF: •••.789-00 ││
│  │                             ││
│  │  ┌───────────────────────┐  ││
│  │  │ ● ATIVO               │  ││
│  │  │   até 15/12/2028      │  ││
│  │  └───────────────────────┘  ││
│  │  Badge verde                ││
│  │                             ││
│  └─────────────────────────────┘│
│  Background: Gradient roxo      │
│  Text: Branco                   │
│                                 │
│  ─────────────────────────────  │
│                                 │
│  Assinaturas este mês           │
│  ┌─────────────────────────────┐│
│  │  2 de 3 usadas              ││
│  │  [████████░░░░] 67%         ││
│  │  Renova em 15 dias          ││
│  └─────────────────────────────┘│
│                                 │
│  ─────────────────────────────  │
│                                 │
│  ┌─────────────────────────────┐│
│  │ ✍️  Assinar Documento   [→] ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📋  Histórico           [→] ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ ⬆️  Fazer Upgrade       [→] ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ ❓  Ajuda e Suporte     [→] ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
Card de status:

Ativo: Verde #28A745
Expirando (30 dias): Laranja #FF6600
Expirado: Vermelho #DC3545


6. MICRO-INTERAÇÕES
Transições
AçãoAnimaçãoTroca de telaSlide horizontal, 300ms easeAbrir modalFade in + scale 0.9→1, 200msBotão tapScale 0.98, 100msLoadingSpinner roxo Vivo, pulse
Feedback Háptico

Sucesso (certificado emitido): Vibração curta
Erro: Vibração dupla curta
Seleção de plano: Tap suave

Loading States
┌─────────────────────────────────┐
│                                 │
│         [SPINNER ROXO]          │
│                                 │
│      Emitindo certificado...    │
│      Isso leva ~30 segundos     │
│                                 │
│  ████████████░░░░░░░░  60%      │
│                                 │
└─────────────────────────────────┘

7. ASSETS NECESSÁRIOS
Ícones (24px, stroke 2px)

ic_certificate — Certificado/documento
ic_signature — Caneta assinando
ic_shield — Escudo segurança
ic_video — Câmera videoconferência
ic_check — Check confirmação
ic_arrow_right — Seta navegação
ic_help — Interrogação ajuda
ic_upgrade — Seta para cima

Ilustrações Onboarding (180x180px)

illu_certificate — Documento com check verde
illu_professionals — Advogado, médico, contador
illu_smartphone — Celular com escudo

Logos

logo_safeid — Logo SafeID (colorido e branco)
logo_safeweb — Logo Safeweb (para tela de parceiro)
logo_icp — Selo ICP-Brasil


8. ESTADOS DE ERRO
Erro de Validação
┌─────────────────────────────────┐
│  ❌ Não foi possível validar    │
│                                 │
│  Verifique sua conexão e tente  │
│  novamente.                     │
│                                 │
│  [TENTAR NOVAMENTE]             │
└─────────────────────────────────┘
Certificado Expirado
┌─────────────────────────────────┐
│  ⚠️ Certificado expirado        │
│                                 │
│  Seu certificado expirou em     │
│  15/12/2025. Renove agora.      │
│                                 │
│  [RENOVAR CERTIFICADO]          │
└─────────────────────────────────┘
Background: #FFEBEE
Limite Atingido
┌─────────────────────────────────┐
│  📊 Limite atingido             │
│                                 │
│  Você usou 3/3 assinaturas      │
│  este mês. Faça upgrade!        │
│                                 │
│  [VER PLANOS]                   │
└─────────────────────────────────┘
Background: #FFF3E0

9. ACESSIBILIDADE

Contraste mínimo: 4.5:1 para texto
Touch targets: Mínimo 44x44px
Labels em todos os inputs
Suporte a VoiceOver/TalkBack
Modo escuro: Seguir configuração do app Vivo


10. MÉTRICAS DE SUCESSO
MétricaTargetTaxa conversão (descoberta → ativação)>15%Tempo médio onboarding<2 minAbandono no formulário<20%NPS pós-emissão>8.0

Documento: Especificação UX/UI SafeID Vivo
Versão: 1.0
Data: Dezembro 2025
Autor: Move4 Publicidade
