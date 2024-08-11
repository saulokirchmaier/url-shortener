import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Rota de criação de novos usuários',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Estrutura JSON para criar um novo usuário',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Rota de login de usuário',
  })
  @ApiBody({
    type: UserLoginDto,
    description: 'Estrutura JSON para logar um usuário',
  })
  @Post('login')
  singIn(@Body() userLoginDto: UserLoginDto) {
    return this.userService.singIn(userLoginDto);
  }

  @ApiOperation({
    summary: 'Rota de edição de um usuário logado',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Estrutura JSON para editar um usuário',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    example: '2',
    description: 'User ID',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: any,
  ) {
    return this.userService.update(+id, updateUserDto, request.user.payload);
  }
}
