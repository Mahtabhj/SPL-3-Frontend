import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import WelcomeSlider from "./WelcomeSlider";

const ResetPass = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsgs, setErorrMsgs] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErorrMsgs(null);
    await axios
      .post("http://localhost:8000/api/password-reset/", {
        password,
        code,
      })
      .then(() => {
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
        setErorrMsgs("OTP is invalid");
      });
    setLoading(false);
  };
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="d-flex app-auth">
      <div className="form-left d-flex col-12 col-lg-6 flex-column">
        <div>
          <Link to="/">
            <img src="/cloud_23_logo.png" className="form-left-logo" alt="" />
          </Link>
        </div>
        <div className="form-left-container">
          <Form onSubmit={submit}>
            <div className="form-left-description forgot-pass-description">
              <h4 className="fw-bold">Reset your password</h4>
              <small>Please enter your new password</small>
            </div>
            {errorMsgs && (
              <div className="text-danger bg-danger bg-gradient bg-opacity-25 fw-semibold w-100 rounded p-2 mt-3">
                {errorMsgs}{" "}
              </div>
            )}
            <Row>
              <Col>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label className="fw-bold">OTP</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="insert your otp"
                    required
                    onChange={(e) => setCode(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  controlId="formBasicPasswordConfirm"
                  className="mb-3"
                >
                  <Form.Label className="fw-bold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <small className="text-muted">
                  The password must be between 6-15 characters long.
                </small>
              </Col>
            </Row>
            {loading ? (
              <Button variant="primary" className="form-button m-0" disabled>
                <div className="loader-container">
                  <div className="loader"></div>
                  <div className="mx-2">Reseting password</div>
                </div>
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                className="form-button"
                //     onClick={() => navigate("/emailsent")}
              >
                Reset password
              </Button>
            )}
            <div className="d-flex justify-content-center pt-3 ">
              <Link className=" px-2 text-decoration-none text-dark" to="/">
                {" "}
                Back to Sign In
              </Link>
            </div>
          </Form>
        </div>
      </div>

      <WelcomeSlider />
    </div>
  );
};

export default ResetPass;
