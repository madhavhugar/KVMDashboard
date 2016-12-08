#!/bin/bash

result=$(ssh $1 virsh dumpxml $2)

echo ${result}

