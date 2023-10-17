import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import WelcomeSlider from "./WelcomeSlider";

function EmailSent() {
  const navigate = useNavigate();
  return (
    <div className="d-flex app-auth">
      <div className="form-left d-flex col-12 col-lg-6 flex-column">
        <div>
        <Link to="/">
          <img src="/cloud_23_logo.png" className="form-left-logo" alt="" />
          </Link>
        </div>
        <div className="form-left-container">
          <Row>
            <Col>
              <div className="form-left-description forgot-pass-description">
                <h4 className="fw-bold">Email Sent</h4>
                <small>
                  We've sent an email to
                  <strong>（mobarak@brainstation-23.com）</strong>with a link to
                  reset your password.
                </small>
              </div>
              <Form>
                <Button
                  variant="primary"
                  type="submit"
                  className="form-button"
                  onClick={() => navigate("/")}
                >
                  Back to sign in
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
      <WelcomeSlider/>
    </div>
  );
}

export default EmailSent;
