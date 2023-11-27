import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getBlockNumber(): Promise<number>;
    getContractAddress(): {
        result: any;
    };
    deleteContractAddress(): () => number;
    getContractAbi(): {
        result: any;
    };
    mintTokens(body?: {}): Promise<{
        result: string;
    }>;
}
