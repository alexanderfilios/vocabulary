## Docker Setup Explained ##

### Set up a reachable MySQL docker container ###
* Create the docker container
This container will contain only an installation of MySQL (from the image ``mysql:latest``) and of the database ``Vocabulary`` we will need. The schema and the population with data is not necessary, as they will be taken care of by ``liquibase``.
The database is accessible by us on the port 5000 but it is mapped on the default MySQL port 3306 on the other side.
We will use the environment variables we set here (``-e``) later in our configuration.

```bash
$ docker run -d --name demo-mysql \
	-e MYSQL_ROOT_PASSWORD=pass \
	-e MYSQL_DATABASE=Vocabulary \
	-e MYSQL_USER=dbuser \
	-e MYSQL_PASSWORD=dbpass \
	-p 0.0.0.0:5000:3306 \
	mysql:latest
```

* To start it up again, check the list of the docker containers (all) and run the one containing it.

```bash
$ docker ps -a
$ docker start demo-mysql
```

> To access it remotely for test reasons only
```bash
$ /usr/local/mysql/bin/mysql --host=0.0.0.0 --port=5000 -u root -p
```
The password is ``pass`` as we set it above when we created the image and ran the container. Run ``show databases;`` and check that the database ``Vocabulary`` is indeed there. The schema should be still empty by now.

The ``application.yml`` file should have the following persistence configuration that uses the configuration we defined before.

```yaml
---
spring:
    profiles: container
    datasource:
        url: jdbc:mysql://${MYSQL_PORT_3306_TCP_ADDR}:${MYSQL_PORT_3306_TCP_PORT}/${MYSQL_ENV_MYSQL_DATABASE}
        username: ${MYSQL_ENV_MYSQL_USER}
        password: ${MYSQL_ENV_MYSQL_PASSWORD}
```

## Create a docker container for the app ##

Create the application .jar (``mvn clean package``) and build the docker image (``mvn -e docker:build``).

The configuration is in the ``Dockerfile`` and defines that
    * that the application should run with the java:8 image
    * that the environment variable that defines the profile should be overwritten: ``-Dspring.profiles.active=container``
    * which command should be run everytime the docker container is started

The build process is already defined in the plugin of the pom.xml which references this ``Dockerfile`` and followingly runs the ``docker build`` command.
The build process requires the newest version of the application fat jar to be there. Hence, we first have to package the application and then run the docker plugin.

```bash
$ /opt/apache-maven-3.3.9/bin/mvn -e clean package docker:build
```

> If the Java version is unsupported, then try adding the Java directory to the environment variables.

```bash
$ export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_91.jdk/Contents/Home
```

We should now be able to find the image of the app when we call ``docker images``.

To publish the newly-built image to the repository, find the <IMAGE ID> from the image list by calling ``docker images``, re-tag it to ``latest``. 
Then login to the account, pull the newest version and then push the local one to the repo.


```bash
$ docker tag <IMAGE ID> alexandrosfilios/vocabulary-backend:latest
$ docker login
$ docker push alexandrosfilios/vocabulary-backend
```

To test that it was deployed successfully, remove the local image, then login, download the one from the repo and run it as follows.

```bash
$ docker rmi alexandrosfilios/vocabulary-backend
$ docker login
$ docker pull alexandrosfilios/vocabulary-backend
$ docker run alexandrosfilios/vocabulary-backend
```

Since the local copy has been deleted, if we don't pull manually, Docker will be forced to download the one from the repository.

## Linking the MySQL and app container and running the app ##

Now the images ``demo-mysql`` and ``demo-mysql`` are in place. A combined image results by linking the image we created for our app and the container we created from the ``mysql:latest`` image and by calling the ``run`` command we create the corresponding container.

The ``link`` argument links the newly-created image to the demo-mysql image we previously created and gives it the alias name ``mysql``. The new image will have access to an environment variable ``VAR1`` of this image by looking up the environment variable ``MYSQL_VAR1``.
If we hadn't used the alias, this would be ``DEMO_MYSQL_VAR1``.

The name of the container is ``vocabulary-backend`` (remove it by calling ``docker rm vocabulary-backend`` if already existing), it maps to ``localhost:8082`` on our side and on ``localhost:8083`` on the side of the container.

That means, when we call the 8082 from our side, it will be like calling 8083 within the container. The port number 8083 must be in accordance with the property variable ``spring.port`` in the ``applications.yml`` file.

The last argument is the image we just created for our application. The exact name is defined in the plugin that created the image, more precisely in the field ``imageName``.

```bash
$ docker run -it \
    --name vocabulary-backend \
    --link demo-mysql:mysql \
    -p 8082:8083 \
    alexandrosfilios/vocabulary-backend:1.1
```

Instead of version ``1.1``, we can also run it on the ``latest`` version.