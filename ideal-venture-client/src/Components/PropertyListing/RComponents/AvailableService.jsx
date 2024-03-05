import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import Tick from "../icons/check-circle.svg";
import Dash from "../icons/dash-circle.svg";
const AvailableService = (props) => {
  const [correct, setCorrect] = useState(false);
  const [serviceName, setServiceName] = useState("");

  useEffect(() => {
    if (props.service.includes("*")) {
      let arr = props.service.split("*");
      setServiceName(arr[1]);
      setCorrect(false);
    } else {
      setServiceName(props.service);
      setCorrect(true);
    }
  }, [props]);

  return (
    <div className="service-box">
      <Image className="ico-tick" src={correct ? Tick : Dash}  alt="List Available Services"/>
      <h6 className="sub-text">{serviceName}</h6>
      
    </div>
  );
};

export default AvailableService;
