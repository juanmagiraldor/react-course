import React from "react";
import PropTypes from "prop-types";

import Thumb from "../Thumb";

import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import NoImage from "../../images/no_image.jpg";

import { Wrapper, Content, Text } from "./MovieInfo.styles";

const MovieInfo = ({
  movie: {
    backdrop_path,
    poster_path,
    title,
    overview,
    vote_average,
    directors,
  },
}) => (
  <Wrapper backdrop={backdrop_path}>
    <Content>
      <Thumb
        image={
          poster_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${poster_path}`
            : NoImage
        }
        clickable={false}
      />

      <Text>
        <h1>{title}</h1>
        <h3>PLOT</h3>
        <p>{overview}</p>

        <div className="rating-directors">
          <div>
            <h3>RATING</h3>
            <div className="score">{vote_average}</div>
          </div>
          <div className="director">
            <h3>DIRECTOR{directors.length > 1 ? "S" : ""}</h3>
            {directors.map(({ credit_id, name }) => (
              <p key={credit_id}>{name}</p>
            ))}
          </div>
        </div>
      </Text>
    </Content>
  </Wrapper>
);

MovieInfo.propTypes = { movie: PropTypes.object };

export default MovieInfo;
