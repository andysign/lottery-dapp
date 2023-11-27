"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const config_1 = require("@nestjs/config");
const lotteryJson = require("./assets/Lottery.json");
const fs = require("fs");
const TOKEN_NAME = 'LotteryToken';
const TOKEN_SYMBOL = 'LT0';
const BET_PRICE = 1;
const BET_FEE = 0.5;
const TOKEN_RATIO = 1n;
let AppService = class AppService {
    constructor(configService) {
        this.configService = configService;
        this.ctAddr = this.configService.get('TOKEN_ADDRESS', '0x0000000000000000000000000000000000000000');
        this.ctAbi = lotteryJson.abi;
        this.ctBytecode = lotteryJson.bytecode;
        this.prvKey = this.configService.get('PRIVATE_KEY', process.env.PRIVATE_KEY);
        this.provider = new ethers_1.ethers.JsonRpcProvider(this.configService.get('RPC_ENDPOINT_URL', process.env.RPC_ENDPOINT_URL));
        this.wallet = new ethers_1.ethers.Wallet(this.prvKey, this.provider);
    }
    getHello() {
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
        return 0;
    }
    getContractAbi() {
        return this.ctAbi;
    }
    async deployContract(arg) {
        if (Object.keys(arg).length > 0)
            return '0x0';
        const { ctAbi: abi, ctBytecode: bytecode, wallet } = this;
        const ctFactory = new ethers_1.ethers.ContractFactory(abi, bytecode, wallet);
        const name = TOKEN_NAME;
        const symbol = TOKEN_SYMBOL;
        const ratio = TOKEN_RATIO.toString();
        const price = ethers_1.ethers.parseUnits(BET_PRICE.toString(), 18);
        const fee = ethers_1.ethers.parseUnits(BET_FEE.toString(), 18);
        const contract = await ctFactory.deploy(name, symbol, ratio, price, fee);
        await contract.waitForDeployment();
        const newCtAddr = await contract.getAddress();
        this.ctAddr = newCtAddr;
        const strToSave = 'CT_ADDRESS="' + newCtAddr + '"';
        fs.writeFileSync('./.env.deployed-lottery', strToSave);
        return newCtAddr;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppService);
//# sourceMappingURL=app.service.js.map