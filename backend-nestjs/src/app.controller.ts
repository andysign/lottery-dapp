import { Body, Controller, Delete, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/block-number')
  async getBlockNumber(): Promise<number> {
    return await this.appService.getBlockNumber();
  }

  @Get('/contract-lottery-address')
  getContractAddress() {
    return { result: this.appService.getContractAddress() };
  }

  @Delete('/reset-saved-lottery-address')
  @HttpCode(204)
  deleteContractAddress() {
    return this.appService.deleteContractAddress;
  }

  @Get('/contract-lottery-abi')
  getContractAbi() {
    return { result: this.appService.getContractAbi() };
  }

  @Post('/deploy-lottery')
  async mintTokens(@Body() body = {}) {
    return { result: await this.appService.deployContract(body) };
  }
}
