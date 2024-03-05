import React from "react";
import "./moviead.css";
import poster from "./gular.jpeg";
import { Image } from "react-bootstrap";
import CloseIcon from '@mui/icons-material/Close';
const MovieAd = (props) => {
  return (
    <div className="movie-ads">
      <div className="movie-ad">
        <Image src={poster} className="poster" />
        <CloseIcon
          className="close-poster"
          onClick={() => props.popUpFlag(false)}
        />
      </div>
    </div>
  );
};

export default MovieAd;
