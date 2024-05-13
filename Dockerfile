# Estágio de construção
FROM node:latest AS build

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do aplicativo para o diretório de trabalho
COPY . .

# Instale as dependências do projeto
RUN npm install

# Execute o comando de construção do Vite para gerar os arquivos estáticos
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copie os arquivos estáticos gerados pelo Vite para o diretório padrão do servidor HTTP do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta 80 para acesso externo
EXPOSE 80

# Comando para iniciar o servidor HTTP do Nginx quando o contêiner for iniciado
CMD ["nginx", "-g", "daemon off;"]
