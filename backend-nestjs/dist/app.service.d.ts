import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private configService;
    private provider;
    constructor(configService: ConfigService);
    getHello(): string;
    getBlockNumber(): Promise<number>;
}
