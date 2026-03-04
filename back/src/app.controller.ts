import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('saludo')
  getSaludo() {
    return { mensaje: 'Hola desde NestJS 🚀' };
  }
}
