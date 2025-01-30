import { BadRequestException, Injectable } from '@nestjs/common';
import { Superhero } from './entities/superhero.entity';
import { Helper } from '../../shared/utils';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Injectable()
export class SuperheroesService {
  private superheroes: Superhero[] = [];

  /**
   * Creates a new superhero and adds it to the list of superheroes.
   *
   * @param {CreateSuperheroDto} createSuperheroDto - The data transfer object containing the details of the superhero to be created.
   * @returns {Superhero} The newly created superhero.
   */
  create(createSuperheroDto: CreateSuperheroDto): Superhero {
    const newHero = new Superhero(
      Helper.generateUUID(),
      createSuperheroDto.name,
      createSuperheroDto.superpower,
      createSuperheroDto.humilityScore,
    );

    this.superheroes.push(newHero);
    return newHero;
  }

  findAll(): Superhero[] {
    return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  }
}
