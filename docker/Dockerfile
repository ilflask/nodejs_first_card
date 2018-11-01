FROM debian:jessie

RUN rm -rf /var/lib/apt/lists/* \
&& apt-get update \
&& apt-get install -y nano cron graphicsmagick

RUN rm -rf /var/lib/apt/lists/* \
&& apt-get update \
&& apt-get install -y curl \
&& curl -sL https://deb.nodesource.com/setup_8.x | bash - \
&& apt-get install -y nodejs

COPY run.sh /
COPY crontab /
RUN chmod +x /run.sh
CMD /run.sh