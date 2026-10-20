# Этап 1: собираем React-приложение
FROM node:22-alpine AS build
# Рабочая папка внутри временного образа
WORKDIR /app
# Сначала копируем описание зависимостей для кеширования слоя
COPY package*.json ./
# Устанавливаем точные версии из package-lock.json
RUN npm ci
# Копируем исходный код
COPY . .
# Создаём production-сборку в папке dist
RUN npm run build

# Этап 2: создаём небольшой production-образ
FROM nginx:1.27-alpine
# Заменяем стандартный конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Копируем только готовую сборку из первого этапа
COPY --from=build /app/dist /usr/share/nginx/html
# Документируем HTTP-порт контейнера
EXPOSE 80
# Запускаем Nginx главным процессом контейнера
CMD ["nginx", "-g", "daemon off;"]
