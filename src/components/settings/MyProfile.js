import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { isValidPhoneNumber } from "libphonenumber-js";
import Header from "../Header";
import Sidebar from "../Sidebar";
// import { HiPencil } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdError } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
function MyProfile() {
  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");
  const userData = JSON.parse(localStorage.getItem("user_data"));

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    username: "",
    country: "",
  });
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const [image, setImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user-profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileImageUrl(response.data.image_url);
        localStorage.setItem("profile_image", response.data.image_url);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserProfileImage();
  }, []);

  useEffect(() => {
    setUser(userData);
  }, [userData?.id]);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleUploadImageSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("profile_picture", image);
    // You can send the formData to the server using an AJAX request here
    const token = localStorage.getItem("access_token"); // Get the access token from the local storage
    const headers = {
      Authorization: `Bearer ${token}`,
    }; // Add the token to the headers

    fetch("http://localhost:8000/api/user-profile/", {
      method: "POST",
      headers,
      body: formData,
    })
      .then((response) => {
        console.log(response);
        setLoading(false);
        setUploadImageModal(false);
        fetchUserProfileImage();
        toast.success("Your profile image is uploaded successfully!", {
          autoClose: 1000,
        });
        // Handle the response
      })
      .catch((error) => {
        console.error(error);
        console.log(headers);
        // Handle the error
      });

    const fetchUserProfileImage = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user-profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileImageUrl(response.data.image_url);
        localStorage.setItem("profile_image", response.data.image_url);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
  };

  const emailRef = useRef(null);
  const fisrtNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const userNameRef = useRef(null);
  const phoneNoRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneNumberChange = (e) => {
    e.preventDefault();

    const isValidNumber = isValidPhoneNumber(e.target.value, user?.country);

    !isValidNumber
      ? setPhoneError(
          "Number is not valid. (N.B: Use the country code extenstion +880 etc.)"
        )
      : setPhoneError("");
  };

  const getUpdatedData = () => {
    const data = {};
    if (emailRef.current.value.length > 0) data.email = emailRef.current.value;
    if (fisrtNameRef.current.value.length > 0)
      data.first_name = fisrtNameRef.current.value;
    if (lastNameRef.current.value.length > 0)
      data.last_name = lastNameRef.current.value;
    if (userNameRef.current.value.length > 0)
      data.username = userNameRef.current.value;
    if (phoneNoRef.current.value.length > 0)
      data.phone = phoneNoRef.current.value;
    return data;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (phoneError) return;
    setLoading(true);

    try {
      const data = getUpdatedData();

      await axios.put(
        `http://localhost:8000/api/users/${userId}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("user_data", JSON.stringify(data));

      setUser(data);

      toast.success("Your profile is updated successfully!", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="settings px-4 py-3">
        <div className="d-flex justify-content-between gap-4">
          <div className="w-25" style={{ background: "#ffffff" }}>
            <Sidebar defaultActiveKey="/settings/myProfile" />
          </div>
          <div className="w-75">
            <div
              className="d-flex justify-content-between align-items-start px-2 py-3"
              style={{ background: "#f8f8f9" }}
            >
              <p className="settings-title">My Profile</p>
            </div>
            <div
              className="settings-leftDescription px-4 py-4 rounded accounts-tabs"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="px-2 py-3" style={{ position: "relative" }}>
                <p className="settings-title" style={{ fontSize: "1.25rem" }}>
                  My profile details
                </p>
                <Form className="w-75">
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      overflow: "hidden",
                      borderRadius: "50%",
                      border: "1px solid #c4cacf",
                      position: "relative",
                    }}
                    className="mb-3"
                  >
                    <img
                      src={`${profileImageUrl}`}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "22%",
                      left: "12%",
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        color: "none",
                      }}
                      onClick={() => {
                        setUploadImageModal(true);
                      }}
                    >
                      <TbEdit className="text-black" size={24} />
                    </Button>
                  </div>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="d-flex justify-content-start align-items-start fw-bold">
                      <span>Email</span>
                      <span
                        className="text-danger lh-base"
                        style={{ fontSize: ".6rem" }}
                      >
                        &#10038;
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email address"
                      autoFocus
                      ref={emailRef}
                      defaultValue={user?.email}
                      disabled
                      title="You can not change your email address"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="d-flex justify-content-start align-items-start fw-bold">
                      <span>First name</span>
                      <span
                        className="text-danger lh-base"
                        style={{ fontSize: ".6rem" }}
                      >
                        &#10038;
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      autoFocus
                      ref={fisrtNameRef}
                      defaultValue={user?.first_name}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="d-flex justify-content-start align-items-start fw-bold">
                      <span>Last name</span>
                      <span
                        className="text-danger lh-base"
                        style={{ fontSize: ".6rem" }}
                      >
                        &#10038;
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      autoFocus
                      ref={lastNameRef}
                      defaultValue={user?.last_name}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="d-flex justify-content-start align-items-start fw-bold">
                      <span>Username</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      autoFocus
                      ref={userNameRef}
                      defaultValue={user?.username}
                      disabled
                      title="You can not change your username"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="d-flex justify-content-start align-items-start fw-bold">
                      <span>Phone number</span>
                      <span
                        className="text-danger lh-base"
                        style={{ fontSize: ".6rem" }}
                      >
                        &#10038;
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      ref={phoneNoRef}
                      defaultValue={user?.phone}
                      onChange={(e) => handlePhoneNumberChange(e)}
                    />
                  </Form.Group>
                  {phoneError && (
                    <div
                      className="error-message"
                      style={{
                        // padding: "5px",
                        color: "crimson",
                      }}
                    >
                      {phoneError}
                    </div>
                  )}
                  <div className="d-flex justify-content-start gap-4 py-4">
                    <Button
                      variant="secondary"
                      className=" px-5 py-2 w-25 bg-white btn-close text-dark border border-primary-subtle"
                      as={Link}
                      to="/settings/cloudAccounts"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      className=" px-5 py-2 w-25 text-nowrap"
                      onClick={submit}
                    >
                      Update profile
                    </Button>
                  </div>
                </Form>
                {loading && (
                  <div
                    className="loader-container"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "40%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                    }}
                  >
                    <div className="loader"></div>
                    <div className="px-2">Updating Profile</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={uploadImageModal}
        onHide={() => setUploadImageModal(false)}
        backdrop="static"
        keyboard={false}
        size={"lg"}
        centered
      >
        <Modal.Header className="modal-header p-4">
          <Modal.Title>Upload Profile Image</Modal.Title>
          <AiFillCloseCircle onClick={() => setUploadImageModal(false)} />
        </Modal.Header>
        <Modal.Body className="p-4 pb-3">
          <div className="">
            <Form onSubmit={handleUploadImageSubmit}>
              <Form.Group controlId="formFile">
                <Form.Label>Upload an image:</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Upload
              </Button>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between p-4 pt-0"></Modal.Footer>
      </Modal>
    </>
  );
}

export default MyProfile;
