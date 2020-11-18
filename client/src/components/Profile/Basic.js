import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Profile.css";
import { Link } from "react-router-dom";
import { fileUpload } from "../../services/singleFileUpload";
import { multiFileUpload } from "../../services/multiFileUpload";
import { basicInfo } from "../../services/basicInfo";
import { basicInfoGet } from "../../services/basicInfo";
import SearchBar from "../Timline/SearchBar";
const jwt = require("jsonwebtoken");

class Basic extends Component {
  state = {
    contact: "block",
    contactForm: "none",

    basicInfo: "block",
    basicInfoForm: "none",
    files: [],
    languages: [],
    language: "",
    bio: "",
    indexOfLanguage: null,
    selectedFile: null,
    selectedVideo: null,
    userId: "",
    userImages: [],
    firstImage: "",
    columnLength: "4",
    firstName: "",
    lastName: "",
    gender: "",
    loading: false,
    errorMessage: "",
    showError: false,
    getBio: "",
  };

  async componentDidMount() {
    await this.deCodeId();
    this.getData();
  }

  getData = async () => {
    let userId = { userId: this.state.userId };

    let { data } = await basicInfoGet(userId);

    if (data.length > 0) {
      let firstName = data[0].firstName;
      let lastName = data[0].lastName;
      let userArray = data[0].User;

      let gender = data[0].gender;

      await this.setState({
        userImages: userArray.userImages,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        getBio: userArray.bio,
      });

      await this.setState({ languages: userArray.languages });
      if (this.state.userImages) {
        let image = this.state.userImages[0].imageUrl;
        this.setState({ firstImage: image });
      }
    }
  };

  deCodeId = async () => {
    let token = localStorage.getItem("token");

    const header = await jwt.decode(token);
    await this.setState({ userId: header._id });
  };

