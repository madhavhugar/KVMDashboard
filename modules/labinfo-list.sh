#!/bin/bash

#Script to fetch concise data for all the VM's from the command `virsh dumpxml <vm-name>` and converting it to JSON format
#Since the command outputs a lot of data, the script just outputs the required data
#Data given out by the script : Name of Virtual Machine, Number of cpucores, Interfaces [domain,bus,slot,function]

vmList=($(ssh $1 virsh list --all | /usr/bin/awk 'FNR > 2 { print $2 }'))

#echo ${vmList[0]}
#echo "{ \"vmlist\" : [" ${result%?} "]}"

printf "{\"vminfo\" : ["
for vmIndex in ${!vmList[*]}
do
	networkDomain=()
	networkBus=()
	networkSlot=()
	networkFunction=()

	temp=$(ssh $1 virsh dumpxml ${vmList[$vmIndex]})
	vmName=$(xmllint --xpath '//domain/name/text()' - <<< "$temp" 2>/dev/null)
	networkDomain+=($(xmllint --xpath '//domain/devices/hostdev/source/address/@domain' - <<< "$temp" 2>/dev/null))
	networkBus+=($(xmllint --xpath '//domain/devices/hostdev/source/address/@bus' - <<< "$temp" 2>/dev/null))
	networkSlot+=($(xmllint --xpath '//domain/devices/hostdev/source/address/@slot' - <<< "$temp" 2>/dev/null))
	networkFunction+=($(xmllint --xpath '//domain/devices/hostdev/source/address/@function' - <<< "$temp" 2>/dev/null))
	cpuCores=$(xmllint --xpath '//domain/vcpu/text()' - <<< "$temp" 2>/dev/null)
	if [ $vmIndex != 0 ]
	then
		printf ", "
	fi
	printf " {\"name\": \"$vmName\", "
	printf "\"cpucores\" : \"$cpuCores\", "
	printf "\"interfaces\" : [ "
	for index in ${!networkDomain[*]}
	do
		if [ $index != 0 ]
		then
			printf ", "
		fi
		domainVal=$(echo "${networkDomain[$index]}" | grep -oP '(?<=domain=\")\w+(?=\")')
		busVal=$(echo "${networkBus[$index]}" | grep -oP '(?<=bus=\")\w+(?=\")')
		slotVal=$(echo "${networkSlot[$index]}" | grep -oP '(?<=slot=\")\w+(?=\")')
		functionVal=$(echo "${networkFunction[$index]}" | grep -oP '(?<=function=\")\w+(?=\")')
		printf "{ \"domain\" : \"$domainVal\", \"bus\" : \"$busVal\", "
		printf "\"slot\" : \"$slotVal\", \"function\" : \"$functionVal\"}"
	done
	printf "] }"

done
	printf "] }"
