import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { URL } from 'url';
import { asyncProcess } from '../../utils/scriptUtils.js';
import { processParams } from './parseParams.js';
const __dirname = decodeURI(dirname(new URL(import.meta.url).pathname));
const defaultDebugCfg = {
    backendUrl: 'http://localhost:5050',
};
const { backendUrl } = processParams(process.argv, defaultDebugCfg);
let envFileContent = '';
const addEnvContent = (newContent) => void (envFileContent += newContent + '\n');
addEnvContent('NODE_ENV=production');
addEnvContent(`BACKEND_URL="${backendUrl}"`);
writeFileSync(join(__dirname, '../.env'), envFileContent);
(async () => {
    console.log('Compiling the server ...');
    await asyncProcess('webpack --config ./config/webpack.prod.js --mode production', {
        shell: true,
        cwd: join(__dirname, '..'),
    })[0];
    console.log('Server has been compiled.');
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDMUIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUV4RSxNQUFNLGVBQWUsR0FBRztJQUN2QixVQUFVLEVBQUUsdUJBQXVCO0NBQ25DLENBQUM7QUFFRixNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFcEUsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sYUFBYSxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFHekYsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFHckMsYUFBYSxDQUFDLGdCQUFnQixVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBRzdDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBRTFELENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDeEMsTUFBTSxZQUFZLENBQUMsNkRBQTZELEVBQUU7UUFDakYsS0FBSyxFQUFFLElBQUk7UUFDWCxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7S0FDMUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQyxFQUFFLENBQUMifQ==