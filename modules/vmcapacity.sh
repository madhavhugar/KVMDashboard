#!/bin/bash

result=$(ssh $1 virsh vol-list --details default | grep $2 | awk ' {print $4 $5 var}')

echo ${result}
