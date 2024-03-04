## deploy to kubernetes

create namespace

```
kubectl create namespace np-k8s
```

apply file yaml

```
kubectl apply -f ./k8s/secret.yaml
kubectl apply -f ./k8s/deployment.yaml
```

get pods

```
kubectl get pods --namespace=np-k8s
```

logs

```
kubectl logs <pods-name> --namespace=np-k8s
```

get service

```
kubectl get service --namespace=np-k8s
```

expose

```
kubectl expose deployment np-services-deployment -n np-k8s --type=LoadBalancer --port 80 --target-port 3000
```
