import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { Role } from 'src/auth/guards/role.decorator';
import { RoleType } from 'src/utils/role.enum';
import { UpdateShortenerDto } from './dto/update-shortener.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('shortener')
@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Rota para criar novos links encurtados. Funciona com ou sem um Bearer Token de acesso',
  })
  @ApiBody({
    type: CreateShortenerDto,
    description: 'Estrutura JSON para criar um novo link encurtado',
  })
  @UseGuards(AuthGuard)
  @Role({ context: RoleType.NEW_URL })
  @Post()
  create(@Body() createShortenerDto: CreateShortenerDto, @Req() request: any) {
    return this.shortenerService.create(createShortenerDto, request);
  }

  @ApiOperation({
    summary: 'Rota para encontrar os links encurtados de um usuário logado',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Role({ context: RoleType.USER })
  @Get('find')
  find(@Req() request: any) {
    return this.shortenerService.find(request);
  }

  @ApiOperation({
    summary:
      'Rota para editar um link encurtado de um usuário logado, podendo passar uma nova url',
  })
  @ApiBody({
    type: UpdateShortenerDto,
    description: 'Estrutura JSON para editar um novo link encurtado',
  })
  @ApiParam({
    name: 'token',
    type: 'string',
    example: 'Se48&g',
    description: 'Token de um link encurtado',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Role({ context: RoleType.USER })
  @Put(':token')
  update(
    @Param('token') token: string,
    @Body() updateShortenerDto: UpdateShortenerDto,
    @Req() request: any,
  ) {
    return this.shortenerService.update(token, updateShortenerDto, request);
  }

  @ApiOperation({
    summary: 'Rota para deletar um link encurtado de um usuário logado',
  })
  @ApiParam({
    name: 'shorter_url',
    type: 'string',
    example: 'Se48&g',
    description: 'Shortened Token',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Role({ context: RoleType.USER })
  @Delete(':shorter_url')
  delete(@Param('shorter_url') shorter_url: string, @Req() request: any) {
    return this.shortenerService.delete(shorter_url, request);
  }
}
