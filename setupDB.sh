#!/bin/bash”
cd db
mysql -u mark < schema.sql
cd ..