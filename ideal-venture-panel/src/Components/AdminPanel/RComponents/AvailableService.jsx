import Delete from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import Tick from "./icons/check-circle.svg";
import Dash from "./icons/dash-circle.svg";
const AvailableService = (props) => {
  // console.log(props.correct);
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
      <Image className="ico-tick" src={correct ? Tick : Dash} />
      <h6 className="sub-text">{serviceName}</h6>
      {props.enableDelete && (
        <Delete
          fontSize="small"
          id="del-ico"
          onClick={() => props.handleDelete(props.service_id)}
        />
      )}
    </div>
  );
};

export default AvailableService;
