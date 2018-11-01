#!/bin/bash

export QT_QPA_PLATFORM=offscreen
export NODE_ENV=production

crontab /crontab
service cron start
npm install

tail -f /dev/null
