#!/bin/bash

# Remove old files
#sudo docker stop po_kr_dev
#sudo docker rm po_kr_dev

# Build new files
#sudo docker build -f Dockerfile -t po_kr_dev:po_kr_dev .
#sudo docker run -dit -p 9000:5000 po_kr_dev


echo Building po_kr_dev:build

docker build -f Dockerfile -t po_kr_dev:build .

docker stop app

docker rm app

docker run -p 8080:80/tcp -dit --name app po_kr_dev:build

