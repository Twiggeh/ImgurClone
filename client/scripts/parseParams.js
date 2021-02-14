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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VQYXJhbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZVBhcmFtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsQ0FDNUIsUUFBZ0MsRUFDaEMsVUFBYSxFQUNaLEVBQUU7SUFDSCxLQUFLLE1BQU0sR0FBRyxJQUFJLFFBQVEsRUFBRTtRQUMzQixNQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELFFBQVEsU0FBUyxFQUFFO1lBQ2xCLEtBQUssSUFBSSxDQUFDO1lBQ1YsS0FBSyxvQkFBb0I7Z0JBQ3hCLFVBQVUsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO2dCQUNsQyxNQUFNO1lBQ1AsS0FBSyxJQUFJLENBQUM7WUFDVixLQUFLLG1CQUFtQjtnQkFDdkIsVUFBVSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Z0JBQy9CLE1BQU07WUFDUDtnQkFDQyxNQUFNO1NBQ1A7S0FDRDtJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ25CLENBQUMsQ0FBQyJ9