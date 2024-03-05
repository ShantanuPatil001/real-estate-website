import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./404";
import AboutInfo from "./Components/About/AboutInfo";
import Header from "./Components/NavBar/Header";
import MoreInfo from "./Components/PropertyListing/MoreDetails/MoreInfo";
import PropertyList from "./Components/PropertyListing/Cards/PropertyListing/PropertyList";
import Footer from "./Components/NavBar/Footer";
// import MovieAd from "./Components/Entertainment/MovieAd";
import { getCookie, setCookie } from "./Components/Tracking/CookieManagement";
import CollageForMovie from "./Components/Entertainment/CollageForMovie";

const Home = () => {
  const [moviePopUp, setMoviePopUp] = React.useState(true);
  useEffect(() => {
    console.log(moviePopUp, getCookie("movie_modal"));
    if (
      getCookie("movie_modal") === null ||
      getCookie("movie_modal") === undefined
    ) {
      setCookie("movie_modal", "true");
    }
    if (getCookie("movie_modal") === "true") setMoviePopUp(true);
    else setMoviePopUp(false);
  }, [moviePopUp]);

  //  const closePopUp = (flag) => {
  //    if (!flag) {
  //      setMoviePopUp(flag);
  //      setCookie("movie_modal", "false");
  //    }
  //  };
  return (
    <Router>
      <div className="scrollbar" id="style-3">
        <div>
          <Header />
        </div>
        {/* <div>
          {moviePopUp && <MovieAd key={2390234} popUpFlag={closePopUp} />}
        </div> */}
        <div className="overflow">
          <Switch>
            <Route exact path="/property">
              <PropertyList />
            </Route>
            <Route exact path="/moreInfo">
              <MoreInfo />
            </Route>
            <Route exact path="/">
              <AboutInfo />
            </Route>
            <Route exact path="/collage">
              <CollageForMovie />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default Home;
