import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import SearchBar from "../Timline/SearchBar";
import StripeCheckout from "react-stripe-checkout";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { apiEndPoint } from "../../config.json";
import { useSelector } from "react-redux";

import moment from "moment";

import Dropdown from "react-bootstrap/Dropdown";
import { packageGet } from "../../services/packages";
import { proUser } from "../../services/profile";

const paymentPostUrl = apiEndPoint + "/payment";

function ProUser() {
  const [product, setProduct] = useState({
    name: "Sexee Data Subscription",
    price: 10,
    productBy: "SupremeSoftwareSolution",
  });
  const [packageData, setpackageData] = useState([]);
  const [futureMonth, setFutureMonth] = useState("");
  const currentUser = useSelector((state) => state.userId.users[0]._id);

  useEffect(() => {
    getPackages();
  }, []);

  const [subscription, setSubscription] = useState("Subscription");

  const makePayment = async (token) => {
    if (currentUser) {
      let proData = {
        userId: currentUser,
        subStatus: "Pro",
        subDate: futureMonth,
      };

      await proUser(proData);
      let body = {
        token,
        product,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      return fetch(paymentPostUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      })
        .then((response) => {
          const { status } = response;
        })
        .catch((error) => console.log(error));
    } else {
      console.log("User Not Found.");
    }
  };

  let getPackages = async () => {
    let { data } = await packageGet();
    if (data.length > 0) {
      await setpackageData(data);
    }
  };

  const handleSelect = async (e) => {
    let m = moment().format("L");
    var futureMonth = moment(m).add(e, "M").format("L");
    await setFutureMonth(futureMonth.toString());

    let result = packageData.filter((id) => id.packageDuration === e);

    setSubscription(result[0].packageName);
    setProduct({
      name: "React from FB",
      price: result[0].packagePrice,
      productBy: "facebook",
    });
  };
  return (
    <React.Fragment>
      <div style={{ background: "#100C08", width: "100vw", height: "100%" }}>
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
                <Link to="/covid" style={{ marginTop: "5px" }}>
                  Covid Question
                </Link>
                <Link to="/setting" style={{ marginTop: "5px" }}>
                  Setting
                </Link>
                <Link
                  to="/payment"
                  style={{ marginTop: "5px" }}
                  className="active"
                >
                  Payment
                </Link>
              </div>
            </div>
            <div
              className="col-md-9 profile"
              style={{ padding: "25px", color: "white" }}
            >
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle id="dropdown-basic">
                  {subscription}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {packageData.length > 0
                    ? packageData.map((item, index) => {
                        return (
                          <Dropdown.Item
                            eventKey={item.packageDuration}
                            key={index}
                          >
                            {item.packageName}
                          </Dropdown.Item>
                        );
                      })
                    : null}
                </Dropdown.Menu>
              </Dropdown>
              <br />
              <br />
              <br />
              <StripeCheckout
                stripeKey="pk_test_51HnRucEeHt0CNn6Z8WCG7BYo4RvfAUO7tS2piwzkQfj3Z8NguaTzHT2wcn9MV0D5Bz2fFrOwktwzIttbeHcsEbA300o0a9qWu0"
                token={makePayment}
                name="Get Subscription"
                amount={product.price * 100}
              >
                <Button
                  id="priceButton"
                  className={
                    subscription === "Subscription" ? "checkOutButton" : ""
                  }
                >
                  Subscription for{" "}
                  {subscription === "Subscription" ? " " : `${subscription}`}{" "}
                  {product.price} $
                </Button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProUser;
