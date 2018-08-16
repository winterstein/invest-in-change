#!/bin/bash

GIT_SHORTHAND_IIC='git --git-dir=/home/winterwell/invest-in-change/.git/ --work-tree=/home/winterwell/invest-in-change'
GIT_SHORTHAND_J='git --git-dir=/home/winterwell/jerbil/.git/ --work-tree=/home/winterwell/jerbil'

## Get website changes from github (if run on 'robinson')
if [[ $(printf $HOSTNAME) = 'robinson' ]]; then
	printf "\nGetting Invest-in-Change changes from Github ...\n"
	$GIT_SHORTHAND_IIC gc --prune=now
	$GIT_SHORTHAND_IIC pull origin master
	$GIT_SHORTHAND_IIC reset --hard FETCH_HEAD
fi

## Get Jerbil updates from github (if run on 'robinson')
if [[ $(printf $HOSTNAME) = 'robinson' ]]; then
	printf "\nGetting the latest version of Jerbil from Github ...\n"
	$GIT_SHORTHAND_J gc --prune=now
	$GIT_SHORTHAND_J pull origin master
	$GIT_SHORTHAND_J reset --hard FETCH_HEAD
fi
#/usr/lib/jvm/java-8-openjdk-amd64/jre/bin/
# paths as for robinson server
printf "\nRendering website ...\n"
java -jar ~/jerbil/jerbil-all.jar ~/invest-in-change
