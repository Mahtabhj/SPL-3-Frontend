import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { Col, Container, Dropdown, Nav, Navbar, Row } from "react-bootstrap";
import { CiSettings } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  const userId = localStorage.getItem("user_id");
  const accountId = localStorage.getItem(`selected_account_${userId}`);
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const localStroageProfileImage = localStorage.getItem("profile_image");

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    setProfileImageUrl(localStroageProfileImage);
    setUser(userData);
  }, [
    localStroageProfileImage,
    userData?.id,
    userData?.first_name,
    userData?.last_name,
    userData?.email,
  ]);

  const logout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("access_token");
    localStorage.removeItem(`selected_account_${userId}`);
    localStorage.removeItem("profile_image");
    localStorage.removeItem("user_data");
  };

  return (
    <div>
      <Container fluid>
        <Row className="main-header py-2 px-2">
          <Col
            xs={2}
            className="d-flex justify-content-start align-items-center px-lg-4 px-sm-1"
          >
            <div>
              <Link to="/dashboard">
                <img
                  src="/cloud_23_logo.png"
                  className="form-left-logo"
                  alt=""
                />
              </Link>
            </div>
          </Col>

          <Col xs={5} className=" d-none d-lg-block">
            {/* <div className="search">
              <IoIosSearch className="search-icon" />
              <input
                type="text"
                className="form-control"
                placeholder="Search for resources, workload, users or anything.."
              />
            </div> */}{" "}
          </Col>

          <Col
            xs={5}
            className="d-flex justify-content-end align-items-center px-4"
          >
            {/* <div className="d-flex mr-3">
              <IoIosNotificationsOutline
                className="notification-icon"
                color="white"
              ></IoIosNotificationsOutline>
            </div> */}

            <div className="d-flex flex-row border-0">
              <Dropdown className="profile-dropdown">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <div className="d-flex cursor-pointer position-relative py-2 align-items-center">
                    <div
                      className="d-flex  p-0 mx-2 justify-content-center align-items-center"
                      style={{
                        width: "30px",
                        height: "30px",
                        overflow: "hidden",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        src={`${profileImageUrl}`}
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <p className="p-0 m-0 text-black lh-1 fst-normal text-nowrap">
                        {user?.first_name + " " + user?.last_name ||
                          "Afrin Ela"}
                      </p>
                    </div>
                    <IoIosArrowDown size={18} className="mx-1 text-black" />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="p-0 ">
                  <Row className="px-3">
                    <Row className="p-0 border-bottom">
                      <div className="d-flex rounded py-2 bg-light my-3 rounded-2">
                        <div
                          className="d-flex  p-0 mx-2 justify-content-center align-items-center"
                          style={{
                            width: "30px",
                            height: "30px",
                            overflow: "hidden",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            src={`${profileImageUrl}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              overflow: "hidden",
                            }}
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <p className=" profile-dropdown-name p-0 m-0 text-black fw-bold lh-sm fst-normal text-nowrap">
                            {user?.first_name || "Afrin"}
                            {user?.last_name || "Ela"}{" "}
                          </p>
                          <small className="profile-dropdown-email p-0 m-0 text-black lh-sm fw-normal text-nowrap">
                            {user?.email || "afrinela@brainstation23.com"}{" "}
                          </small>
                          {/* <Button className="rounded-pill py-0 profile-dropdown-button">
                            <small className="text-white">
                              admin user
                            </small>
                          </Button> */}{" "}
                        </div>
                      </div>
                    </Row>
                    <Row className="py-2 border-bottom">
                      {/* <p className="text-muted m-0">Personal Settings</p> */}

                      <Link
                        to="/settings/cloudAccounts"
                        className="d-flex align-items-center text-decoration-none text-dark d-flex profile-dropdown-link bg-light py-3 my-1 rounded-2"
                      >
                        <span className="mx-2">
                          <CiSettings size={20} />
                        </span>
                        Settings
                      </Link>
                    </Row>
                    <hr className="m-0" />
                    <Row className="py-2">
                      <Link
                        to="/"
                        className="text-decoration-none text-dark d-flex align-items-center profile-dropdown-link bg-light py-3 my-1 rounded-2"
                        onClick={logout}
                      >
                        <span className="mx-2 ">
                          <FiLogOut size={18} />{" "}
                        </span>
                        Logout
                      </Link>
                    </Row>
                  </Row>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>

        {/* Dashboard Navbar */}
        <Row>
          <Col xs={12}>
            <Navbar expand="lg" className="main-navbar px-4 ">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                id="basic-navbar-nav "
                className="justify-content-between"
              >
                <Nav className="mr-auto">
                  <div className="nav-item d-flex flex-row align-items-center">
                    <img src="/overview-nav-icon.svg" width={17} height={17} />
                    <Nav.Link
                      as={Link}
                      to="/dashboard"
                      href="#overview"
                      className="text-decoration-none fw-normal"
                    >
                      Overview
                    </Nav.Link>
                  </div>

                  {/* <div className=" nav-item d-flex align-items-center px-3">
                    <img src="/report-nav-icon.svg" width={17} height={17} />
                    <Nav.Link as={Link} to="/logs" href="#logs" className="text-decoration-none fw-normal"

                    >Logs</Nav.Link>
                    <IoIosArrowDown className="text-white" />
                  </div>

                  <div className=" nav-item d-flex align-items-center px-3">
                    <img
                      src="/recommendation-nav-icon.svg"
                      width={17}
                      height={17}
                    />
                    <Nav.Link href="#recommendation" className="fw-normal"
                   >
                      Recommendation Service
                    </Nav.Link>
                  </div> */}

                  {accountId && (
                    <div className=" nav-item d-flex align-items-center px-3">
                      <img src="/wafr-nav-icon.svg" width={17} height={17} />
                      <Nav.Link
                        as={Link}
                        to="/wafr"
                        href="#wafr"
                        className="text-decoration-none fw-normal"
                      >
                        WAFR
                      </Nav.Link>
                    </div>
                  )}
                </Nav>
                <Nav>
                  <Nav.Link href="#question">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="light"
                        id="dropdown-basic"
                        className="p-0"
                      >
                        <img
                          src="/question-nav-icon.svg"
                          width={17}
                          height={17}
                        />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-end">
                        {/* <Dropdown.Item href="#docs">
                          Go to Help Docs
                        </Dropdown.Item> */}
                        <Dropdown.Item
                          href="https://brainstation-23.com/contact/"
                          target="_blank"
                        >
                          Contact Us
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
