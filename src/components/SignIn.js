import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";

const SignIn = () => {
  const token = localStorage.getItem("access_token");

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (event) => {
    event.preventDefault();
    setLoading(true);
    setEmailError(null);
    setPasswordError(null);

    const response = await axios
      .post(
        "http://localhost:8000/api/token/",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .catch((error) => {
        if(error.response){
        if (error.response.status === 400)
          setEmailError("Invalid email address");
        else if (error.response.status === 401)
          setPasswordError("Password is invalid");
        else {
          console.error("Unexpected server error:", error);
        }
        setLoading(false);
        console.log(error);
      }});

    
        const token = response.data.access;
  
     
    // const profileImageResponse = await axios.get(
    //   "http://localhost:8000/api/user-profile/",
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    localStorage.setItem("profile_image", "1.jpg");

    const decodedToken = jwt_decode(token);
    const userId = decodedToken.user_id;

    localStorage.setItem("access_token", token);
    localStorage.setItem("user_id", userId);

    fetchUser(userId, token);
  };

  const fetchUser = async (userId, token) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/" + userId + "/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("user_data", JSON.stringify(response.data));

      setRedirect(true);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <div className="form-left-description mt-3 mb-3">
        <h4 className="fw-bold">Sign In</h4>
        <small className="text-muted">Enter your details below</small>
      </div>
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">
            E-mail
            <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          {emailError && (
            <div className="text-danger bg-danger bg-gradient bg-opacity-25 fw-semibold w-100 rounded p-2 mt-3">
              {emailError}{" "}
            </div>
          )}{" "}
        </Form.Group>

        {/*Password toggle option*/}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="fw-bold">
            Password <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <div className="input-group">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
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
          {passwordError && (
            <div className="text-danger bg-danger bg-gradient bg-opacity-25 fw-semibold w-100 rounded p-2 mt-3">
              {passwordError}
            </div>
          )}
        </Form.Group>
        {loading ? (
          <Button variant="primary" className="form-button m-0" disabled>
            <div className="loader-container">
              <div className="loader"></div>
              <div className="mx-2">Logging in</div>
            </div>
          </Button>
        ) : (
          <Button variant="primary" type="submit" className="form-button m-0">
            Log In
          </Button>
        )}
      </Form>
      <div className="form-forgot-password">
        <Link to="/forgotpass">Forgot Password?</Link>
      </div>
      {/*TODO: Need to include Google & Facebook signup */}
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
      </Row> */}{" "}
    </>
  );
};

export default SignIn;
