import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private configService;
    private ctAddr;
    private ctAbi;
    private ctBytecode;
    private prvKey;
    private provider;
    private wallet;
    constructor(configService: ConfigService);
    getHello(): string;
    getBlockNumber(): Promise<number>;
    getContractAddress(): any;
    deleteContractAddress(): number;
    getContractAbi(): any;
    deployContract(arg: any): Promise<string>;
}
