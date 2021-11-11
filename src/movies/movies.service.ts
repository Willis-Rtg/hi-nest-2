import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  create(movieData: CreateMovieDto): boolean {
    if (movieData) {
      const newLen = this.movies.push({
        id: this.movies.length + 1,
        ...movieData,
      });
      return newLen ? true : false;
    } else return false;
  }

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    console.log(typeof id);
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found.`);
    return movie;
  }

  deleteOne(id: number) {
    const movie = this.getOne(id);
    // this.movies = this.movies.filter((movie) => movie.id !== +id);
    const indexOf = this.movies.indexOf(movie);
    this.movies.splice(indexOf, 1);

    // if (check) {
    //   this.movies.filter((movie) => movie.id !== +id);
    //   return true;
    // } else {
    //   return false;
    // }
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
