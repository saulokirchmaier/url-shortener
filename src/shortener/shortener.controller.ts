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
  @ApiOperation({ summary: 'This route works with or without a Bearer token' })
  @ApiBody({
    type: CreateShortenerDto,
    description: 'Json structure for create a shortener URL',
  })
  @UseGuards(AuthGuard)
  @Role({ context: RoleType.NEW_URL })
  @Post()
  create(@Body() createShortenerDto: CreateShortenerDto, @Req() request: any) {
    return this.shortenerService.create(createShortenerDto, request);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Role({ context: RoleType.USER })
  @Get('find')
  find(@Req() request: any) {
    return this.shortenerService.find(request);
  }

  @ApiBody({
    type: UpdateShortenerDto,
    description: 'Json structure for update shortener URL',
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
  @Put(':shorter_url')
  update(
    @Param('shorter_url') shorter_url: string,
    @Body() updateShortenerDto: UpdateShortenerDto,
    @Req() request: any,
  ) {
    return this.shortenerService.update(
      shorter_url,
      updateShortenerDto,
      request,
    );
  }

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
