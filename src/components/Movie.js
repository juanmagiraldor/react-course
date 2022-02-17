import React from "react";

import { useParams } from "react-router-dom";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

import BreadCrumb from "./BreadCrumb";
import Grid from "./Grid";
import Spinner from "./Spinner";
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor";

import { useMovieFetch } from "../hooks/useMovieFetch";

import MovieInfo from "./MovieInfo";
import NoImage from "../images/no_image.jpg";

const Movie = () => {
  const { movieId } = useParams();

  const { state: movie, loading, error } = useMovieFetch(movieId);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header="Actors">
        {movie.actors.map(({ credit_id, name, character, profile_path }) => (
          <Actor
            key={credit_id}
            name={name}
            character={character}
            imageUrl={
              profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${profile_path}`
                : NoImage
            }
          />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
