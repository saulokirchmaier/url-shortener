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
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for create a new user',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for login a user',
  })
  @Post('login')
  singIn(@Body() userLoginDto: UserLoginDto) {
    return this.userService.singIn(userLoginDto);
  }

  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for update a existing user',
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
