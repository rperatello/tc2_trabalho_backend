#!/bin/sh
heroku container:login
heroku container:push web -a trabalho-tc2-db-agenda
heroku container:release web -a trabalho-tc2-db-agenda
heroku logs --tail -a trabalho-tc2-db-agenda
