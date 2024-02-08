#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <user_id> <added_count>"
    exit 1
fi

user_id=$1
added_count=$2

for i in {1..10}; do
    curl -X POST "http://localhost:5000/bet?userId=$user_id&addedCount=$added_count" -H 'accept: */*' -d '' &
done

wait