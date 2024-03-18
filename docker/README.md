## Docker

create docker image

```
pnpm server:docker:build
```

run docker image

```
pnpm server:docker:start
```

push docker image to hub

```
docker tag np-services <username>/np-services
docker push <username>/np-services
```
