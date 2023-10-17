import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./SignIn";
import WelcomeSlider from "./WelcomeSlider";

import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
} from "libphonenumber-js";

function SignInSignUp() {
  const [activeTab, setActiveTab] = useState("signin");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // country phone code working
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

  const countryOptions = getCountries()
    .sort((a, b) => a.localeCompare(b))
    .map((c) => (
      <option key={c} value={c}>
        {c} ({getCountryCallingCode(c)})
      </option>
    ));

  const handlePhoneNumberChange = (e) => {
    e.preventDefault();

    const isValidNumber = isValidPhoneNumber(e.target.value, country);

    !isValidNumber ? setPhoneError("Number is not valid") : setPhoneError("");

    setPhone(e.target.value);
  };

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (phoneError === "Number is not valid") return;
    if (password !== confirmPassword) return;
    setLoading(true);
    setEmailError("");
    setUsernameError("");
    setPhoneError("");

    try {
      await axios.post("https://cloudpoint.brainstation-23.com/api/register/", {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email,
        password,
        country,
        phone: `${phoneCode}${phone}`,
      });

      toast.success("Your account is created successfully!", {
        autoClose: 1000,
      });

      setActiveTab("signin");
    } catch (err) {
      if (err.response.status === 400) {
        const { email, username, phone } = err.response.data;
        if (email && username && phone) {
          setEmailError(`${email}`);
          setUsernameError(`${username}`);
          setPhoneError(`${phone}`);
        } else if (email) {
          setEmailError(`${email}`);
        } else if (username) {
          setUsernameError(`${username}`);
        } else if (phone) {
          setPhoneError(`${phone}`);
        }
      }

      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);

    // Get the phone number code for the selected country
    const phoneNumberCode = getCountryCallingCode(selectedCountry);

    setPhoneCode(`+${phoneNumberCode}`);
  };

  return (
    <div className="d-flex app-auth">
      <ToastContainer />
      <div className="form-left col-12 col-lg-6">
        <div>
          <img src="/cloud_23_logo.png" className="form-left-logo" alt="" />
        </div>
        <div className="form-left-container">
          <Tabs
            id="controlled-tab-example"
            activeKey={activeTab}
            onSelect={handleSelect}
          >
            <Tab eventKey="signin" title="Sign In">
              <SignIn></SignIn>
            </Tab>

            {/* sign up */}
            <Tab eventKey="signup" title="Sign Up">
              <div className="form-left-description mt-3">
                <h4 className="fw-bold">Sign Up</h4>
                <small className="text-muted">Enter your details below</small>
              </div>

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
                  {emailError && (
                    <div
                      className="error-message"
                      style={{ padding: "5px", marginTop: "5px" }}
                    >
                      <MdError />
                      {emailError}
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label className="fw-bold">
                    Username <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    placeholder="Username"
                    required
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {usernameError && (
                    <div
                      className="error-message"
                      style={{ padding: "5px", marginTop: "5px" }}
                    >
                      <MdError />
                      {usernameError}
                    </div>
                  )}
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                      <Form.Label className="fw-bold">
                        First Name <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder="First Name"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="ps-4">
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                      <Form.Label className="fw-bold">
                        Last Name <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder="Last Name"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={4}>
                    <Form.Group className="mb-3" controlId="formBasicCountry">
                      <Form.Label className="fw-bold">
                        Country <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        placeholder="Country"
                        required
                        value={selectedCountry}
                        onChange={(e) => {
                          handleCountryChange(e);
                          setCountry(e.target.value);
                        }}
                      >
                        <option value="">Select a country</option>
                        {countryOptions}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={8} className="ps-4">
                    <div className="mb-3">
                      <label
                        htmlFor="formBasicPhoneNumber"
                        className="form-label fw-bold"
                      >
                        Phone Number <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          {selectedCountry ? phoneCode : "+880"}
                        </span>
                        <input
                          type="tel"
                          className="form-control"
                          id="formBasicPhoneNumber"
                          placeholder="Phone Number"
                          required
                          value={phone}
                          maxLength={15}
                          onChange={(e) => handlePhoneNumberChange(e)}
                          disabled={!selectedCountry}
                        />
                      </div>
                      {phoneError && (
                        <div
                          className="error-message"
                          style={{ padding: "5px", marginTop: "5px" }}
                        >
                          <MdError />
                          {phoneError}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className="fw-bold">
                        Password <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          required
                          autoComplete="on"
                          onChange={(e) => setPassword(e.target.value)}
                          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$"
                          title="Password must be between 8-32 characters and contain at least one letter and one number"
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
                      {password &&
                        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/.test(
                          password
                        ) && (
                          <div
                            className="error-message"
                            style={{ padding: "5px", marginTop: "5px" }}
                          >
                            Password must be between 8-32 characters and contain
                            at least one letter and one number.
                          </div>
                        )}
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group
                      className="mb-3 ps-4"
                      controlId="formBasicPassword"
                    >
                      <Form.Label className="fw-bold">
                        Confirm Password <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Password"
                          required
                          autoComplete="on"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text password-toggle"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                      </div>
                      {password !== confirmPassword && (
                        <div
                          className="error-message"
                          style={{ padding: "5px", marginTop: "5px" }}
                        >
                          Passwords do not match.
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <div>
                  {loading ? (
                    <Button
                      variant="primary"
                      type="submit"
                      className="form-button m-0"
                      disabled
                    >
                      <div className="loader-container">
                        <div className="loader"></div>
                        <div className="mx-2">Creating account</div>
                      </div>
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      type="submit"
                      className="form-button m-0"
                    >
                      Create account
                    </Button>
                  )}
                </div>

                {/* <Row>
                  <Col xs={12} className="d-flex flex-row form-social-button gap-4 ">
                    <Button className=" d-flex align-items-center justify-content-center w-50">
                      <span>
                        <FcGoogle size={20} className="form-social-button__icon text-nowrap" />
                      </span>

                      Sign up with Google
                    </Button>
                    <Button className="d-flex align-items-center justify-content-center w-50">
                      <span>
                        <FaFacebook size={20} className="form-social-button__icon " color="#1a77f2" />
                      </span>
                      Sign up with Facebook
                    </Button>
                  </Col>
                </Row> */}
                {/* <div className="d-flex justify-content-center pt-3 ">
                  <p className="text-muted ">
                  Already have an account?
                    <a
                      href="#"
                      className=" px-2 text-decoration-none text-dark fw-bold"
                    >
                      Sign In
                    </a>
                  </p>
                </div> */}
              </Form>
            </Tab>
          </Tabs>
        </div>
      </div>
      <WelcomeSlider />
    </div>
  );
}

export default SignInSignUp;
