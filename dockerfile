# 1. Use a imagem oficial do Node.js
FROM node:18-alpine

# 2. Definir diretório de trabalho dentro do contêiner
WORKDIR /app

# 3. Copiar os arquivos de dependência
COPY package*.json ./

# 4. Instalar dependências
RUN npm install

# 5. Copiar o restante dos arquivos do projeto
COPY . .

# 6. Expõe a porta que o Node.js escuta
EXPOSE 3001

# 7. Comando para iniciar a aplicação
CMD ["node", "index.js"]
