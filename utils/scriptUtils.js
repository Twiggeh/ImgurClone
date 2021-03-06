import { spawn } from 'child_process';
import { createInterface } from 'readline';
export const createLock = () => {
    const lock = {};
    lock.p = new Promise((res, rej) => {
        lock.res = res;
        lock.rej = rej;
    });
    return lock;
};
export const useReadLine = (stdin, stdout) => {
    const rl = createInterface({ input: stdin, output: stdout });
    const asyncReadLine = async (question) => {
        const questionLock = createLock();
        rl.question(question, questionLock.res);
        return questionLock.p;
    };
    return asyncReadLine;
};
export const asyncProcess = (command, opts) => {
    const procLock = createLock();
    const subProc = spawn(command, opts);
    const { outputNeedsToEqual, ignoreErrors } = opts;
    if (outputNeedsToEqual) {
        subProc.stdout.on('data', data => {
            const strData = data.toString();
            console.log(strData);
            if (strData.includes(outputNeedsToEqual))
                procLock.res();
        });
    }
    else {
        subProc.on('exit', procLock.res);
        subProc.stdout.on('data', data => console.log(data.toString()));
    }
    subProc.stderr.on('data', (e) => {
        const strErr = e.toString();
        console.error(strErr);
        if (ignoreErrors)
            return;
        const nonErrors = [
            'Debugger attached.\n',
            'Waiting for the debugger to disconnect...\n',
            'DeprecationWarning:',
            'Cloning',
            'warning',
        ];
        for (const nonError of nonErrors) {
            if (strErr.includes(nonError))
                return;
        }
        procLock.rej(strErr);
    });
    return [procLock.p, subProc];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0VXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JpcHRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBVTNDLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxHQUd4QixFQUFFO0lBQ0gsTUFBTSxJQUFJLEdBQW1DLEVBQUUsQ0FBQztJQUNoRCxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFtQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNuRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQXFDLENBQUM7UUFDakQsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFvQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxJQUE2QixDQUFDO0FBQ3RDLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxDQUMxQixLQUVDLEVBQ0QsTUFBeUMsRUFDeEMsRUFBRTtJQUNILE1BQU0sRUFBRSxHQUFHLGVBQWUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFFN0QsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUFFLFFBQWdCLEVBQW1CLEVBQUU7UUFDakUsTUFBTSxZQUFZLEdBQUcsVUFBVSxFQUFrQixDQUFDO1FBQ2xELEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxPQUFPLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxhQUFhLENBQUM7QUFDdEIsQ0FBQyxDQUFDO0FBS0YsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQzNCLE9BQWUsRUFDZixJQUdDLEVBQ0EsRUFBRTtJQUNILE1BQU0sUUFBUSxHQUFHLFVBQVUsRUFBcUIsQ0FBQztJQUNqRCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFbEQsSUFBSSxrQkFBa0IsRUFBRTtRQUN2QixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDaEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckIsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDO2dCQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztLQUNIO1NBQU07UUFDTixPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2hFO0lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUU7UUFDdkMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEIsSUFBSSxZQUFZO1lBQUUsT0FBTztRQUV6QixNQUFNLFNBQVMsR0FBRztZQUNqQixzQkFBc0I7WUFDdEIsNkNBQTZDO1lBQzdDLHFCQUFxQjtZQUNyQixTQUFTO1lBQ1QsU0FBUztTQUNULENBQUM7UUFFRixLQUFLLE1BQU0sUUFBUSxJQUFJLFNBQVMsRUFBRTtZQUNqQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUFFLE9BQU87U0FDdEM7UUFDRCxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFVLENBQUM7QUFDdkMsQ0FBQyxDQUFDIn0=