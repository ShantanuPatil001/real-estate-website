import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import "./tracking.css";
import { getCookie, setCookie } from "./CookieManagement";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { addUserInfo } from "../../REST/AllRequestResponse";

const GetHelp = () => {
  let location = useLocation();
  const [mobile, setMobile] = React.useState("");
  const [name, setName] = React.useState("");
  const [modalFlag, setModalFlag] = React.useState(true);
  const [submitFlag, setSubmitFlag] = React.useState(false);
  const [response, setResponse] = React.useState([]);
  useEffect(() => {
    const checkPhoneCookie = () => {
      const isMobileValid = getCookie("phone_number_valid");
      const isModalClosed = getCookie("modal_closed");
      if (isMobileValid === "true" || isModalClosed === "true") {
        setModalFlag(false);
      } else {
        setModalFlag(true);
        setSubmitFlag(false);
      }
    };
    checkPhoneCookie();
    let resMessage = [];
    resMessage.push("Need Help?");
    resMessage.push("Let us contact you.");
    setResponse(resMessage);
  }, [location]);

  const handleHelpInfoChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === "mobile") {
      let isNum = /^\d+$/.test(value);
      if (isNum) {
        if (value.length <= 10) {
          setMobile(value);
        }
      } else {
        setMobile(value.replace(/[^0-9]/g, ""));
      }
    }
  };

  const handleTextFieldChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const isText = /^[a-zA-Z ]+$/.test(value);
    if (isText) {
      setName(value);
    } else {
      setName(value.replace(/[^a-zA-Z ]/g, ""));
    }
  };

  const handleCloseEvent = () => {
    setCookie("modal_closed","true");
    setModalFlag(false);
  };

  const handleSubmit = async () => {
    console.log("mobile", mobile);
    console.log("name", name);
    const resMessage = [];
    if (name === "") {
      resMessage.push("Please use valid name.");
      setResponse(resMessage);
    }
    if (mobile.length !== 10) {
      resMessage.push("Please use valid mobile number.");
      setResponse(resMessage);
    }

    if (mobile === 10 || name.length > 0) {
      setSubmitFlag(true);
      resMessage.push("Thanks for contacting us.");
      resMessage.push("We will get back to you soon.");
      await addUserInfo(name, mobile, getCookie("user_id")).then((res) => {
        console.log("res", res);
        if (res.status === true) {
          setCookie("phone_number_valid", "true");
          resMessage.push(res.message);
        } else {
          setCookie("phone_number_valid", "false");
        }
      });
      setResponse(resMessage);
      setTimeout(() => {
        setModalFlag(false);
      }, 3000);
    }
  };

  return (
    <div className="help-box">
      {modalFlag && (
        <div className="help-pop-up" data-aos="fade-up">
          <div className="close-btn-help-box">
            <CloseIcon
              onClick={handleCloseEvent}
              sx={{
                color: "black",
                backgroundColor: "white",
                borderRadius: "50%",
                fontSize: "20px",
              }}
            />
          </div>
          {submitFlag ? (
            <div className="response-message">
              <div className="response-message-text">
                {response.map((item) => (
                  <h3>{item}</h3>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-help-message-input">
              <div>
                <h1 className="help-head-text">
                  {response.map((item) => (
                    <div>
                      {item}
                      <br />
                    </div>
                  ))}
                </h1>
              </div>

              <div className="help-input-box">
                <div className="help-input-fields">
                  <div className="email-text-field">
                    <TextField
                      variant="standard"
                      placeholder="Enter Your Name"
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="mobile"
                      value={name}
                      onChange={handleTextFieldChange}
                      InputProps={{
                        disableUnderline: true,
                        className: "help-input",
                      }}
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="email-text-field">
                    <TextField
                      variant="standard"
                      placeholder="Enter Mobile Number"
                      type="text"
                      name="mobile"
                      id="mobile"
                      autoComplete="mobile"
                      value={mobile}
                      onChange={handleHelpInfoChange}
                      InputProps={{
                        disableUnderline: true,
                        className: "help-input",
                      }}
                      sx={{ width: "100%" }}
                    />
                  </div>
                </div>

                <div className="submit-btn">
                  <ArrowForwardIosIcon
                    fontSize="small"
                      onClick={handleSubmit}

                      sx={{
                        color: "black",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        fontSize: "10px",
                      }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GetHelp;
