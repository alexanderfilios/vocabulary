## Liquibase Setup Explained ##

* Create new logfile
<code>./liquibase --driver=com.mysql.jdbc.Driver
             --changeLogFile=../../Dropbox/logfile.yaml
             --url="jdbc:mysql://127.0.0.1:3306/Vocabulary"
             --username=root --password="Ece-181920"
             --classpath="../../Downloads/jdbc.jar"
             generateChangeLog</code>
