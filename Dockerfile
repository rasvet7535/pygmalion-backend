# Используем официальный Node.js 22 Alpine образ
FROM node:22-alpine

# Метаданные
LABEL maintainer="Pygmalion Team"
LABEL version="0.4.02"
LABEL description="Pygmalion NOD Platform Backend"

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем исходный код
COPY backend ./backend
COPY tools ./tools
COPY docs ./docs

# Открываем порт
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Запуск сервера
CMD ["node", "backend/server.js"]
