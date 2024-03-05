import React, { useEffect, useState } from "react";
import { Image, Carousel } from "react-bootstrap";
import "./moreInfo.css";
import AvailableService from "../RComponents/AvailableService";
import Tags from "../RComponents/Tags";
import IconPin from "../icons/pin.svg";
import { useLocation } from "react-router";
import Loading from "../../Loading/Loading";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const MoreInfo = (props) => {
  const location = useLocation();
  const [data] = useState(location.state.data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="more-info-page">
      <div>{loading && <Loading />}</div>
      <div id="all-images">
        <Carousel>
          {data.images.map((image, index) => {
            return (
              <Carousel.Item key={index} className="images-box">
                <Image
                  key={index}
                  src={image.url}
                  alt={image.name}
                  className="image"
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <div className="info-box">
        <div className="row1">
          <h1 className="title">{data.title}</h1>
          <div className="location">
            <Image className="pin" src={IconPin} />
            <h6 className="sub-text">{data.location}</h6>
          </div>
        </div>
        <div className="row2">
          <h5 className="sub-text price">Price : {data.price_range}</h5>
          <h6 className="sub-text">Area : {data.area}</h6>
        </div>
      </div>

      <div className="contactbtn">
        <button
          className="more-btn"
          onClick={() => (window.location.href = "tel:9309191813")}
        >
          {/* <Image src={Call} className="call" /> */}
          Contact
        </button>
        <button
          id="whatsapp-on-this"
          className="more-btn"
          onClick={() =>
            (window.location.href = `https://wa.me/+919021984014?text=Hi _Ideal Venture_, I am interested in *${data.title.toUpperCase()}* property.`)
          }
        >
          <WhatsAppIcon fontSize="medium" /> <b>{"Whatsapp"}</b>
        </button>
      </div>

      {data.description !== "NIL" && (
        <div className="description">
          <h4 className="head-text">Description</h4>
          <h6>{data.description}</h6>
        </div>
      )}

      <div className="split-sub-data-more">
        <div className="sub-data">
          <div className="tags">
            {data.tags.map((tag, index) => {
              return index < 8 && <Tags key={index} Title={tag} />;
            })}
          </div>
          <h4 className="head-text">Services</h4>
          <div className="service">
            {data.services.map((item, index) => {
              return (
                index < 12 && <AvailableService key={index} service={item} />
              );
            })}
          </div>
        </div>
      </div>

      {data.video !== "NIL" && (
        <div className="images-box">
          <div
            className="image"
            dangerouslySetInnerHTML={{ __html: data.video }}
          />
        </div>
      )}
      {data.map !== "NIL" && (
        <div className="images-box">
          <h4 id="dir" className="head-text">
            Directions
          </h4>
          <div>
            <div
              className="image"
              dangerouslySetInnerHTML={{ __html: data.map }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreInfo;
