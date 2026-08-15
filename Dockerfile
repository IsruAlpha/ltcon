FROM node:20-slim

WORKDIR /app

COPY template-nextjs/package.json template-nextjs/package-lock.json* ./
RUN npm install

COPY template-nextjs/ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
