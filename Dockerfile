# Sử dụng Node.js LTS version làm base image
FROM node:20-alpine

# Tạo và chuyển đến thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Cấp quyền thực thi cho entrypoint script
RUN chmod +x entrypoint.sh

# Expose port 7860
EXPOSE 7860

# Sử dụng entrypoint script
ENTRYPOINT ["./entrypoint.sh"] 