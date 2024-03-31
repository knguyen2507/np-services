# Nguyen Phat Store Services

## Sử dụng Prisma

Generate Prisma Client

```
prisma generate
```

## File hosts

Nhấn tổ hợp phím Windows + R

Nhập lệnh

```
Nhập: C:\Windows\System32\Drivers\etc\hosts
```

Thêm các dòng vào file hosts:

```
127.0.0.1 store-elasticsearch
127.0.0.1 store-redis
127.0.0.1 store-mongodb
```

## Chạy chương trình trên Local

Chạy file docker-compose.yml tạo Docker Images

```
docker compose up -d
```

Tạo file package.json

```
pnpm i
```

Generate prisma

```
prisma generate
```

Chạy app

```
pnpm start:dev
```

## Docker Container

Build docker image (environment)

```
pnpm env:docker:build
```

Build docker image (server)

```
pnpm server:docker:build
```

Build docker container

```
pnpm server:docker:start
```

## Localhost

Api Documentation

```
http://localhost:3000/docs
```

Tài khoản Admin

```
username: admin001
password: 123456
```
