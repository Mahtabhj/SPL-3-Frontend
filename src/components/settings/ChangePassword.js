import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { ToastContainer, toast } from "react-toastify";

function ChangePassword() {
  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) return;

    setLoading(true);

    try {
      await axios.put(
        "http://54.173.112.117:8000/api/change-password/",
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Password updated successfully!", {
        autoClose: 1000,
      });

      setTimeout(() => {
        setRedirect(true);
      }, 1000);

      localStorage.removeItem("user_id");
      localStorage.removeItem("access_token");
      localStorage.removeItem(`selected_account_${userId}`);
      localStorage.removeItem("profile_image");
      localStorage.removeItem("user_data");
    } catch (err) {
      if (err.response.status === 400)
        toast.error("Wrong password!", { autoClose: 1000 });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (redirect || !token) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Header />
      <div className="settings px-4 py-3">
        <ToastContainer />
        <div className="d-flex justify-content-between gap-4">
          <div className="w-25" style={{ background: "#ffffff" }}>
            <Sidebar defaultActiveKey="/settings/changePassword" />
          </div>
          <div className="w-75">
            <div
              className="d-flex justify-content-between align-items-start px-2 py-3"
              style={{ background: "#f8f8f9" }}
            >
              <p className="settings-title">Change Password</p>
            </div>
            <div
              className="settings-leftDescription px-4 py-4 rounded accounts-tabs"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="px-2 py-3">
                <p className="settings-title" style={{ fontSize: "1.25rem" }}>
                  Update your password
                </p>
                <Form className="w-75 mt-4" onSubmit={submit}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="d-flex justify-content-start align-items-start fw-bold">
                      <span>Current Password</span>
                      <span
                        className="text-danger lh-base"
                        style={{ fontSize: ".6rem" }}
                      >
                        &#10038;
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter current password"
                      autoFocus
                      required
                      onChange={(e) => setoldPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="d-flex justify-content-start align-items-start fw-bold">
                      <span>New password</span>
                      <span
                        className="text-danger lh-base"
                        style={{ fontSize: ".6rem" }}
                      >
                        &#10038;
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                      autoFocus
                      required
                      onChange={(e) => setnewPassword(e.target.value)}
                      pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$"
                    />
                    {newPassword &&
                      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/.test(
                        newPassword
                      ) && (
                        <div
                          className="error-message"
                          style={{
                            padding: "5px",
                            marginTop: "5px",
                            color: "crimson",
                          }}
                        >
                          Password must be between 8-32 characters and contain
                          at least one letter and one number.
                        </div>
                      )}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="d-flex justify-content-start align-items-start fw-bold">
                      <span>Confirm password</span>
                      <span
                        className="text-danger lh-base"
                        style={{ fontSize: ".6rem" }}
                      >
                        &#10038;
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      autoFocus
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {newPassword !== confirmPassword && (
                      <div
                        className="error-message"
                        style={{
                          padding: "5px",
                          marginTop: "5px",
                          color: "crimson",
                        }}
                      >
                        Passwords do not match.
                      </div>
                    )}
                  </Form.Group>
                  <div className="d-flex justify-content-start gap-4 py-4">
                    <Button
                      variant="primary"
                      className=" px-5 py-2"
                      type="submit"
                    >
                      Update Password
                    </Button>
                  </div>
                </Form>
                {loading && (
                  <div
                    className="loader-container"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "60%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                    }}
                  >
                    <div className="loader"></div>
                    <div className="px-2" style={{ fontSize: "15px" }}>
                      Updating password
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
