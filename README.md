# ImgurClone

time to complete ~ 10 mins [YouTube video setup tutorial](https://youtu.be/holCaigc20c)

---------

# Requisites 
1. Node 15+
2. TSC
3. Yarn / npm
4. Bash
5. VSC
6. Chrome
7. Chrome Debugging Extension (VSC)
8. Nightly JS Debugging Extension (VSC)

----------

## Get Dev Keys
### [Google Keys](https://console.developers.google.com/apis/credentials)
1. Create OpenId credentials
2. Set Application Type to `Web application`. Name & Authorized JS Origins are not important. 
3. Set callback to `http://localhost:5050/oauth/google/callback`
4. Hit save 

### Put google keys into server
1. `Client ID` is `google key` in `server/fake keys/fake keys.ts`
2. `Client Secret` is `google secret` in `server/fake keys/fake keys.ts`

### [Mongo Uri](https://account.mongodb.com/account/login)
1. Follow DB Setup
2. Connect to Application
3. Copy URI

### Put URI into server
1. `mongooseKey` is the URI
2. Replace the `<username>:<password>@....net/<name>?retry...` angle bracketed parts with their corresponding data,
 `username` and `password` are the credentials for the `db admin` user. Put them in so that the angled brackets are gone :
`Twiggeh:123456@....net/MyDataBaseName?retry...`

### Rename "fake keys" folder to "keys" and "fake keys.ts" file to "keys.ts"

## Installation
1. `git clone https://github.com/Twiggeh/ImgurClone`
2. Open Imgur Clone as project root folder in VSC
3. Run `cd client && yarn install` from project root
4. Run `cd server && yarn install` from project root
5. Run start `TSC Compiler Server` from VSC's debuggin menu. This prevents a nodemon bug.
6. Once it loads up (you will see lots of errors in the terminal) stop the debugging task.
7. Now you can start `start debugging session chrome / firefox` Firefox has no breakpoints setup though.
8. Wait for it to load (again a lot of errors in the watcher / compiler terminals)
9. Run `cd client && yarn run gql:codegen` from project root
10. Wait for previous command to finish and run `cd server && yarn run gql:codegen` from project root
11. Wait for previous command to finish, open up `App.tsx` and edit it to restart `webpacks` compilation.

You should now be able to refresh chrome, have breakpoints throughout the entire application, be able to login and post images to the app. All images are stored under `dist/public/uploads/`
