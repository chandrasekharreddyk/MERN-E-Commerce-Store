# 1. Base image
FROM node:20-alpine

# 2. Workdir inside container
WORKDIR /app

# 3. Copy only package files first and install dependencies
COPY package.json ./
RUN npm install

# 4. Copy backend source into image
COPY backend ./backend

# 5. Set working dir to backend code
WORKDIR /app/backend

# 6. Environment
ENV NODE_ENV=development
ENV PORT=5000

# 7. Expose port
EXPOSE 5000

# 8. Start command 
CMD ["npm", "run", "backend"]