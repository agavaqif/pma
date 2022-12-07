import { Controller, Get, Post, Body } from '@nestjs/common';
import { GreetingService } from './greeting.service';
import { CreateGreetingDto } from './dto/create-greeting.dto';

@Controller('greeting')
export class GreetingController {
  constructor(private readonly greetingService: GreetingService) {}

  @Post()
  create(@Body() createGreetingDto: CreateGreetingDto) {
    return this.greetingService.create(createGreetingDto);
  }

  @Get()
  findAll() {
    return this.greetingService.findAll();
  }
}
