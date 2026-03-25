# Local K8s MERN Setup (kind)

## Create / recreate cluster

kind delete cluster --name mern-dev
kind create cluster --name mern-dev
kubectl create namespace mern-dev
kubectl apply -f k8s/manifests/ -n mern-dev

kubectl get nodes
kubectl get pods -n mern-dev
kubectl get svc -n mern-dev

## Access frontend locally

kubectl port-forward svc/frontend-service -n mern-dev 30080:80
# open http://localhost:30080/

## Tear down

# stop port-forward: Ctrl+C in that terminal
kind delete cluster --name mern-devcd