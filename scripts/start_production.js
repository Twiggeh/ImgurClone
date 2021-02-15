import { dirname, join } from 'path';
import { URL } from 'url';
import { asyncProcess } from '../utils/scriptUtils.js';
const __dirname = decodeURI(dirname(new URL(import.meta.url).pathname));
(async () => {
    const buildsBuffer = [];
    console.log('Building the production server and client');
    const [serverBuildLock, serverBuildProc] = asyncProcess('node build.js', {
        cwd: join(__dirname, 'server/scripts'),
        shell: true,
    });
    const [clientBuildLock, clientBuildProc] = asyncProcess('node build.js', {
        cwd: join(__dirname, 'client/scripts'),
        shell: true,
    });
    buildsBuffer.push(serverBuildLock, clientBuildLock);
    const results = await Promise.allSettled(buildsBuffer);
    serverBuildProc.kill();
    clientBuildProc.kill();
    results.forEach((build, i) => {
        if (build.status === 'fulfilled') {
            console.log(`Build ${i} succeeded ...`);
            return;
        }
        console.log(`Build ${i} failed ...`);
    });
    console.log('Starting the server ...');
    asyncProcess('node app', { cwd: join(__dirname, 'server/dist/src/app'), shell: true });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnRfcHJvZHVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0YXJ0X3Byb2R1Y3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMxQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFFeEUsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNYLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUV4QixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7SUFFekQsTUFBTSxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsR0FBRyxZQUFZLENBQUMsZUFBZSxFQUFFO1FBQ3hFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDO1FBQ3RDLEtBQUssRUFBRSxJQUFJO0tBQ1gsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsR0FBRyxZQUFZLENBQUMsZUFBZSxFQUFFO1FBQ3hFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDO1FBQ3RDLEtBQUssRUFBRSxJQUFJO0tBQ1gsQ0FBQyxDQUFDO0lBRUgsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFFcEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRXZELGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssV0FBVyxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDeEMsT0FBTztTQUNQO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFFdkMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLHFCQUFxQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDeEYsQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9