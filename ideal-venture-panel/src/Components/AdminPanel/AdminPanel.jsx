import React, { useState } from "react";
import { Image } from "react-bootstrap";
import logo from "../../assets/logo.svg";
import "./AdminPanel.css";
import PreView from "./PreView/PreView";
import TreeView from "./TreeView/TreeView";
import Button from "@mui/material/Button";
import { FormControlLabel, Switch } from "@mui/material";
import { setMaintenanceMode } from "../../API/AllRequestResponse";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const AdminPanel = () => {
  let history = useHistory();
  const [selected, setSelected] = useState(null);
  const [selectFlag, setSelectFlag] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const handleSetPreview = (data) => {
    setSelected(data);
    setSelectFlag(true);
  };

  const handleMaintenanceMode = (e, c) => {
    //console.log(c);
    setMaintenance(c);
    setMaintenanceMode({ enable: c })
      .then((res) => {
        setEnabled(true);
        sessionStorage.setItem("maintenance", c);
        setMaintenance(res.status);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("maintenance") === "true") {
      setMaintenance(true);
    } else {
      setMaintenance(false);
    }
    if (!enabled) {
      setMaintenance(sessionStorage.getItem("maintenance") === "true");
    }
  }, [enabled, setEnabled, maintenance, setMaintenance]);

  return (
    <div>
      <nav>
        <div className="logo">
          <Image src={logo} className="nav-logo" />
        </div>
        <div />
        <div className="acc-logo">
          <div>
            <FormControlLabel
              sx={{
                display: "flex",
                flexFlow: "column-reverse",
                justifyContent: "center",
                color: "white",
                border: ".9px solid white",
                padding: "0.5rem",
                borderRadius: ".3rem",
              }}
              control={
                <Switch
                  checked={maintenance}
                  onChange={handleMaintenanceMode}
                  name="loading"
                  color="primary"
                  value={undefined}
                />
              }
              label="Maintenance Mode"
            />
          </div>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              sessionStorage.removeItem("status");
              sessionStorage.removeItem("token");
              history.push("/login");
              ;
            }}
          >
            Logout
          </Button>
        </div>
      </nav>
      <div className="views">
        <div className="tree-view">
          <TreeView key={9080001} setPreview={handleSetPreview} />
        </div>
        <div className="pre-view">
          {selectFlag && (
            <PreView
              images={selected.images}
              title={selected.title}
              location={selected.location}
              price_range={selected.price_range}
              area={selected.area}
              description={selected.description}
              tags={selected.tags}
              services={selected.services}
              video_url={selected.video}
              map_url={selected.map}
              type={selected.type}
            />
          )}
        </div>
        {/* <div className="action-view"></div> */}
      </div>
    </div>
  );
};

export default AdminPanel;
