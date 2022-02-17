import React from "react";

import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";

import { useHomeFetch } from "../hooks/useHomeFetch";

import NoImage from "../images/no_image.jpg";

const Home = () => {
  const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } =
    useHomeFetch();
  if (error) return <div>Something went wrong ...</div>;

  return (
    <>
      {!searchTerm && state && state.results[0] && (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      )}
      <SearchBar setSearchTerm={setSearchTerm} />

      {state && state.results[0] && (
        <>
          <Grid header={searchTerm ? "Search Results" : "Popular Movies"}>
            {state.results.map(({ id, poster_path }) => (
              <Thumb
                key={id}
                clickable={true}
                image={
                  poster_path
                    ? IMAGE_BASE_URL + POSTER_SIZE + poster_path
                    : NoImage
                }
                movieId={id}
              />
            ))}
          </Grid>
          {loading && <Spinner />}
          {state.page < state.total_pages && !loading && (
            <Button
              text="Load More"
              callback={() => {
                setIsLoadingMore(true);
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default Home;
