!/bin/bash

result=$(ssh dsplab01 virsh dumpxml dsp-vm-student-tadasa \
                | /usr/bin/awk -F: '{print "\""$1"\": \""$2"\"," }      '\
                )

echo "{" ${result%?} "}"

