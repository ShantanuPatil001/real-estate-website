import React, { useEffect, useState } from "react";
import "./ShowcaseCard.css";
import { Image } from "react-bootstrap";
const ShowcaseCard = (props) => {
  // title size less than 30

  const [title, setTitle] = useState("");
  const [subText, setSubText] = useState("");

  useEffect(() => {
    const truncate = (str, n) => {
      return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };
    setTitle(truncate(props.title, 30));
    setSubText(truncate(props.subTitle, 50));
  }, [props]);
  return (
    <div className="showcase-card" >
      <div className="showcase-card-image">
        <Image src={props.image[0].url} alt={title+ ' ' +subText} className="showcase-card-img" />
      </div>
    </div>
  );
};

export default ShowcaseCard;
