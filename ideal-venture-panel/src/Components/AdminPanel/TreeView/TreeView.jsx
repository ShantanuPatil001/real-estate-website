import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./TreeView.css";
import { useHistory } from "react-router";
import { deleteData, getList } from "../../../API/AllRequestResponse";
import {
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const TreeView = (props) => {
  let history = useHistory();

  const [flag, setFlag] = useState(false);
  const [list, setList] = useState(null);

  const [selected, setSelected] = useState([]);

  const handleClick = (index, item) => {
    setSelected(index);
    props.setPreview(item);
  };

  const handleAddClick = () => {
    history.push("/add");
  };

  useEffect(() => {
    const getListAPI = async () => {
      try {
        await getList().then((res) => {
          
          setList(res.properties);
          setFlag(true);
        });
      } catch (error) {
        alert(error);
      }
    };
    if (!flag) {
      getListAPI();
    }
    return () => {
      setFlag(true);
    };
  }, [list, flag]);

  const handleDelete = (id) => {
    deleteData(id)
      .then((res) => {
        alert(res.message);
        setList([]);
        setFlag(false);
        window.location.reload();
        window.location.href = "/admin";
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleEdit = (item) => {
    history.push({
      pathname: "/edit",
      search: `?property=${item.id}`,
      state: { EditForm: item },
    });
  };

  return (
    <div className="tree-view-body">
      <div>
        <div className="text-head">
          <h3>{"Properties"}</h3>
        </div>
        <div>
          <div>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {flag ? (
                list.map((item, index) => {
                  return (
                    <div key={index}>
                      <ListItem
                        secondaryAction={
                          <div>
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              onClick={() => handleEdit(item)}
                              sx={{
                                marginRight: "2px",
                                ":hover": {
                                  color: "blue",
                                },
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleDelete(item.id)}
                              sx={{
                                ":hover": {
                                  color: "red",
                                },
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        }
                        selected={selected === index}
                        onClick={() => handleClick(index, item)}
                      >
                        <ListItemText primary={item.title} />
                      </ListItem>
                    </div>
                  );
                })
              ) : (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress color="success" />
                </div>
              )}
            </List>
          </div>
        </div>
      </div>
      <div>
        <Button variant="primary" className="add-btn" onClick={handleAddClick}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default TreeView;
