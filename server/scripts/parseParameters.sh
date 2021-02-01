#!/usr/bin/bash
declare -A arguments=(
  ["DOMAIN"]="localhost"
  ["DOMAINEXTENSION"]=""
  ["SUBDOMAIN"]=""
  ["SECUREPORT"]="5000"
  ["INSECUREPORT"]="5000"
  ["DEVELOPMENTPORT"]="5000"
  ["BACKENDPROTOCOL"]="http"
)

echo "$@"

for i in "$@"; do
  case $i in
  -d=* | --domain=*)
    arguments["DOMAIN"]="${i#*=}"
    shift
    ;;
  -de=* | --domainextension=*)
    arguments["DOMAINEXTENSION"]="${i#*=}"
    shift
    ;;
  -s=* | --subdomain=*)
    arguments["SUBDOMAIN"]="${i#*=}"
    shift
    ;;
  -sp=* | --secureport=*)
    arguments["SECUREPORT"]="${i#*=}"
    shift
    ;;
  -dp=* | --developmentport=*)
    arguments["DEVELOPMENTPORT"]="${i#*=}"
    shift
    ;;
  -ip=* | --insecureport=*)
    arguments["INSECUREPORT"]="${i#*=}"
    shift
    ;;
  -bp=* | --backendprotocol=*)
    if [ "${i#*=}" != "http" && "${i#*=}" != "https" ]; then
      echo "${i#*=} has to be either http or https"
      exit 1
    fi
    arguments["BACKENDPROTOCOL"]="${i#*=}"
    shift
    ;;
  *)
    shift
    ;;
  esac
done

echo "DOMAIN = ${arguments[DOMAIN]}"
echo "DOMAINEXTENSION = ${arguments[DOMAINEXTENSION]}"
echo "SUBDOMAIN = ${arguments[SUBDOMAIN]}"
echo "SECUREPORT = ${arguments[SECUREPORT]}"
echo "DEVELOPMENTPORT = ${arguments[DEVELOPMENTPORT]}"
echo "INSECUREPORT = ${arguments[INSECUREPORT]}"
echo "BACKENDPROTOCOL = ${arguments[INSECUREPORT]}"
