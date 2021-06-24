FROM alpine:3.12

LABEL maintainer="luis@ejemplo.com"

RUN  \
  apk update && apk upgrade \
  apk add net-tools git tar wget sudo which curl 

RUN apk add --update wget

# Antes de instalar java hace falta instalar glibc una dependencia estricta para JDK 

WORKDIR /tmp

RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.21-r2/glibc-2.21-r2.apk

RUN apk add --allow-untrusted /tmp/glibc-2.21-r2.apk


## Installing JDK ##

WORKDIR /opt

# El archivo JDK sobrepasa los límites de tamaño para el repositorio así que se descargará directamente al contenedor

RUN wget --no-cookies --no-check-certificate --header "Cookie: oraclelicense=accept-securebackup-cookie" \
        https://javadl.oracle.com/webapps/download/GetFile/1.8.0_271-b09/61ae65e088624f5aaa0b1d2d801acb16/linux-i586/jdk-8u271-linux-x64.tar.gz
RUN tar -xzvf jdk-8u271-linux-x64.tar.gz

ENV JAVA_HOME /opt/jdk1.8.0_271/jre
ENV PATH ${PATH}:${JAVA_HOME}/bin


## Installing Tomcat ##

COPY apache-tomcat-8.5.60.tar.gz .
RUN tar -xzvf apache-tomcat-8.5.60.tar.gz

ENV CATALINA_HOME /opt/apache-tomcat-8.5.60
ENV PATH $CATALINA_HOME/bin:$PATH

WORKDIR $CATALINA_HOME

RUN rm -rf $CATALINA_HOME/webapps/*

## Copying the app ##

COPY restjdbc-0.0.1-SNAPSHOT.war $CATALINA_HOME/webapps/ROOT.war

# Certificates generated (in host machine)
# certbot certonly --non-interactive --agree-tos -m luis@ejemplo.com --standalone -d vps01centos.eastus.cloudapp.azure.com

CMD sleep 20 && sh /opt/apache-tomcat-8.5.60/bin/catalina.sh run

EXPOSE 8080/tcp
EXPOSE 8443/tcp
