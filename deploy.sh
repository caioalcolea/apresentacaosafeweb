#!/bin/bash

set -e

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║     Safeweb × Vivo Presentation - Deploy Script                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
APP_DIR="/root/safeweb"
IMAGE_NAME="safeweb-presentation"
STACK_NAME="safeweb"

cd $APP_DIR

# ============================================================================
# FASE 1: LIMPEZA (Opcional)
# ============================================================================
echo -e "${YELLOW}🧹 FASE 1: Limpeza de recursos antigos${NC}"
echo ""

# Remove old images if they exist
echo -e "${BLUE}🗑️  Removendo imagens antigas do safeweb...${NC}"
docker images | grep $IMAGE_NAME | grep -v latest | awk '{print $3}' | xargs -r docker rmi -f 2>/dev/null || true
echo -e "${GREEN}✅ Limpeza concluída${NC}"
echo ""

# ============================================================================
# FASE 2: BUILD
# ============================================================================
echo -e "${YELLOW}🔨 FASE 2: Build da Imagem Docker${NC}"
echo ""

echo -e "${BLUE}📦 Construindo imagem $IMAGE_NAME:latest...${NC}"
docker build --no-cache -t $IMAGE_NAME:latest .

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Build concluído com sucesso${NC}"
else
  echo -e "${RED}❌ Erro no build${NC}"
  exit 1
fi
echo ""

# ============================================================================
# FASE 3: DEPLOY
# ============================================================================
echo -e "${YELLOW}🚀 FASE 3: Deploy do Serviço${NC}"
echo ""

echo -e "${BLUE}🚀 Fazendo deploy do stack $STACK_NAME...${NC}"
docker stack deploy -c docker-compose.yml $STACK_NAME

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Deploy iniciado${NC}"
else
  echo -e "${RED}❌ Erro no deploy${NC}"
  exit 1
fi
echo ""

# Force update if service already exists
echo -e "${BLUE}🔄 Forçando atualização do serviço...${NC}"
sleep 3
docker service update --force ${STACK_NAME}_safeweb-presentation 2>/dev/null || true
echo ""

# ============================================================================
# FASE 4: VERIFICAÇÃO
# ============================================================================
echo -e "${YELLOW}🔍 FASE 4: Verificação${NC}"
echo ""

echo -e "${BLUE}⏳ Aguardando serviço iniciar (15s)...${NC}"
sleep 15

echo ""
echo -e "${BLUE}📊 Status do Serviço:${NC}"
docker service ls | grep $STACK_NAME

echo ""
echo -e "${BLUE}📦 Logs recentes:${NC}"
docker service logs --tail 20 ${STACK_NAME}_safeweb-presentation 2>&1 | tail -20 || echo "Aguardando logs..."

echo ""
echo -e "${BLUE}🔍 Health Check:${NC}"
# Get container ID and check health
CONTAINER_ID=$(docker ps -q -f name=${STACK_NAME}_safeweb-presentation)
if [ -n "$CONTAINER_ID" ]; then
  docker inspect --format='{{.State.Health.Status}}' $CONTAINER_ID 2>/dev/null || echo "Aguardando health check..."
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                     DEPLOY CONCLUÍDO!                            ║"
echo "╠══════════════════════════════════════════════════════════════════╣"
echo "║                                                                  ║"
echo "║  🌐 URL: https://safeweb.talkhub.me                              ║"
echo "║  📊 Slides: https://safeweb.talkhub.me/slides                    ║"
echo "║  📱 App Demo: https://safeweb.talkhub.me/app                     ║"
echo "║  ❤️  Health: https://safeweb.talkhub.me/health                   ║"
echo "║                                                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
