import React from "react";
import { Carousel, Image } from "react-bootstrap";
import Tags from "../RComponents/Tags";
import AvailableService from "../RComponents/AvailableService";
import IconPin from "../RComponents/icons/pin.svg";
import "./PreView.css";
const PreView = (props) => {
  return (
    <div className="more-info-page">
      <h1 style={{ textAlign: "center", margin: "10px" }}>
        {`Preview (${props.type})`}
      </h1>
      <div id="all-images">
        <Carousel>
          {props.images !== undefined && props.images.map((image, index) => {
            return (
              <Carousel.Item key={index} className="images-box">
                <Image
                  key={index}
                  src={image.url}
                  alt={props.title}
                  className="image"
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <div className="info-box">
        <div className="row1">
          <h1 className="title">{props.title}</h1>
          <div className="location">
            <Image className="pin" src={IconPin} />
            <h6 className="sub-text">{props.location}</h6>
          </div>
        </div>
        <div className="row2">
          <h5 className="sub-text price">Price : {props.price_range}</h5>
          <h6 className="sub-text">Area : {props.area}</h6>
        </div>
      </div>

      <div className="contactbtn">
        <a href="tel:1234567890">
          <button className="more-btn">Contact</button>
        </a>
      </div>

      <div className="description">
        <h4 className="head-text">Description</h4>
        <p>{props.description}</p>
      </div>

      <div className="split-sub-data-more">
        <div className="sub-data">
          <div className="tags">
            {props.tags.map((item, index) => {
              return <Tags key={index} Title={item} />;
            })}
          </div>
          <h4 className="head-text">Services</h4>
          <div className="service">
            {props.services.map((item, index) => {
              return <AvailableService key={index} service={item} />;
            })}
          </div>
        </div>
      </div>

      <div className="images-box">
        <div>
          <div
            className="image"
            dangerouslySetInnerHTML={{ __html: props.video_url }}
          />
        </div>
      </div>
      <div className="images-box">
        <h4 id="dir" className="head-text">
          Directions
        </h4>
        <div>
          <div
            className="image"
            dangerouslySetInnerHTML={{ __html: props.map_url }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreView;
