import React, { useEffect, useState } from "react";
import { getListAll } from "../../../../REST/AllRequestResponse";
import Loading from "../../../Loading/Loading";
import { Carousel, Image } from "react-bootstrap";
import "../Card.css";
import IconPin from "../../icons/pin.svg";
import AvailableService from "../../RComponents/AvailableService";
import Tags from "../../RComponents/Tags";
import "./PropertyList.css";
import { useHistory } from "react-router";
import ShowcaseCard from "../Showcase/ShowcaseCard";
import { Chip } from "@mui/material";
const PropertyList = () => {
  let history = useHistory();
  const propertyTypes = ["All", "Flats", "Plots", "Our Ventures"];
  const [propertyType, setPropertyType] = useState("All");
  const [list, setList] = useState(null);
  const [completeList, setCompleteList] = useState([]);
  const [showcaseList, setShowcaseList] = useState([]);
  const [interval] = useState(5000);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    
    const handleRefresh = async () => {
      window.scrollTo(0, 0);
      setLoading(true);
      await getListAll().then((res) => {
          let list = res.listProperties;
          if (list !== undefined) {
            setList(list);
            setCompleteList(list);
            let showcaseFilteredList = list.filter(
              (item) => item.showcase === true
            );
            setShowcaseList(showcaseFilteredList);
          }
        setLoading(false);
        });
    };
    handleRefresh();
      
    
  }, []);

  const handleMoreClick = (item) => {
    history.push({
      pathname: "/moreInfo",
      search: `?property=${item.title}`,
      state: { data: item },
    });
  };

  const handlePropertyTypeClick = (filterText) => {
    setLoading(true);
    let filteredList = completeList;
    if (filterText === "All") {
      setPropertyType(filterText);
      setList(filteredList);
    } else if (filterText === "Our Ventures") {
      setPropertyType(filterText);
      filteredList = filteredList.filter((item) => item.type === "new");
      setList(filteredList);
    } else if (filterText === "Plots") {
      setPropertyType(filterText);
      filteredList = filteredList.filter((item) => item.type === "plot");
      setList(filteredList);
    } else if (filterText === "Flats") {
      setPropertyType(filterText);
      filteredList = filteredList.filter((item) => item.type === "flat");
      setList(filteredList);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div id="property-list">
      <div>
        {loading && <Loading />}
      </div>
      <div className="showcase-parent">
        <Carousel controls={false} className={{ margin: "10px" }}>
          {showcaseList.map((item) => (
            <Carousel.Item key={item.id} interval={interval} onClick={() => handleMoreClick(item)}>
              <ShowcaseCard
                image={item.showcaseImage}
                title={item.showcaseTitle}
                subTitle={item.showcaseSubTitle}
                viewClick={() => handleMoreClick(item)}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="property-list-parent">
        <h1>PROPERTIES</h1>
      </div>
      <div className="filter-chips">
        {propertyTypes.map((text, index) => (
          <div className="filter-chip">
            <Chip
              key={index}
              label={text}
              variant={propertyType === text ? "default" : "outlined"}
              size="large"
              color={propertyType === text ? "success" : "primary"}
              onClick={() => handlePropertyTypeClick(text)}
              sx={{
                width: "100%",
                margin: "10px",
                borderRadius: "4px",
                fontSize: "14px",
                borderColor: "white",
                color: "white",
              }}
            />
          </div>
        ))}
      </div>
      <div>
        {list !== null ? (
          list.map((item, index) => {
            return (
              <div>
                <div className="Card">
                  <div className="thumbnail">
                    <Image
                      src={item.images[0].url}
                      alt={item.images[0].name}
                      onClick={() => handleMoreClick(item)}
                    />
                  </div>
                  <div className="data">
                    <div className="info-box">
                      <div className="row1">
                        <h1
                          className="title"
                          onClick={() => handleMoreClick(item)}
                        >
                          {item.title}
                        </h1>
                        <div className="location">
                          <Image
                            className="pin"
                            src={IconPin}
                            alt="Location | Address"
                          />
                          <h6 className="sub-text">{item.location}</h6>
                        </div>
                      </div>
                      <div className="row2">
                        <h5 className="sub-text price">
                          Price : {item.price_range}
                        </h5>
                        <h6 className="sub-text">Area : {item.area}</h6>
                      </div>
                    </div>
                    <div className="split-sub-data-more">
                      <div className="sub-data">
                        <div className="tags">
                          {item.tags.map((tag, index) => {
                            return (
                              index < 8 && <Tags key={index} Title={tag} />
                            );
                          })}
                        </div>
                        <div className="services">
                          {item.services.map((item, index) => {
                            return (
                              index < 12 && (
                                <AvailableService key={index} service={item} />
                              )
                            );
                          })}
                        </div>
                      </div>

                      <div className="more-box">
                        <button
                          className="more-btn"
                          onClick={() => handleMoreClick(item)}
                        >
                          More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default PropertyList;
