FROM java:8
ADD vocabulary-0.0.1-SNAPSHOT.jar app.jar
RUN sh -c 'touch /app.jar'
ENV JAVA_OPTS="-Djava.security.egd=file:/dev/./urandom -Dspring.profiles.active=container"
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -jar /app.jar" ]
