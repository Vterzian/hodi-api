# Specifie l'image de base
FROM node:14

# Definit le repertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installe les dependences du projet
RUN npm install

# Copie le reste de l'application
COPY . .

# Expose le port que l'application utilise
EXPOSE 3000

# Ligne de commande pour lancer l'application
CMD [ "npm", "run", "dev" ]