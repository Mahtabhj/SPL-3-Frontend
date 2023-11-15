import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import WelcomeSlider from "./WelcomeSlider";

function Verify() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [redirect, setRedirect] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    console.log("clicked");

    await axios.post(
      "http://54.173.112.117:8000/api/verify/",
      {
        email,
        otp,
      },
      { withCredentials: true }
    );
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="d-flex app-auth">
      <div className="form-left col-12 col-lg-6">
        <div>
          <img src="/cloud_23_logo.png" className="form-left-logo" alt="" />
        </div>
        <div className="form-left-container">
          <Form onSubmit={submit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">
                Email address <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="fw-bold">
                    Otp <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      autoComplete="on"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="form-button">
              Verify
            </Button>
          </Form>
        </div>
      </div>
      <WelcomeSlider />
    </div>
  );
}

export default Verify;
