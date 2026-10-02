# node-mongo-k8s-job-report-generate

1. Create a docker image

    docker build -t node-mongo-report:latest .

2. Adding tag to the image

    docker tag node-mongo-report:latest azhardanish9/node-mongo-k8s-job-report:1.0

3. Pushing the docker image to docker hub registry

    docker push azhardanish9/node-mongo-k8s-job-report:1.0

4. create secret in kubernetes

    kubectl apply -f k8s/secret.yml

5. create jobs in kubernetes

    kubectl apply -f k8s/jobs.yml



