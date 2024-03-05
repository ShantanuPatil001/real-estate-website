import React from "react";
import { Image } from "react-bootstrap";
import "./Bar.css";
import logo from "../../assets/images/id.png";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import { addInfo, getCookie, setCookie } from "../Tracking/CookieManagement";

const Header = (props) => {
  const [check, setCheck] = React.useState(false);
  const [flag, setFlag] = React.useState(true);
  
  useEffect(() => {
    if (flag) {
      setTimeout(() => {
        setFlag(false);
      }, 1000);
    }
    function uuidV4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    }
    if (getCookie("user_id") === "" || getCookie("user_id") === null || getCookie("user_id") === undefined) {
      console.log("user_id cookie is set");
      const privateKey = uuidV4();
      setCookie("user_id", privateKey);
      addInfo(getCookie("user_id"));
    }
  }, [flag]);
  
 
  return (
    <header>
      <div>{flag && <Loading />}</div>
      <Image
        className="logo"
        src={logo}
        alt="logo"
        href="/"
        onClick={() => (window.location.href = "/")}
      />
      <input
        type="checkbox"
        id="nav-toggle"
        className="nav-toggle"
        checked={check}
        onChange={() => setCheck(!check)}
      />
      <nav>
        <ul>
          <li>
            <a href="/" onClick={() => setCheck(!check)}>
              Home
            </a>
          </li>
          <li>
            <a href="/#about-us" onClick={() => setCheck(!check)}>
              About
            </a>
          </li>
          <li>
            <a href="/#our-team" onClick={() => setCheck(!check)}>
              Team
            </a>
          </li>
          <li>
            <NavLink to="/property" onClick={() => setCheck(!check)}>
              Properties
            </NavLink>
          </li>
          <li>
            <a href="/#contact-us" onClick={() => setCheck(!check)}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        <span></span>
      </label>
    </header>
  );
};

export default Header;
