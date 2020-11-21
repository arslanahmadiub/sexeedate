import React, { Component } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { covidPost } from "../../services/covid";
import { covidGet } from "../../services/covid";
import { deCodeId } from "../../services/userId";
import SearchBar from "../Timline/SearchBar";
import Alert from "react-bootstrap/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

class Covid extends Component {
  state = {
    covid: "block",
    covidFrom: "none",
    loading: false,
    alertShow: false,
    questionData: {
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
    },
  };

  componentDidMount() {
    this.fetchCovidData();
  }

  handelCovid = () => {
    this.setState({ covid: "none", covidFrom: "block" });
  };
  handelCovidForm = async () => {
    let {
      question1,
      question2,
      question3,
      question4,
      question5,
    } = this.state.questionData;

    if (
      question1.length < 1 ||
      question2.length < 1 ||
      question3.length < 1 ||
      question4.length < 1 ||
      question5.length < 1
    ) {
      this.setState({ alertShow: true });
    } else {
      this.setState({ alertShow: false, loading: true });
      await this.postCovidData();
      this.setState({ covid: "block", covidFrom: "none" });
      this.setState({ loading: false });
    }
  };

  fetchCovidData = async () => {
    let id = await deCodeId();
    let userId = {
      userId: id,
    };
    let { data } = await covidGet(userId);

    if (data) {
      let { question1, question2, question3, question4, question5 } = data;
      let resultData = {
        question1,
        question2,
        question3,
        question4,
        question5,
      };
      await this.setState({ questionData: resultData });
    }
  };

  handleQuestionChange = async (e) => {
    let { questionData } = this.state;
    let currentState = questionData;
    let { name, value } = e.target;
    currentState[name] = value;
    await this.setState({ questionData: currentState });
  };

  postCovidData = async () => {
    const {
      question1,
      question2,
      question3,
      question4,
      question5,
    } = this.state.questionData;
    let id = await deCodeId();
    let data = {
      userId: id,
      question1,
      question2,
      question3,
      question4,
      question5,
    };
    let result = await covidPost(data);
  };

  render() {
    let { covid, covidFrom } = this.state;
    let {
      question1,
      question2,
      question3,
      question4,
      question5,
    } = this.state.questionData;
    let covidStyle = {
      display: covid,
    };
    let covidFormStyle = {
      display: covidFrom,
    };

    return (
      <React.Fragment>
        <div style={{ background: "#100C08", width: "100vw", height: "100%" }}>
          {/* <SearchAppBar/> */}
          <SearchBar />
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
                  <Link to="/basicinfo" style={{ marginTop: "5px" }}>
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
                  <Link
                    to="/covid"
                    style={{ marginTop: "5px" }}
                    className="active"
                  >
                    Covid Question
                  </Link>
                  <Link to="/setting" style={{ marginTop: "5px" }}>
                    Setting
                  </Link>
                  <Link to="/payment" style={{ marginTop: "5px" }}>
                    Payment
                  </Link>
                </div>
              </div>
              <div
                className="col-md-9 profile"
                style={{ padding: "25px", color: "white" }}
              >
                <Alert show={this.state.alertShow} variant="danger">
                  <p>Fill All Fields</p>
                </Alert>
                <div style={this.state.loading ? loadingStyle : unLoadingStyle}>
                  <CircularProgress color="inherit" />
                </div>

                {/* Work Section */}
                <h3 style={{ textAlign: "center" }}>Survey About Covid 19</h3>
                <div style={covidStyle}>
                  <h4 className="mt-4" style={{ textAlign: "center" }}>
                    Answer the Following Question
                  </h4>
                  <span style={{ fontSize: "16px" }} onClick={this.handelCovid}>
                    Fill Form
                  </span>
                  <h5 className="mt-3">Q: What is your comfort level?</h5>
                  <h5 className="mt-3">{question1}</h5>
                  <h5 className="mt-3">
                    Q: Are you open to meeting in-person?
                  </h5>
                  <h5 className="mt-3">{question2}</h5>

                  <h5 className="mt-3">
                    Q: Will you want to keep social distance?
                  </h5>
                  <h5 className="mt-3">{question3}</h5>

                  <h5 className="mt-3">
                    Q: Are you OK shaking hands or hugging your date?
                  </h5>
                  <h5 className="mt-3">{question4}</h5>

                  <h5 className="mt-3">Q: If Does COVID make you nervous? </h5>
                  <h5 className="mt-3">{question5}</h5>
                </div>

                <div style={covidFormStyle}>
                  <h5 className="mt-3">Q: What is your comfort level?</h5>
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="question1"
                    value={question1}
                    placeholder="What is your comfort level?"
                    onChange={this.handleQuestionChange}
                  />
                  <h5 className="mt-3">
                    Q: Are you open to meeting in-person?
                  </h5>
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="question2"
                    value={question2}
                    placeholder=" Q: Are you open to meeting in-person?"
                    onChange={this.handleQuestionChange}
                  />
                  <h5 className="mt-3">
                    Q: Will you want to keep social distance?
                  </h5>
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="question3"
                    value={question3}
                    placeholder=" Q: Will you want to keep social distance?"
                    onChange={this.handleQuestionChange}
                  />
                  <h5 className="mt-3">
                    Q: Are you OK shaking hands or hugging your date?
                  </h5>
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="question4"
                    value={question4}
                    placeholder=" Q: Are you OK shaking hands or hugging your date?"
                    onChange={this.handleQuestionChange}
                  />
                  <h5 className="mt-3"> Q: If Does COVID make you nervous?</h5>
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="question5"
                    value={question5}
                    placeholder=" Q: If Does COVID make you nervous?"
                    onChange={this.handleQuestionChange}
                  />

                  <button
                    className="btn-hover1 color-10"
                    onClick={this.handelCovidForm}
                    style={{ float: "right" }}
                  >
                    Save
                  </button>
                </div>

                <br />
                {/* Education Section */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Covid;

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
