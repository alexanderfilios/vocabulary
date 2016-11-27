## Docker Setup Explained ##

We only load the static files from ``dist`` that will be served from the server of the Docker container.
To push a new version to the Docker repository run:

```bash
$ docker build -t alexanderfilios/vocabulary-frontend .
$ docker login --username=alexandrosfilios --email=alexanderfilios@hotmail.com
$ docker push alexandrosfilios/vocabulary-frontend
```

To deploy from Docker repository (Application will be running on http://localhost:9001/#/)
```bash
$ docker run -d -p 9001:80 --name vocabulary-frontend alexandrosfilios/vocabulary-frontend /usr/sbin/apache2ctl -D FOREGROUND
```

To stop the server
```bash
$ docker stop vocabulary-frontend
```

To update local version from Docker repository
```bash
$ docker pull alexandrosfilios/vocabulary-frontend
```