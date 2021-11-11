import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an Array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  const testMovie = {
    title: 'Test Movie',
    genres: ['test'],
    year: 2000,
  };

  describe('getOne', () => {
    it('should return a Movie', () => {
      service.create(testMovie);
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('shoud throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create(testMovie);
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterMovies = service.getAll().length;
      expect(afterMovies).toBeLessThan(beforeDelete);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('create a movie', () => {
      service.create(testMovie);
      const newMovie = service.getOne(1);
      expect(newMovie).toBeDefined();
    });
    it('should return a 404', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create(testMovie);
      service.update(1, { title: 'updated test' });
      const movie = service.getOne(1);

      expect(movie.title).toEqual('updated test');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(999, { title: 'updated test' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
