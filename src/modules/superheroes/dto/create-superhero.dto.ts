import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateSuperheroDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  superpower: string;

  @IsInt()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  humilityScore: number;
}
