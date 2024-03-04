# Nguyen Phat Store Services

## Sử dụng Prisma

Generate Prisma Client

```
prisma generate
```

## Chạy chương trình trên Local

Chạy file docker-compose.yml trong thư mục script/store-docker để tạo Docker Images

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

Build docker image

```
pnpm docker:build
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
