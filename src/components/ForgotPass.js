import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import WelcomeSlider from "./WelcomeSlider";

function ForgotPass() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    console.log("clicked");

    await axios.post(
      "http://localhost:8000/api/send-password-reset-code/",
      {
        email,
      }
    );
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to="/resetpass" />;
  }
  return (
    <div className="d-flex app-auth">
      <div className="form-left d-flex col-12 col-lg-6 flex-column ">
        <div>
          <Link to="/">
            <img src="/cloud_23_logo.png" className="form-left-logo" alt="" />
          </Link>
        </div>
        <div className="d-flex form-left-container justify-content-center align-items-center">
          <Row>
            <Col>
              <div className="form-left-description forgot-pass-description">
                <h4 className="fw-bold">Forgot your password?</h4>
                <small>
                  Enter the email address you used when you joined and we’ll
                  send you instructions to reset your password.
                  <br className="py-2" />
                  For security reasons, we do NOT store your password. So rest
                  assured that we will never send your password via email.
                </small>
              </div>
              <Form onSubmit={submit}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
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

                <Button
                  variant="primary"
                  type="submit"
                  className="form-button"
                  // onClick={() => navigate("/resetpass")}
                >
                  Reset password
                </Button>
                <div className="d-flex justify-content-center pt-3 ">
                  <Link
                    className="px-2 text-decoration-none form-link fw-bold"
                    to="/"
                  >
                    {" "}
                    Back to Sign In
                  </Link>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
      <WelcomeSlider />
    </div>
  );
}

export default ForgotPass;
