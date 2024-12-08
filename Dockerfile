# Bắt đầu từ image Node.js chính thức
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies của ứng dụng
RUN npm install

# Sao chép toàn bộ mã nguồn vào trong container
COPY . .

# Mở cổng mà ứng dụng sẽ chạy
EXPOSE 3009

# Lệnh chạy ứng dụng khi container được khởi động
CMD ["npm", "run", "start"]
