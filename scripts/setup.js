import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { URL } from 'url';
import { asyncProcess, useReadLine } from '../utils/scriptUtils.js';
const __dirname = decodeURI(dirname(new URL(import.meta.url).pathname));
const asyncReadLine = useReadLine(process.stdin, process.stdout);
(async () => {
    try {
        console.log('Installing imgur client dependencies');
        await asyncProcess('yarn install', {
            cwd: join(__dirname, '../client'),
            shell: true,
        })[0];
    }
    catch (e) {
        console.log('Failed to install client dependencies');
        console.error(e);
    }
    try {
        console.log('installing imgur server dependencies');
        await asyncProcess('yarn install', {
            cwd: join(__dirname, '../server'),
            shell: true,
        })[0];
    }
    catch (e) {
        console.log('Failed to install client dependencies');
        console.error(e);
    }
    console.log('Starting Imgur Clone Setup ...');
    if (!existsSync(join(__dirname, '../server/keys/keys.ts'))) {
        mkdirSync(join(__dirname, '../server/keys'), { recursive: true });
        const variables = {
            mongooseKey: '',
            googleSecret: '',
            googleKey: '',
            sessionSecret: '',
        };
        try {
            console.log('You can create a free Account here : (https://account.mongodb.com/account/login)');
            variables.mongooseKey = await asyncReadLine('Please provide the connection URI for the Imgur Clone MongoDB database (mongodb+srv://<Username>:<Password>@...) :');
            console.clear();
        }
        catch (e) {
            console.log('Failed to read mongooseKey');
            console.error(e);
        }
        try {
            console.log('You can create an Google Application here : (https://console.developers.google.com/apis/credentials)');
            variables.googleSecret = await asyncReadLine('Please provide the Google Secret for Imgur Clone :');
            variables.googleKey = await asyncReadLine('Please provide the Google Key for Imgur Clone :');
            console.clear();
        }
        catch (e) {
            console.log('Failed to read googleSecret or googleKey');
            console.error(e);
        }
        try {
            console.log('You can create a random key on this website, set the length to ~80 : (https://passwordsgenerator.net/)');
            variables.sessionSecret = await asyncReadLine('Please Provide a key to encrypt the Imgur Clone Sessions with (any random string) :');
            console.clear();
        }
        catch (e) {
            console.log('Failed to read sessionSecret');
            console.error(e);
        }
        console.log('Writing keys ...');
        const keyFileContent = `export const mongooseKey = '${variables.mongooseKey}'

export const googleSecret = '${variables.googleSecret}';
export const googleKey = '${variables.googleKey}';

export const sessionSecret = '${variables.sessionSecret}';`;
        writeFileSync(join(__dirname, '../server/keys/keys.ts'), keyFileContent);
        console.log('Written key file.');
    }
    console.log('Configuration of Imgur Clone completed');
    console.log('\n================================\n');
    console.log('Generating types for graphql ...');
    console.log('Building the development server ...');
    try {
        await asyncProcess('yarn debug', {
            shell: true,
            cwd: join(__dirname, '../server'),
            outputNeedsToEqual: 'Watching for file changes',
        })[0];
        console.log('Server has been built, starting the server.');
    }
    catch (e) {
        console.log("Couldn't build the server ...");
        console.error(e);
    }
    let debugServerProc;
    try {
        const [debugServerLock, _debugServerProc] = asyncProcess(`node ${join(__dirname, '../server/dist/src/app.js')}`, {
            shell: true,
            cwd: join(__dirname, '../server'),
            outputNeedsToEqual: 'Dev server is listening on port',
        });
        debugServerProc = _debugServerProc;
        await debugServerLock;
        console.log('Server has started successfully, generating the gql types now.');
    }
    catch (e) {
        console.log("Couldn't start the server");
        console.error(e);
    }
    try {
        await asyncProcess('yarn gql:codegen', {
            shell: true,
            cwd: join(__dirname, '../server'),
        })[0];
        console.log('GQL Types for the server have been generated.');
    }
    catch (e) {
        console.log("Couldn't generate servers' gql types");
        console.error(e);
    }
    try {
        await asyncProcess('yarn gql:codegen', {
            shell: true,
            cwd: join(__dirname, '../client'),
        })[0];
        console.log('GQL Types for the client have been generated.');
    }
    catch (e) {
        console.log("Couldn't generate servers' gql types");
        console.error(e);
    }
    console.log('Attempting to close the server now since all types have been built ...');
    debugServerProc && debugServerProc.kill();
    console.log('Setup completed');
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDMUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMxQixPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXBFLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBRXhFLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVqRSxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ1gsSUFBSTtRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUNwRCxNQUFNLFlBQVksQ0FBQyxjQUFjLEVBQUU7WUFDbEMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDO1lBQ2pDLEtBQUssRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ047SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0lBQ0QsSUFBSTtRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUNwRCxNQUFNLFlBQVksQ0FBQyxjQUFjLEVBQUU7WUFDbEMsR0FBRyxF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