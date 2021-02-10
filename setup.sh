# Get current directory
DIR=$(pwd -P)

# Install Client dependencies
echo "installing imgur client dependencies"
cd "$DIR/client"
yarn install

echo "installing imgur Imgur Clone dependencies"
cd "$DIR/server"
yarn install

# Creating User required files
echo "setting up Imgur Clone server"
if [[ ! -f "$DIR/server/keys/keys.ts" ]]; then
  # Create the key directory
  mkdir -p "$DIR/server/keys"
  touch "$DIR/server/keys/keys.ts"

  # Read User Input
  echo "You can create a free Account here : (https://account.mongodb.com/account/login)"
  read -p "Please provide the connection URI for the Imgur Clone MongoDB database (mongodb+srv://<Username>:<Password>@...) :" mongooseKey
  clear

  echo "You can create an Google Application here : (https://console.developers.google.com/apis/credentials)"
  read -p "Please provide the Google Secret for Imgur Clone :" googleSecret
  read -p "Please provide the Google Key for Imgur Clone :" googleKey
  clear

  echo "You can create a random key on this website, set the length to ~80 : (https://passwordsgenerator.net/)"
  read -p "Please Provide a key to encrypt the Imgur Clone Sessions with (any random string) :" sessionSecret
  clear

  echo "Writing keys ..."

  echo "export const mongooseKey = '$mongooseKey';

export const googleSecret = '$googleSecret';
export const googleKey = '$googleKey';

export const sessionSecret = '$sessionSecret';" >./keys/keys.ts

  echo "Written key file."
fi

echo "Configuration of Imgur Clone completed"

echo "================================"

echo "Generating types for graphql ..."

cd ./server
yarn debug

# Start the server in development mode
