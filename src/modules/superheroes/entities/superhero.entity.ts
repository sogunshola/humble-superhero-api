export class Superhero {
  id: string;
  name: string;
  superpower: string;
  humilityScore: number;

  constructor(
    id: string,
    name: string,
    superpower: string,
    humilityScore: number,
  ) {
    this.id = id;
    this.name = name;
    this.superpower = superpower;
    this.humilityScore = humilityScore;
  }
}
