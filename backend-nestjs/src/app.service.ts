import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Backend App Running OK. Go to .../api/ for more!';
  }
}
