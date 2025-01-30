import { SuperheroesService } from './superheroes.service';
import { Helper } from '../../shared/utils';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

jest.mock('../../shared/utils/helper', () => ({
  Helper: {
    generateUUID: jest.fn(),
  },
}));

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(() => {
    service = new SuperheroesService();
  });

  describe('create', () => {
    it('should create a new superhero and add it to the list', () => {
      const createSuperheroDto: CreateSuperheroDto = {
        name: 'Superman',
        superpower: 'Flight',
        humilityScore: 10,
      };

      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      (Helper.generateUUID as jest.Mock).mockReturnValue(uuid);

      const result = service.create(createSuperheroDto);

      expect(result).toEqual({
        id: uuid,
        name: 'Superman',
        superpower: 'Flight',
        humilityScore: 10,
      });
      expect(service['superheroes']).toContainEqual(result);
    });

    it('should call Helper.generateUUID', () => {
      const createSuperheroDto: CreateSuperheroDto = {
        name: 'Batman',
        superpower: 'Martial Arts',
        humilityScore: 8,
      };

      service.create(createSuperheroDto);

      expect(Helper.generateUUID).toHaveBeenCalled();
    });

    describe('findAll', () => {
      it('should return an empty array if there are no superheroes', () => {
        const result = service.findAll();
        expect(result).toEqual([]);
      });

      it('should return all superheroes sorted by humilityScore in descending order', () => {
        const superheroes = [
          { id: '1', name: 'Hero1', superpower: 'Power1', humilityScore: 5 },
          { id: '2', name: 'Hero2', superpower: 'Power2', humilityScore: 10 },
          { id: '3', name: 'Hero3', superpower: 'Power3', humilityScore: 7 },
        ];

        service['superheroes'] = superheroes;

        const result = service.findAll();
        expect(result).toEqual([
          { id: '2', name: 'Hero2', superpower: 'Power2', humilityScore: 10 },
          { id: '3', name: 'Hero3', superpower: 'Power3', humilityScore: 7 },
          { id: '1', name: 'Hero1', superpower: 'Power1', humilityScore: 5 },
        ]);
      });
    });
  });
});
