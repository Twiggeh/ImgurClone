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
            cwd: join(__dirname, 'client'),
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
            cwd: join(__dirname, 'server'),
            shell: true,
        })[0];
    }
    catch (e) {
        console.log('Failed to install client dependencies');
        console.error(e);
    }
    console.log('Starting Imgur Clone Setup ...');
    if (!existsSync(join(__dirname, 'server/keys/keys.ts'))) {
        mkdirSync(join(__dirname, 'server/keys'), { recursive: true });
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
        writeFileSync(join(__dirname, 'server/keys/keys.ts'), keyFileContent);
        console.log('Written key file.');
    }
    console.log('Configuration of Imgur Clone completed');
    console.log('\n================================\n');
    console.log('Generating types for graphql ...');
    console.log('Building the development server ...');
    try {
        await asyncProcess('yarn debug', { shell: true, cwd: join(__dirname, 'server') }, 'Watching for file changes')[0];
        console.log('Server has been built, starting the server.');
    }
    catch (e) {
        console.log("Couldn't build the server ...");
        console.error(e);
    }
    let debugServerProc;
    try {
        const [debugServerLock, _debugServerProc] = asyncProcess(`node ${join(__dirname, 'server/dist/src/app.js')}`, { shell: true, cwd: join(__dirname, 'server') }, 'Dev server is listening on port');
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
            cwd: join(__dirname, 'server'),
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
            cwd: join(__dirname, 'client'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDMUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMxQixPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXBFLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBRXhFLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVqRSxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ1gsSUFBSTtRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUNwRCxNQUFNLFlBQVksQ0FBQyxjQUFjLEVBQUU7WUFDbEMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO1lBQzlCLEtBQUssRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ047SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0lBQ0QsSUFBSTtRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUNwRCxNQUFNLFlBQVksQ0FBQyxjQUFjLEVBQUU7WUFDbEMsR0FBRyxF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