import { Injectable } from '@nestjs/common';

import { ethers } from 'ethers';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private provider: ethers.Provider;
  private ctAddr: any;

  constructor(private configService: ConfigService) {
    this.ctAddr = this.configService.get<string>(
      'TOKEN_ADDRESS',
      '0x0000000000000000000000000000000000000000',
    );
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>(
        'RPC_ENDPOINT_URL',
        process.env.RPC_ENDPOINT_URL,
      ),
    );
  }

  getHello(): string {
    return 'Backend App Running OK. Go to .../api/ for more!';
  }

  async getBlockNumber() {
    const { provider } = this;
    const blkNum = await provider.getBlockNumber();
    const lastBlkNum = blkNum | 0;
    return lastBlkNum;
  }

  getContractAddress() {
    const { ctAddr } = this;
    return ctAddr;
  }
}
