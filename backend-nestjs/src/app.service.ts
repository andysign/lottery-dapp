import { Injectable } from '@nestjs/common'; // BadRequestException

import { ethers } from 'ethers';

import { ConfigService } from '@nestjs/config';

import * as lotteryJson from './assets/Lottery.json';

import * as fs from 'fs';

const TOKEN_NAME = 'LotteryToken';
const TOKEN_SYMBOL = 'LT0';
const BET_PRICE = 1;
const BET_FEE = 0.5;
const TOKEN_RATIO = 1n;

@Injectable()
export class AppService {
  private ctAddr: any;
  private ctAbi: any;
  private ctBytecode: any;
  private prvKey: any;

  private provider: ethers.Provider;
  private wallet: ethers.Wallet;

  constructor(private configService: ConfigService) {
    this.ctAddr = this.configService.get<string>(
      'TOKEN_ADDRESS',
      '0x0000000000000000000000000000000000000000',
    );
    this.ctAbi = lotteryJson.abi;
    this.ctBytecode = lotteryJson.bytecode;
    this.prvKey = this.configService.get<string>(
      'PRIVATE_KEY',
      process.env.PRIVATE_KEY,
    );

    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>(
        'RPC_ENDPOINT_URL',
        process.env.RPC_ENDPOINT_URL,
      ),
    );
    this.wallet = new ethers.Wallet(this.prvKey, this.provider);
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

  deleteContractAddress() {
    const addrZero = '0x0000000000000000000000000000000000000000';
    const strToSave = 'CT_ADDRESS="' + addrZero + '"';
    fs.writeFileSync('./.env.deployed-lottery', strToSave);
    this.ctAddr = addrZero;
    return 0;
  }

  getContractAbi() {
    return this.ctAbi;
  }

  async deployContract(arg: any) {
    // arg: { [key: string]: never }
    // if (Object.keys(arg).length > 0) throw new BadRequestException(-1);
    if (Object.keys(arg).length > 0) return '0x0';
    const { ctAbi: abi, ctBytecode: bytecode, wallet } = this;
    const ctFactory = new ethers.ContractFactory(abi, bytecode, wallet);
    const name = TOKEN_NAME;
    const symbol = TOKEN_SYMBOL;
    const ratio = TOKEN_RATIO.toString();
    const price = ethers.parseUnits(BET_PRICE.toString(), 18);
    const fee = ethers.parseUnits(BET_FEE.toString(), 18);
    const contract = await ctFactory.deploy(name, symbol, ratio, price, fee);
    await contract.waitForDeployment();
    const newCtAddr = await contract.getAddress();
    this.ctAddr = newCtAddr;
    const strToSave = 'CT_ADDRESS="' + newCtAddr + '"';
    fs.writeFileSync('./.env.deployed-lottery', strToSave);
    return newCtAddr;
  }
}
