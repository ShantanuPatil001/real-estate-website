import {
  TextField,
  Box,
  Button,
  Backdrop,
  CircularProgress,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  FormGroup,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import "./form.css";
import {
  addData,
  deleteImage,
  updateData,
  uploadImages,
} from "../../../API/AllRequestResponse";
import Tags from "../RComponents/Tags";
import AvailableService from "../RComponents/AvailableService";
import { useHistory, useLocation } from "react-router";
import { FormLabel } from "react-bootstrap";
const FormFile = (props) => {
  const location = useLocation();
  const [form, setForm] = useState({
    id: "",
    title: "",
    location: "",
    price_range: "",
    area: "",
    tags: [],
    services: [],
    description: "",
    map: "",
    video: "",
    images: [],
    type: "",
    showcase: false,
    showcaseImage: [],
    showcaseTitle: "",
    showcaseSubTitle: "",
  });
  const [tags, setTags] = useState("");
  const [services, setServices] = useState("");
  const [images, setImages] = useState([]);
  const [preViewImage, setPreViewImage] = useState([]);
  const [showcaseImage, setShowcaseImage] = useState([]);
  const [showcasePreViewImage, setShowcasePreViewImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    location: "",
    price_range: "",
    area: "",
    tags: "",
    services: "",
    description: "",
    map: "",
    video: "",
    images: "",
    type: "",
    showcase: false,
    showcaseImage: "",
    showcaseTitle: "",
    showcaseSubTitle: "",
  });
  let history = useHistory();

  useEffect(() => {
    if (location.pathname === "/edit") {
      setForm((prevState) => ({
        ...prevState,
        ...location.state.EditForm,
      }));
      setEditFlag(true);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTags = (e) => {
    const { value } = e.target;
    setTags(value);
  };

  const handleServices = (e) => {
    const { value } = e.target;
    setServices(value);
  };

  const handleImages = (e) => {
    const { files } = e.target;
    setImages(files);
    if (files.length > 0) {
      let array = [];
      for (let i = 0; i < files.length; i++) {
        array.push(URL.createObjectURL(files[i]));
      }
      setPreViewImage(array);
    }
  };

  const handleShowcaseImages = (e) => {
    const { files } = e.target;
    setShowcaseImage(files);
    if (files.length > 0) {
      let array = [];
      for (let i = 0; i < files.length; i++) {
        array.push(URL.createObjectURL(files[i]));
      }
      setShowcasePreViewImage(array);
    }
  };

  const handleDeleteImage = (index, type) => {
    let filesArray = [];
    if (type === "images") {
      filesArray = [...images];
      setImages(filesArray.filter((item, i) => i !== index));
    } else if (type === "showcaseImage") {
      filesArray = [...showcaseImage];
      setShowcaseImage(filesArray.filter((item, i) => i !== index));
    }

    let preViewArray = [...preViewImage];
    if (type === "images") {
      setPreViewImage(preViewArray.filter((item, i) => i !== index));
    } else if (type === "showcaseImage") {
      setShowcasePreViewImage(preViewArray.filter((item, i) => i !== index));
    }
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      setForm({ ...form, tags: [...form.tags, tags] });
      setTags("");
    }
  };

  const handleServiceKeyPress = (e) => {
    if (e.key === "Enter") {
      setForm({ ...form, services: [...form.services, services] });
      setServices("");
    }
  };

  const handleDeleteTagIcon = (index) => {
    const newTags = form.tags.filter((tag, i) => i !== index);
    setForm({ ...form, tags: newTags });
  };

  const handleDeleteServiceIcon = (index) => {
    const newServices = form.services.filter((service, i) => i !== index);
    setForm({ ...form, services: newServices });
  };

  const handleSubmit = async () => {
    const checkErrors = await handleValidation();
    //console.log(checkErrors);
    if (!checkErrors) {
      setLoading(true);
      try {
        let showcaseImagesArray = null;
        let imagesArray = null;
        let data = null;
        if (images.length > 0) {
          imagesArray = await handleUploadImages(images);
        }
        if (showcaseImage.length > 0) {
          showcaseImagesArray = await handleUploadImages(showcaseImage);
        }
        if (imagesArray !== null && showcaseImagesArray !== null) {
          data = {
            ...form,
            images: imagesArray,
            showcaseImage: showcaseImagesArray,
          };
        } else if (imagesArray !== null && showcaseImagesArray === null) {
          data = {
            ...form,
            images: imagesArray,
          };
        } else if (imagesArray === null && showcaseImagesArray !== null) {
          data = {
            ...form,
            showcaseImage: showcaseImagesArray,
          };
        } else {
          data = {
            ...form,
          };
        }
        //console.log(data);
        await addData(data)
          .then((res) => {
            if (res.status) {
              setLoading(false);
              //console.log(res);
              history.push("/");
            }
          })
          .catch((err) => {
            alert(err);
          });
      } catch (error) {
        alert("error", error);
      }
    }
  };

  const handleUploadImages = async (images) => {
    const formImages = new FormData();

    for (let i = 0; i < images.length; i++) {
      formImages.append("images", images[i]);
    }
    let data = [];
    return await uploadImages(formImages)
      .then((res) => {
        //console.log(res);
        data = res.fileUrls;
        return data;
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleCloudImage = (image, type) => {
    setLoading(true);
    const imageName = image.name;
    let delImages = [];
    let key = type;
    if (key === "images") {
      delImages = form.images;
    } else if (key === "showcaseImage") {
      delImages = form.showcaseImage;
    }
    const newImages = delImages.filter((item) => item.name !== imageName);

    deleteImage(form.id, imageName, key)
      .then((res) => {
        if (key === "images") {
          setForm({ ...form, images: newImages });
        } else if (key === "showcaseImage") {
          setForm({ ...form, showcaseImage: newImages });
        }
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  const handleUpdate = async () => {
    const checkErrors = await handleValidation();
    //console.log(checkErrors);
    if (!checkErrors) {
      let newShowcaseImagesArray = [];
      let newImagesArray = [];
      let data = {};
      setLoading(true);
      try {
        if (images.length > 0) {
          newImagesArray = await handleUploadImages(images);
          //console.log('new Image Array ',newImagesArray);
          data = {
            ...form,
            images: newImagesArray,
          };
        }
        if (showcaseImage.length > 0) {
          newShowcaseImagesArray = await handleUploadImages(showcaseImage);
          data = {
            ...form,
            showcaseImage: newShowcaseImagesArray,
          };
        }
        if (newImagesArray.length > 0 && newShowcaseImagesArray.length > 0) {
          data = {
            ...form,
          };
        } else if (
          newImagesArray.length > 0 &&
          newShowcaseImagesArray.length === 0
        ) {
          data = {
            ...form,
            images: newImagesArray,
          };
        } else if (
          newImagesArray.length === 0 &&
          newShowcaseImagesArray.length > 0
        ) {
          data = {
            ...form,
            showcaseImage: newShowcaseImagesArray,
          };
        } else {
          data = {
            ...form,
          };
        }

        //console.log(data);
        await updateData(form.id, data)
          .then((res) => {
            if (res.status) {
              setLoading(false);
              alert(res.message);
              history.push("/");
            }
          })
          .catch((err) => {
            alert(err);
          });
      } catch (error) {
        //console.log(error);
        alert("error", error);
      }
    }
  };

  const handleShowcaseChangeCheckbox = (e, c) => {
    setForm({ ...form, showcase: c });
  };

  const handleValidation = async () => {
    let error = false; // set error to false
    let errorsMessages = {}; // set errors to empty object
    if (form.title === "") {
      error = true;
      errorsMessages.title = "Title is required";
    } else if (form.title.length < 3) {
      error = true;
      errorsMessages.title = "Title must be at least 3 characters long";
    } else {
      errorsMessages.title = "";
    }
    if (form.type === "") {
      error = true;
      errorsMessages.type = "Type is required";
    } else {
      errorsMessages.type = "";
    }
    if (form.description === "NIL") {
      error = false;
      errorsMessages.description = "";
    } else if (form.description === "") {
      error = true;
      errorsMessages.description = "Description is required";
    } else if (form.description.length < 10) {
      error = true;
      errorsMessages.description =
        "Description must be at least 10 characters long";
    } else {
      errorsMessages.description = "";
    }
    if (form.price_range === "") {
      error = true;
      errorsMessages.price_range = "Price Range is required";
    } else if (form.price_range.length < 1) {
      error = true;
      errorsMessages.price_range =
        "Price Range must be at least 1 characters long";
    } else {
      errorsMessages.price_range = "";
    }
    if (form.area === "") {
      error = true;
      errorsMessages.area = "Area is required";
    } else if (form.area.length < 1) {
      error = true;
      errorsMessages.area = "Area must be at least 1 characters long";
    } else {
      errorsMessages.area = "";
    }
    if (form.map === "") {
      error = true;
      errorsMessages.map = "Map is required";
    } else {
      errorsMessages.map = "";
    }
    if (form.video === "") {
      error = true;
      errorsMessages.video = "Video is required";
    } else {
      errorsMessages.video = "";
    }
    if (form.tags.length < 1) {
      error = true;
      errorsMessages.tags = "Tags is required";
    } else {
      errorsMessages.tags = "";
    }
    if (form.services.length < 1) {
      error = true;
      errorsMessages.services = "Services is required";
    } else {
      errorsMessages.services = "";
    }
    if (form.location === "") {
      error = true;
      errorsMessages.location = "Location is required";
    } else if (form.location.length < 3) {
      error = true;
      errorsMessages.location = "Location must be at least 3 characters long";
    } else {
      errorsMessages.location = "";
    }
    if (images.length < 1 && form.images.length < 1) {
      error = true;
      errorsMessages.images = "Images is required";
    } else {
      errorsMessages.images = "";
    }
    if (
      (form.showcaseImage === "" || showcaseImage.length < 1) &&
      form.showcase === true
    ) {
      error = true;
      errorsMessages.showcaseImage = "Showcase Image is required";
    } else {
      errorsMessages.showcaseImage = "";
    }
    if (form.showcaseTitle === "" && form.showcase === true) {
      error = true;
      errorsMessages.showcaseTitle = "Showcase Title is required";
    } else if (form.showcaseTitle.length < 3 && form.showcase === true) {
      error = true;
      errorsMessages.showcaseTitle =
        "Showcase Title must be at least 3 characters long";
    } else {
      errorsMessages.showcaseTitle = "";
    }
    if (form.showcaseSubTitle === "" && form.showcase === true) {
      error = true;
      errorsMessages.showcaseSubTitle = "Showcase Sub Title is required";
    } else if (form.showcaseSubTitle.length < 10 && form.showcase === true) {
      error = true;
      errorsMessages.showcaseSubTitle =
        "Showcase Sub Title must be at least 10 characters long";
    } else {
      errorsMessages.showcaseSubTitle = "";
    }
    setErrors(errorsMessages);
    //console.log("error", error);
    return error;
  };

  return (
    <div className="form-box">
      <div className="inner-form-box">
        <div className="form-head">
          <h1>{editFlag ? `Edit` : `Add`} Form</h1>
        </div>
        <div className="form-body">
          <Box
            component="form"
            sx={{
              width: 700,
              maxWidth: "100%",
            }}
            noValidate={false}
            autoComplete="off"
          >
            <div className="form-input">
              <div className="form-inputs">
                <TextField
                  required
                  fullWidth
                  id="filled-required"
                  label="Title"
                  variant="filled"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  error={errors.title ? true : false}
                  helperText={errors.title}
                />
              </div>
              <div className="form-inputs">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Type</FormLabel>
                  <FormHelperText
                    id="type-helper-text"
                    error={errors.type ? true : false}
                    style={{
                      color: errors.type ? "red" : "",
                    }}
                  >
                    {errors.type}
                  </FormHelperText>
                  <RadioGroup
                    aria-label="type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="flat"
                      control={<Radio />}
                      label="Flat"
                      disabled={editFlag}
                    />
                    <FormControlLabel
                      value="plot"
                      control={<Radio />}
                      label="Plot"
                      disabled={editFlag}
                    />
                    <FormControlLabel
                      value="new"
                      control={<Radio />}
                      label="Own Venture"
                      disabled={editFlag}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="form-inputs">
                <TextField
                  required
                  fullWidth
                  id="filled-required"
                  label="Location"
                  variant="filled"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  error={errors.location ? true : false}
                  helperText={errors.location}
                />
              </div>
              <div className="form-inputs">
                <TextField
                  required
                  fullWidth
                  id="filled-required"
                  label="Price Range"
                  variant="filled"
                  name="price_range"
                  value={form.price_range}
                  onChange={handleChange}
                  error={errors.price_range ? true : false}
                  helperText={errors.price_range}
                />
              </div>
              <div className="form-inputs">
                <TextField
                  required
                  fullWidth
                  id="filled-required"
                  label="Area"
                  variant="filled"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  error={errors.area ? true : false}
                  helperText={errors.area}
                />
              </div>
              <div className="form-inputs">
                <TextField
                  fullWidth
                  id="filled-required"
                  label="Tags"
                  variant="filled"
                  name="tags"
                  value={tags}
                  onChange={handleTags}
                  onKeyPress={handleTagKeyPress}
                  error={errors.tags ? true : false}
                  helperText={errors.tags}
                />
              </div>
              <div className="form-tags">
                {form.tags.map((tag, index) => (
                  <div key={index} className="tags">
                    <Tags
                      key={index}
                      Title={tag}
                      enableDelete={true}
                      handleDelete={handleDeleteTagIcon}
                      tag_id={index}
                    />
                  </div>
                ))}
              </div>
              <div className="form-inputs">
                <TextField
                  fullWidth
                  id="filled-required"
                  label="Services"
                  variant="filled"
                  name="services"
                  value={services}
                  onChange={handleServices}
                  onKeyPress={handleServiceKeyPress}
                  error={errors.services ? true : false}
                  helperText={errors.services}
                />
              </div>
              <div className="form-tags">
                {form.services.map((service, index) => (
                  <div key={index} className="tags">
                    <AvailableService
                      key={index}
                      service={service}
                      correct={service}
                      enableDelete={true}
                      handleDelete={handleDeleteServiceIcon}
                      service_id={index}
                    />
                  </div>
                ))}
              </div>
              <div className="form-inputs">
                <TextField
                  required
                  fullWidth
                  id="filled-required"
                  label="Description"
                  variant="filled"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  error={errors.description ? true : false}
                  helperText={errors.description}
                />
              </div>
              <div className="form-inputs">
                <TextField
                  required
                  fullWidth
                  id="filled-required"
                  label="Map"
                  variant="filled"
                  name="map"
                  value={form.map}
                  onChange={handleChange}
                  error={errors.map ? true : false}
                  helperText={errors.map}
                />
              </div>
              <div className="form-inputs">
                <TextField
                  required
                  fullWidth
                  id="filled-required"
                  label="Video"
                  variant="filled"
                  name="video"
                  value={form.video}
                  onChange={handleChange}
                  error={errors.video ? true : false}
                  helperText={errors.video}
                />
              </div>

              {/* To Show Case  */}
              <br />
              <br />
              <br />

              <div className="form-inputs">
                <h3>To Show Case</h3>
              </div>
              <div className="form-inputs">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Showcase"
                    checked={form.showcase}
                    onChange={handleShowcaseChangeCheckbox}
                  />
                </FormGroup>
              </div>
              {form.showcase && (
                <div>
                  <div className="form-inputs">
                    <Button variant="contained" component="label">
                      Showcase Image
                      <input
                        type="file"
                        hidden
                        multiple={false}
                        onChange={handleShowcaseImages}
                      />
                    </Button>
                    <FormHelperText
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "10px",
                      }}
                    >
                      {errors.showcaseImage ? errors.showcaseImage : ""}
                    </FormHelperText>
                  </div>
                  <div className="preview-image">
                    {showcasePreViewImage.map((image, index) => (
                      <div key={index} className="form-inputs">
                        <div key={index} className="image-box">
                          <img src={image} alt="showcase" className="preview" />
                          <div>
                            <CancelIcon
                              color="error"
                              fontSize="medium"
                              className="image-del"
                              onClick={() =>
                                handleDeleteImage(index, "showcaseImage")
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="form-inputs">
                    {editFlag && form.showcaseImage !== undefined && (
                      <div className="preview-image">
                        {form.showcaseImage.length > 0 ? (
                          form.showcaseImage.map((image, index) => {
                            return (
                              <div key={index} className="image-box">
                                <img
                                  src={image.url}
                                  alt={image.name}
                                  className="preview"
                                />
                                <div>
                                  <CancelIcon
                                    color="primary"
                                    fontSize="medium"
                                    className="image-del"
                                    onClick={() =>
                                      handleCloudImage(image, "showcaseImage")
                                    }
                                  />
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="no-image">No Cloud Image</div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="form-inputs">
                    <TextField
                      required
                      fullWidth
                      id="filled-required"
                      label="Showcase Title"
                      variant="filled"
                      name="showcaseTitle"
                      value={form.showcaseTitle}
                      onChange={handleChange}
                      error={errors.showcaseTitle ? true : false}
                      helperText={errors.showcaseTitle}
                    />
                  </div>
                  <div className="form-inputs">
                    <TextField
                      required
                      fullWidth
                      id="filled-required"
                      label="Showcase Sub - Text"
                      variant="filled"
                      name="showcaseSubTitle"
                      value={form.showcaseSubTitle}
                      onChange={handleChange}
                      error={errors.showcaseSubTitle ? true : false}
                      helperText={errors.showcaseSubTitle}
                    />
                  </div>
                </div>
              )}

              <br />
              <br />
              <br />

              <div className="form-inputs">
                <h3> Upload Images </h3>
              </div>
              <div className="form-inputs">
                <Button variant="contained" component="label">
                  Upload File
                  <input type="file" hidden multiple onChange={handleImages} />
                </Button>
                <FormHelperText
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "10px",
                  }}
                >
                  {errors.images ? errors.images : ""}
                </FormHelperText>
                {
                  <div className="preview-image">
                    {images.length > 0 ? (
                      preViewImage.map((image, index) => {
                        return (
                          <div key={index} className="image-box">
                            <img
                              src={image}
                              alt="preview"
                              className="preview"
                            />
                            <div>
                              <CancelIcon
                                color="error"
                                fontSize="medium"
                                className="image-del"
                                onClick={() =>
                                  handleDeleteImage(index, "images")
                                }
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="no-image">No New Image</div>
                    )}
                  </div>
                }
                {editFlag && form.images !== undefined && (
                  <div className="preview-image">
                    {form.images.length > 0 ? (
                      form.images.map((image, index) => {
                        return (
                          <div key={index} className="image-box">
                            <img
                              src={image.url}
                              alt={image.name}
                              className="preview"
                            />
                            <div>
                              <CancelIcon
                                color="primary"
                                fontSize="medium"
                                className="image-del"
                                onClick={() =>
                                  handleCloudImage(image, "images")
                                }
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="no-image">No Cloud Image</div>
                    )}
                  </div>
                )}
              </div>
              {!editFlag && (
                <div className="form-inputs ">
                  <Button
                    variant="contained"
                    color="success"
                    className="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              )}
              {editFlag && (
                <div className="form-inputs ">
                  <Button
                    variant="contained"
                    color="primary"
                    className="submit"
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                </div>
              )}
            </div>
          </Box>
        </div>
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </div>
    </div>
  );
};

export default FormFile;
