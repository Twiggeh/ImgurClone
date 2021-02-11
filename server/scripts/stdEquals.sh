#!/usr/bin/bash

# Get passed params
for i in "$@"; do
  case $i in
  -c=* | --command=*)
    cmd="${i#*=}"
    shift
    ;;
  -s=* | --searchFor=*)
    searchFor="${i#*=}"
    shift
    ;;
  esac
done

# Guard against bad params
if [ -z "$searchFor" ]; then
  echo "Search String is not defined, use -s=\"value\" to define a value"
  parameterError=true
fi
if [ -z "$cmd" ]; then
  echo "Command to be executed is not defined, use -c=\"value\" to define a command"
  parameterError=true
fi
if $parameterError; then
  exit 1
fi

echo "Command to be executed is $cmd"
echo "String to be searched is $searchFor"

echo "executing..."
DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi
. "$DIR/$cmd" >"./__out__$cmd"

while true; do
  outPutChild=$(cat ./__out | grep "$searchFor")

  # Implement a command array, that has condition strings ["./tests.sh", "waited one second"]
  echo "outputchild1 is '$outPutChild'"
  if [ "$outPutChild" = "$searchFor" ]; then
    echo "Child process succeeded"
    break
  else
    echo "Waiting for child process ..."
    sleep 2
  fi
done
