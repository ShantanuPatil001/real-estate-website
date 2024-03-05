import Delete from "@mui/icons-material/Delete";
import React from "react";
const Tags = (props) => {
  const handleDeleteTag = () => {
    
    props.handleDelete(props.tag_id);
  }
  return (
    <div className="tag-box">
      <h6 className="tag-text">{props.Title}</h6>
      {props.enableDelete && (
        <Delete
          fontSize="small"
          id="del-ico"
          onClick={handleDeleteTag}
        />
      )}
    </div>
  );
};

export default Tags;
