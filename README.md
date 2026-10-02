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

6. Go inside the pod

    kubectl exec -it nodejs-sales-report-7h574 -- sh
    cd /reports
    ls -lh
    cat sales-report.csv

    cp nodejs-sales-report-7h574:/reports/sales-report.csv ./backup/sales-report.csv


====================================================================

How to take mongodb databse backup  using job

1. create the job for backup

    kubectl apply -f mongodb-backup-jobs.yaml

    NAME                       READY   STATUS    RESTARTS   AGE
    pod/mongodb-backup-6b7jd   1/1     Running   0          107s

    NAME                       STATUS    COMPLETIONS   DURATION   AGE
    job.batch/mongodb-backup   Running   0/1           109s       109s

    k logs mongodb-backup-6b7jd

    Starting MongoDB backup...
    Backup date: 2026-10-02-12-14-10
    2026-10-02T12:14:10.601+0000	writing `movies.movies` to "archive `/backup/movies-2026-10-02-12-14-10.archive.gz`"
    2026-10-02T12:14:10.602+0000	writing `movies.ratings` to "archive `/backup/movies-2026-10-02-12-14-10.archive.gz`"
    2026-10-02T12:14:10.602+0000	writing `movies.users` to "archive `/backup/movies-2026-10-02-12-14-10.archive.gz`"
    2026-10-02T12:14:10.602+0000	writing `movies.latest_movies` to "archive `/backup/movies-2026-10-02-12-14-10.archive.gz`"
    2026-10-02T12:14:10.609+0000	done dumping `movies.users` (5 documents)
    2026-10-02T12:14:10.609+0000	writing `movies.orders` to "archive `/backup/movies-2026-10-02-12-14-10.archive.gz`"
    2026-10-02T12:14:10.610+0000	done dumping `movies.ratings` (10 documents)
    2026-10-02T12:14:10.610+0000	done dumping `movies.latest_movies` (6 documents)
    2026-10-02T12:14:10.611+0000	done dumping `movies.orders` (5 documents)
    2026-10-02T12:14:11.733+0000	done dumping `movies.movies` (23539 documents)
    MongoDB backup completed successfully.
    total 12M
    -rw-r--r-- 1 root root 12M Oct  2 12:14 movies-2026-10-02-12-14-10.archive.gz
    Keeping container alive for 600 seconds...

    mkdir -p backup

   
    k cp mongodb-backup-6b7jd:/backup/movies-2026-10-02-12-14-10.archive.gz ./backup/movies-backup.archive.gz

    cd backup
    ls -lh
    gunzip movies-backup.archive.gz


    




