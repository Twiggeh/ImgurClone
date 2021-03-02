export const processParams = (nodeArgs, defaultCfg) => {
    for (const arg of nodeArgs) {
        const [delimiter, parameter] = arg.split('=');
        console.log(`${delimiter.toUpperCase()}=${parameter}`);
        switch (delimiter) {
            case '-u':
            case '--backendserverurl':
                defaultCfg.backendUrl = parameter;
                break;
            case '-d':
            case '--developmentPort':
                defaultCfg.devPort = parameter;
                break;
            default:
                break;
        }
    }
    return defaultCfg;
};
