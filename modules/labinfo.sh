#!/bin/bash

result=$(ssh $1 virsh list --all \
                | /usr/bin/awk 'FNR > 2 && $2 ~ /^./ {print "{" "\"name\"" ":" "\""$2"\"""," "\"status\"" ":" "\""$3"\"" "}" ","}'\
                )

echo "{ \"vmlist\" : [" ${result%?} "]}"

