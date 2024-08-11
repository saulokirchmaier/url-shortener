import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Rota de busca de url encurtadas',
  })
  @ApiParam({
    name: 'token',
    description: 'Retorna o link original, ao buscar pelo link encurtado',
    type: 'string',
    example: 'Se48&g',
  })
  @Get(':token')
  findOne(@Param('token') token: string) {
    return this.appService.findOne(token);
  }
}
