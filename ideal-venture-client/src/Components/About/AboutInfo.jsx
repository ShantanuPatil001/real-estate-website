import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import "./Info.css";
import qImg from "../../assets/images/Group2.png";
import logo from "../../assets/images/idtext.png";
import { useHistory } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../FirbaseConfig/firebaseConfig";
//import pro from "../../assets/images/propic.jpg" 
const AboutInfo = (props) => {
  let history = useHistory();
  const handleClick = () => {
    logEvent(analytics, "see_properties_clicked", {
      page: "about", 
      to_page: "properties"
      });
    history.push("/property");
  };

  useEffect(() => {
    Aos.init({ duration: 1400 });
    logEvent(analytics, "AboutInfo", {
      page: "AboutInfo"
    });
  }, []);
  return (
    <div className="info-page">
      <section id="home" className="sectionA">
        <Image
          src={
            "https://firebasestorage.googleapis.com/v0/b/ideal-venture.appspot.com/o/bg1.jpg?alt=media&token=e787c6c7-5d92-4434-be39-01064b524b91"
          }
          className="bg-image"
          alt="ideal-venture-properties"
        />
        <h1 data-aos="zoom-out-up">IDEAL VENTURE</h1>
        <button className="goto" onClick={handleClick} data-aos="flip-up">
          See Properties
        </button>
      </section>
      <section id={`about-us`} className="about-section">
        <h1 data-aos="fade-up">About Us.</h1>
        <Image data-aos="fade-up" src={logo} className="about-logo" />
        <p data-aos="fade-up" alt="about ideal venture">
          Ideal Venture has more than 10 years experience in real estate, land
          plotting, land dealing. Venture has more than five years experience in
          organic agriculture plotting and its dealing complemented by well
          experienced professional marketing team. We have more than 5 years of
          experience in road contracts in private and government. All this not
          only makes us a venture but an IDEAL VENTURE.
        </p>
      </section>
      <section id="our-team" className="team-section">
        <Image
          src={
            "https://firebasestorage.googleapis.com/v0/b/ideal-venture.appspot.com/o/bg21.jpeg?alt=media&token=cff85d12-0f8d-446d-a211-f97ee85739aa"
          }
          className="bg-image"
          alt="about team at ideal venture"
        />
        <h1 data-aos="zoom-in">Our Team</h1>
        {/*<div className="pro">
          <div className="pro-pic" data-aos="flip-up">
            <Image src={pro} />
            <div className="pro-info">
              <h3>Anup Singh</h3>
              <h6>Designation</h6>
            </div>
          </div>
          <div className="pro-pic" data-aos="flip-up">
            <Image src={pro} />
            <div className="pro-info">
              <h3>Anup Singh</h3>
              <h6>Designation</h6>
            </div>
          </div>
          <div className="pro-pic" data-aos="flip-up">
            <Image src={pro} />
            <div className="pro-info">
              <h3>Anup Singh</h3>
              <h6>Designation</h6>
            </div>
          </div>
          <div className="pro-pic" data-aos="flip-up">
            <Image src={pro} />
            <div className="pro-info">
              <h3>Anup Singh</h3>
              <h6>Designation</h6>
            </div>
          </div>
        </div>*/}
      </section>
      <section className="team-info">
        <Image
          src={qImg}
          className="quote"
          data-aos="flip-down"
          duration={100}
          alt="ideal venture team quote"
        />
        <div className="team-text" data-aos="fade-up">
          <p>
            We began our journey in June 2018 as six members from Pune district
            residence and started working as partnership firm.
          </p>
          <p>
            I.V is manned by four thorough bred matured professionals groomed
            through years in various sectors like real estate, organic
            agriculture, civil government contractor and land licensing work.
          </p>
          <p>
            We provide professional services of higher order to our customer.
          </p>
        </div>
      </section>
      <div id="contact-us">
        <section className="contact-section">
          <div className="contact-head">
            <h1 data-aos="fade-up">Contact Us.</h1>
            <h2 data-aos="fade-up">lets talk !</h2>
          </div>
          <div className="contact-body">
            <div className="contact-box" data-aos="slide-up">
              <h1>Address</h1>
              <p>Street X , City X, State X, PIN - 410000</p>
            </div>
            <div className="contact-box" data-aos="slide-up">
              <h1>E-Mail</h1>
              <a href="mailto:idealventure1234@gmail.com">
                abcd@gmail.com
              </a>
            </div>
            <div className="contact-box" data-aos="slide-up">
              <h1>Call on</h1>
              <a href="tel:9309191813">+91 9876543210</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutInfo;