  handelContact = () => {
    this.setState({ contact: "none", contactForm: "block" });
  };
  handelContactForm = () => {
    this.setState({ contact: "block", contactForm: "none" });
  };
  handleBasicInfo = () => {
    this.setState({
      basicInfo: "none",
      basicInfoForm: "block",
      columnLength: "9",
    });
  };
  handleBasicInfoForm = async () => {
    this.setState({ errorMessage: "", showError: false });

    if (this.state.languages.length < 1) {
      this.setState({ errorMessage: "Add Languages", showError: true });
    } else if (this.state.selectedFile == null) {
      this.setState({ errorMessage: "Select Passport Image", showError: true });
    } else if (this.state.files.length < 3) {
      this.setState({
        errorMessage: "Select Three User Images ",
        showError: true,
      });
    } else if (this.state.bio.length < 1) {
      this.setState({
        errorMessage: "Enter Your Bio ",
        showError: true,
      });
    } else if (this.state.selectedVideo == null) {
      this.setState({
        errorMessage: "Selct 5 second Video ",
        showError: true,
      });
    } else {
      this.setState({ loading: true });
      const fd = new FormData();
      await fd.append(
        "images",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      let pasport = await fileUpload(fd);

      // video upload section
      const fdVideo = new FormData();
      await fdVideo.append(
        "images",
        this.state.selectedVideo,
        this.state.selectedVideo.name
      );
      let video = await fileUpload(fdVideo);

      // profile images upload section
      const fdm = new FormData();
      for (var x = 0; x < this.state.files.length; x++) {
        fdm.append("images", this.state.files[x]);
      }

      let profileImages = await multiFileUpload(fdm);

      let data = {
        userId: this.state.userId,
        languages: this.state.languages,
        pasport: pasport.data,
        userImages: profileImages.data,
        video: video.data,
        bio: this.state.bio,
      };

      await basicInfo(data);

      this.setState({ files: [] });
      this.forceUpdate();
      this.fileInput.value = "";
      this.fileVideoInput.value = "";
      this.setState({
        basicInfo: "block",
        basicInfoForm: "none",
        columnLength: "4",
        bio: "",
      });
    }
  };
  handleChange = (files) => {
    this.setState({
      files: files,
    });
  };
  handelLanguageChange = (e) => {
    this.setState({ language: e.target.value });
  };

  handelBioChange = (e) => {
    this.setState({ bio: e.target.value });
  };

  handelChosen = async (event) => {
    await this.setState({ selectedFile: event.target.files[0] });
  };
  handelVideoChosen = async (event) => {
    await this.setState({ selectedVideo: event.target.files[0] });
  };

  addLanguage = (e) => {
    let { language, languages } = this.state;
    if (e.key === "Enter") {
      if (language.length > 0) {
        languages.push(language);
        this.setState({ language: "" });
      }
    }
  };
  handelIcon = async (index) => {
    let { language, languages, indexOfLanguage } = this.state;

    await languages.splice(index, 1);
    this.forceUpdate();
  };
  handelLanguageDelete = async (e) => {
    let { language, languages, indexOfLanguage } = this.state;

    let index = e.target.value;

    await languages.splice(index, 1);
    this.forceUpdate();
  };

  showErrorMessage = () => {
    if (this.state.showError) {
      return (
        <div className="alert alert-danger" role="alert">
          {this.state.errorMessage}
        </div>
      );
    }
  };

  render() {
    let {
      contact,
      contactForm,
      basicInfo,
      basicInfoForm,
      languages,
      language,
      firstName,
      lastName,
      gender,
      bio,
      getBio,
    } = this.state;
    let contactStyle = {
      display: contact,
    };
    let contactFormStyle = {
      display: contactForm,
      marginBottom: "70px",
    };
    let basicInfoStyle = {
      display: basicInfo,
    };
    let basicInfoStyleForm = {
      display: basicInfoForm,
    };
    return (
      <React.Fragment>
        <div style={{ background: "#100C08", width: "100vw", height: "100%" }}>
          {/* <SearchAppBar /> */}
          <SearchBar/>
          <div
            className="container"
            style={{
              marginTop: "0",
              background: "#100C08",
              padding: "20px",
              height: "100vh",
              width: "100vw",
              overflow: "auto",
            }}
          >
            <div className="row">
              <div
                className="col-md-12 "
                style={{ display: "flex", justifyContent: "center" }}
              >
                <h1 style={{ color: "#550505" }}>About Section</h1>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-3  " style={{ textAlign: "center" }}>
                <div className="sidenav">
                  <Link
                    to="/basicinfo"
                    style={{ marginTop: "5px" }}
                    className="active"
                  >
                    Basic Info
                  </Link>

                  <Link to="/contact" style={{ marginTop: "5px" }}>
                    Contact
                  </Link>

                  <Link to="/place" style={{ marginTop: "5px" }}>
                    Place
                  </Link>
                  <Link to="/work" style={{ marginTop: "5px" }}>
                    Work and Education
                  </Link>
                  <Link to="/hobies" style={{ marginTop: "5px" }}>
                    Hobies
                  </Link>
                  <Link to="/covid" style={{ marginTop: "5px" }}>
                    Covid Question
                  </Link>
                  <Link
                    to="/setting"
                    style={{ marginTop: "5px" }}
                    
                  >
                    Setting
                  </Link>
                  <Link to="/payment" style={{ marginTop: "5px" }}>
                  Payment
                </Link>
                </div>
              </div>
              <div
                className={`profile col-md-${this.state.columnLength}`}
                style={{ padding: "25px", color: "white" }}
              >
                {/* Work Section */}

                <h3>Basic Info</h3>
                <div style={basicInfoStyle}>
                  <span onClick={this.handleBasicInfo}>Add Basic Info</span>

                  <h4 className="mt-2 mb-4">{`${firstName} ${lastName}`}</h4>
                  <p className="mt-2 mb-4">{getBio}</p>

                  <h5 className="mt-2">{gender}</h5>
                  <h6 style={{ marginTop: "-3px", fontSize: "12px" }}>
                    Gender
                  </h6>

                  <h5 className="mt-4">
                    {this.state.languages.length
                      ? this.state.languages.map((item, index) => {
                          return `${item}    `;
                        })
                      : null}
                  </h5>
                  <h6 style={{ marginTop: "-3px", fontSize: "12px" }}>
                    Languages
                  </h6>
                </div>

                {/* Here is profile Form */}

                <div className="profileForm" style={basicInfoStyleForm}>
                  {this.showErrorMessage()}

                  <div
                    style={this.state.loading ? loadingStyle : unLoadingStyle}
                  >
                    <CircularProgress color="inherit" />
                  </div>

                  {languages.map((item, index) => {
                    return (
                      <button
                        className="btn btn-outline-secondary ml-2 mt-2 languageButton"
                        value={index}
                        key={index}
                      >
                        {item}
                        <DeleteForeverIcon
                          className="deleteIcon"
                          value={index}
                          onClick={() => {
                            this.handelIcon(index);
                          }}
                        />
                      </button>
                    );
                  })}
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="language"
                    value={language}
                    placeholder="Enter Your Language and Press Enter"
                    onChange={this.handelLanguageChange}
                    onKeyDown={this.addLanguage}
                  />
                  <textarea
                    type="text"
                    className="form-control mt-3"
                    name="bio"
                    rows="4"
                    placeholder="Enter Your Bio"
                    onChange={this.handelBioChange}
                    value={bio}
                  />

                  <label htmlFor="pasport" className="mt-3">
                    Attach Passport
                  </label>
                  <input
                    type="file"
                    className="form-control mt-1"
                    name="pasport"
                    id="pasport"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={this.handelChosen}
                    ref={(ref) => (this.fileInput = ref)}
                  />
                  <br />
                  <label htmlFor="video" className="mt-3">
                    Attach 3 Second Video
                  </label>
                  <input
                    type="file"
                    className="form-control mt-1"
                    name="video"
                    accept="video/mp4,video/x-m4v,video/*"
                    onChange={this.handelVideoChosen}
                    ref={(ref) => (this.fileVideoInput = ref)}
                  />
                  <br />

                  <DropzoneArea
                    onChange={this.handleChange}
                    style={{ width: "100vw", marginTop: "1000px" }}
                  >
                    <div className="dz-message" data-dz-message>
                      <span>Your Custom Message</span>
                    </div>
                  </DropzoneArea>
                  <button
                    type="button"
                    className="btn btn-success mt-3"
                    style={{ float: "right" }}
                    onClick={this.handleBasicInfoForm}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="col-md-4" style={basicInfoStyle}>
                <img src={this.state.firstImage} id="profileImage" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Basic;

const loadingStyle = {
  zIndex: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.8)",
  width: "100vw",
  height: "100vh",
  position: "absolute",
  top: "0",
  left: "0",
};

const unLoadingStyle = {
  zIndex: -50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.8)",
  width: "100vw",
  height: "100vh",
  position: "absolute",
  top: "0",
  left: "0",
};
