# Utilizar la imagen base de Node.js 14
FROM node:20-alpine

ENV port=5173

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /client

# Copiar el código del cliente al directorio de trabajo
COPY . ./client

# Instalar las dependencias del cliente
RUN cd client && npm install

# Exponer el puerto utilizado por el cliente
EXPOSE 5173

# Ejecutar el script de hardening
RUN cd client && chmod +x hardening.sh

# Iniciar el cliente
CMD ["sh", "-c", "cd client && npm run dev -- --port 5173 --host 0.0.0.0 && hardening.sh"]
