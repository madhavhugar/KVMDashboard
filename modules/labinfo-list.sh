#!/bin/bash

#Script to fetch concise data for all the VM's from the command `virsh dumpxml <vm-name>` and converting it to JSON format
#Since the command outputs a lot of data, the script just outputs the required data
#Data given out by the script : Name of Virtual Machine, Number of cpucores, Interfaces [domain,bus,slot,function]

#Dependency: It is also dependent on interfaceMapper.sh script that is on each of the labservers

vmList=($(ssh $1 virsh list --all | /usr/bin/awk 'FNR > 2 { print $2 }'))

#echo ${vmList[0]}
finalString=$(printf "{\"vminfo\" : [")
for vmIndex in ${!vmList[*]}
do
	networkDomain=()
	networkBus=()
	networkSlot=()
	networkFunction=()
	cpuPinningvcpu=()
	cpuPinningset=()

	#All the xml data is stored in the variable $temp and accessed using xml parser called xmllint
	temp=$(ssh $1 virsh dumpxml ${vmList[$vmIndex]})
	vmName=$(xmllint --xpath '//domain/name/text()' - <<< "$temp" 2>/dev/null)
	networkDomain+=($(xmllint --xpath '//domain/devices/hostdev/source/address/@domain' - <<< "$temp" 2>/dev/null))
	networkBus+=($(xmllint --xpath '//domain/devices/hostdev/source/address/@bus' - <<< "$temp" 2>/dev/null))
	networkSlot+=($(xmllint --xpath '//domain/devices/hostdev/source/address/@slot' - <<< "$temp" 2>/dev/null))
	networkFunction+=($(xmllint --xpath '//domain/devices/hostdev/source/address/@function' - <<< "$temp" 2>/dev/null))
	cpuCores=$(xmllint --xpath '//domain/vcpu/text()' - <<< "$temp" 2>/dev/null)
	cpuPinningvcpu+=($(xmllint --xpath '//domain/cputune/vcpupin/@vcpu' - <<< "$temp" 2>/dev/null))
	cpuPinningset+=($(xmllint --xpath '//domain/cputune/vcpupin/@cpuset' - <<< "$temp" 2>/dev/null))
	if [ $vmIndex != 0 ]
	then
		finalString+=$(printf ", ")
	fi
	finalString+=$(printf " {\"name\": \"$vmName\", ")
	finalString+=$(printf "\"cpucores\" : \"$cpuCores\", ")
	finalString+=$(printf "\"cpuvcpu\" : [ ")
	for index in ${!cpuPinningset[*]}
	do
		if [ $index != 0 ]
		then
			finalString+=$(printf ", ")
		fi
		vcpuPinning=$(echo "${cpuPinningvcpu[$index]}" | grep -oP '(?<=vcpu=\")\w+(?=\")')
		cpusetPinning=$(echo "${cpuPinningset[$index]}" | grep -oP '(?<=cpuset=\").*(?=\")')

		finalString+=$(printf "{ \"vcpu\" : \"$vcpuPinning\", \"cpuset\" : \"$cpusetPinning\"}")
	done
	finalString+=$(printf "], ")
	finalString+=$(printf "\"interfaces\" : [ ")
	for index in ${!networkDomain[*]}
	do
		if [ $index != 0 ]
		then
			finalString+=$(printf ", ")
		fi
		domainVal=$(echo "${networkDomain[$index]}" | grep -oP '(?<=domain=\"0x)\w+(?=\")')
		busVal=$(echo "${networkBus[$index]}" | grep -oP '(?<=bus=\"0x)\w+(?=\")')
		slotVal=$(echo "${networkSlot[$index]}" | grep -oP '(?<=slot=\"0x)\w+(?=\")')
		functionVal=$(echo "${networkFunction[$index]}" | grep -oP '(?<=function=\"0x)\w+(?=\")')
		interfaceName=$(ssh $1 /home/dspadmin/interfaceMapper.sh "$domainVal:$busVal:$slotVal.$functionVal")
		if [ -z "$interfaceName" ]
		then
			interfaceName="NA"
		fi
		finalString+=$(printf "{ \"domain\" : \"$domainVal\", \"bus\" : \"$busVal\", ")
		finalString+=$(printf "\"slot\" : \"$slotVal\", \"function\" : \"$functionVal\", \"name\" : \"$interfaceName\"}")
	done
	finalString+=$(printf "] }")

done

finalString+=$(printf "] }")
sleep 5
echo $finalString
