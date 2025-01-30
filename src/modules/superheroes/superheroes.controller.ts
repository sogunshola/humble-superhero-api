import { Body, Controller, Get, Post } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { resolveResponse } from '../../shared/resolvers';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  create(@Body() createSuperheroDto: CreateSuperheroDto) {
    return resolveResponse(
      this.superheroesService.create(createSuperheroDto),
      'Superhero created successfully',
    );
  }

  @Get()
  findAll() {
    return resolveResponse(
      this.superheroesService.findAll(),
      'Superheroes retrieved successfully',
    );
  }
}
