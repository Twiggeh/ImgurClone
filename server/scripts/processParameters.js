export const processParams = (nodeArgs, defaultCfg) => {
    for (const arg in nodeArgs) {
        const [delimiter, parameter] = arg.split('=');
        console.log(`${delimiter.toUpperCase()}=${parameter}`);
        switch (delimiter) {
            case '-d':
            case '--domain':
                defaultCfg.domain = parameter;
                break;
            case '-s':
            case '--subdomain':
                defaultCfg.subDomain = parameter;
                break;
            case '-sp':
            case '--secureport':
                defaultCfg.securePort = parameter;
                break;
            case '-dp':
            case '--developmentport':
                defaultCfg.devPort = parameter;
                break;
            case '-ip':
            case '--insecureport':
                defaultCfg.insecurePort = parameter;
                break;
            case '-bp':
            case '--backendprotocol':
                if (parameter != 'http' && parameter != 'https') {
                    console.log(`${parameter} has to be either http or https`);
                    process.exit(1);
                }
                defaultCfg.backendProtocol = parameter;
                break;
            default:
                break;
        }
    }
    return defaultCfg;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc1BhcmFtZXRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9jZXNzUGFyYW1ldGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsQ0FDNUIsUUFBZ0MsRUFDaEMsVUFBYSxFQUNaLEVBQUU7SUFDSCxLQUFLLE1BQU0sR0FBRyxJQUFJLFFBQVEsRUFBRTtRQUMzQixNQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRXZELFFBQVEsU0FBUyxFQUFFO1lBQ2xCLEtBQUssSUFBSSxDQUFDO1lBQ1YsS0FBSyxVQUFVO2dCQUNkLFVBQVUsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUM5QixNQUFNO1lBQ1AsS0FBSyxJQUFJLENBQUM7WUFDVixLQUFLLGFBQWE7Z0JBQ2pCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1AsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLGNBQWM7Z0JBQ2xCLFVBQVUsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO2dCQUNsQyxNQUFNO1lBQ1AsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLG1CQUFtQjtnQkFDdkIsVUFBVSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Z0JBQy9CLE1BQU07WUFDUCxLQUFLLEtBQUssQ0FBQztZQUNYLEtBQUssZ0JBQWdCO2dCQUNwQixVQUFVLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztnQkFDcEMsTUFBTTtZQUNQLEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxtQkFBbUI7Z0JBQ3ZCLElBQUksU0FBUyxJQUFJLE1BQU0sSUFBSSxTQUFTLElBQUksT0FBTyxFQUFFO29CQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxpQ0FBaUMsQ0FBQyxDQUFDO29CQUMzRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNoQjtnQkFDRCxVQUFVLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDdkMsTUFBTTtZQUNQO2dCQUNDLE1BQU07U0FDUDtLQUNEO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDbkIsQ0FBQyxDQUFDIn0=