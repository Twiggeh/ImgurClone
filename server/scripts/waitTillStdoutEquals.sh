#!/usr/bin/bash
echo "executing..."

for i in "$@"; do
  case $i in
  -c=* | --command=*)
    cmd="${i#*=}"
    shift
    ;;
  esac
done

DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi
. "$DIR/$cmd" >./__out

testsran="waited one second"
condition=true
outPutChild1=""

while $condition; do
  outPutChild=$(cat ./__out | grep "$testsran")

  # Implement a command array, that has condition strings ["./tests.sh", "waited one second"]
  echo "outputchild1 is '$outPutChild'"
  if [ "$outPutChild" = "$testsran" ]; then
    echo "output was correct"
    condition=false
  else
    echo "While loop will sleep"
    sleep 2
  fi
done

echo "While loop ended and test is done"
