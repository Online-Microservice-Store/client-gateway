//Levantar NATS-SERVER
//docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
## PROD:
docker build -f dockerfile.prod -t client-gateway .