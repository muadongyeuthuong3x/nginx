LEFT JOIN với Subquery

import { getRepository } from 'typeorm';

async function getUsersWithBlogsAndComments(): Promise<Blog[]> {
  return await getRepository(Blog)
    .createQueryBuilder('blog')
    .leftJoinAndSelect(subQuery => {
      return subQuery
        .select('comment.id', 'commentId')
        .addSelect('comment.content', 'commentContent')
        .from(Comment, 'comment')
        .where('comment.blogId = blog.id');
    }, 'comments')
    .getMany();
}



LEFT JOIN với Thuộc tính của Entity

import { getRepository } from 'typeorm';

async function getUserWithBlogs(userId: number): Promise<User | undefined> {
  return await getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.blogs', 'blog')
    .where('user.id = :userId', { userId })
    .getOne();
}


 LEFT JOIN với Entity hoặc Bảng
 import { getRepository } from 'typeorm';

async function getBlogsWithUsers(): Promise<Blog[]> {
  return await getRepository(Blog)
    .createQueryBuilder('blog')
    .leftJoin(User, 'user', 'blog.userId = user.id')
    .select(['blog.id', 'blog.title', 'user.name'])
    .getMany();
}

LEFT JOIN với Bảng có tên
import { getRepository } from 'typeorm';

async function getUsersWithOrders(): Promise<User[]> {
  return await getRepository(User)
    .createQueryBuilder('user')
    .leftJoin('order', 'o', 'user.id = o.userId')
    .addSelect('o.totalAmount')
    .getMany();
}





// # syntax=docker/dockerfile:1.2

// # Sử dụng phiên bản Node.js cụ thể thông qua đối số build
// ARG NODE_VERSION=18.0.0

// # Ở ảnh cơ sở với Node.js
// FROM node:${NODE_VERSION}-alpine as base


// RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

// # Đặt thư mục làm việc
// WORKDIR /home/node/app

// # Expose port 3000 nếu ứng dụng của bạn sử dụng nó
// EXPOSE 3000

// # Giai đoạn phát triển
// FROM base as dev



// # Tạo thư mục cho bộ nhớ cache npm với quyền hợp lý
// RUN mkdir -p /home/node/app/.npm/_logs

// # Thiết lập thư mục cache npm và cấu hình toàn cục
// RUN npm config set cache /home/node/app/.npm --global

// # Đảm bảo thư mục dist tồn tại và thiết lập quyền sở hữu
// RUN mkdir -p /home/node/app/dist && \
//     chown -R node:node /home/node/app/dist

// # Cài đặt một phiên bản cụ thể của npm toàn cầu (nếu cần thiết)
// RUN npm install -g npm@9.3.1

// # Sao chép package.json và package-lock.json vào container
// COPY package.json package-lock.json ./

// # Cài đặt tất cả các phụ thuộc bao gồm cả devDependencies
// RUN npm ci --include=dev

// # Chuyển sang người dùng 'node' để cải thiện bảo mật
// USER node


// COPY --chown=node:node . .

// # Sao chép mã nguồn ứng dụng
// COPY . .

// # Lệnh để chạy ứng dụng trong chế độ phát triển
// CMD npm run start:dev


// # tạm thoi gắn --mount=type=bind,source=package.json,target=package.json  là giai đoạn phụ thuộc 
// # use Sử dụng bộ nhớ cache để tăng tốc quá trình cài đặt bằng cách lưu trữ các mô-đun npm.    --mount=type=cache,target=/root/.npm \
// # cai dat các phụ thuoc bao gom ca  Cài đặt tất cả các phụ thuộc bao gồm cả devDependencies.
// # Chuyển người dùng sang node để chạy các lệnh, cải thiện bảo mật.

// # FROM base as prod
// # COPY package.json package-lock.json ./
// # RUN --mount=type=cache,target=/root/.npm \
// # RUN  npm ci --omit=dev
// # USER node
// # COPY . .
// # CMD node src/index.js

// # npm ci --omit=dev để loại bỏ devDependencies, tối ưu hóa container cho sản xuất.


// # type=bind: Gắn kết tệp từ hệ thống tệp chủ (host) vào hệ thống tệp trong container.
// # source=package.json: Đường dẫn tệp trên máy chủ.
// # target=package.json: Đường dẫn mục tiêu trong container


// # //npm run migration:generate src/db/migrations/add_forenky_two_table error permission dist run code nestjs








# upstream client {
  #     server client:3000
  # }
  
  # upstream api {
  #     server api: 8080
  # }
  
  # # server {
  # #     listen : 80
  
  # #     location / {
  # #         proxy_pass http://client;
  # #     }
  
  # #     location /api {
  # #     rewrite /api/(.*) /$1 break;
  # #     proxy_pass http://api;
  # #    }
  # # }
  
  # server {
  #     listen 80;
  
  #     server_name localhost;
  
  #     location /api {
  #         rewrite /api/(.*) /$1 break;
  #         proxy_pass http://nest_api:8080;
  #         proxy_set_header Host $host;
  #         proxy_set_header X-Real-IP $remote_addr;
  #         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  #         proxy_set_header X-Forwarded-Proto $scheme;
  #     }
  
  #     location / {
  #         proxy_pass http://client;
  #         root /usr/share/nginx/html;
  #         try_files $uri /index.html;
  #     }
  # }
  