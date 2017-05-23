#!/usr/bin/env bash

if [ ! -z $TRAVIS ]; then
    echo "Starting dockerized CouchDB"
    docker run --ulimit nofile=2048:2048 -d -p 5984:5984 klaemo/couchdb

    # wait for couchdb to start
    while [ '200' != $(curl -s -o /dev/null -w %{http_code} http://127.0.0.1:5984) ]; do
        echo "Waiting for CouchDB to start..."
        sleep 1;
    done
fi
