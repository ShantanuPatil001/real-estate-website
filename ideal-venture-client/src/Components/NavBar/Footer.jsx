import React from "react";
import GetHelp from "../Tracking/GetHelp";
import "./footer.css";
const Footer = () => {
  // create random key for each footer
  const key = Math.random();
  return (
    <div>
      <div className="getHelp">
        <GetHelp key={key} />
      </div>
      <footer>
        <h1>Ideal Venture</h1>
        <li>
          <a href="/#home">Home</a>
        </li>
        <li>
          <a href="/#about-us">About</a>
        </li>
        <li>
          <a href="/#our-team">Our Team</a>
        </li>
        <li>
          <a href="/property">Properties</a>
        </li>
        <li>
          <a href="/#contact-us">Contact</a>
        </li>

        <h6>Made with ❤️ by MagicMaze </h6>
      </footer>
    </div>
  );
};

export default Footer;
