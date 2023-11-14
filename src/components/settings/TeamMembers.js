import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Tab, Table, Tabs } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  BsDot,
  BsFillPlusCircleFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Navigate } from "react-router-dom";

function TeamMembers() {
  const token = localStorage.getItem("access_token");
  const [key, setKey] = useState("allUsers");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className="settings px-4 py-3">
        <div className="d-flex justify-content-between gap-4">
          <div className="w-25" style={{ background: "#ffffff" }}>
            <Sidebar defaultActiveKey="/settings/teamMembers" />
          </div>

          <div className="w-75">
            <div
              className="d-flex justify-content-between align-items-start px-2 py-3"
              style={{ background: "#f8f8f9" }}
            >
              <p className="settings-title">Team Members</p>
              <Button
                className="d-flex align-items-center gap-2"
                onClick={handleShow}
              >
                <BsFillPlusCircleFill />
                Invite new member
              </Button>
            </div>
            <div
              className="settings-leftDescription px-4 py-4 rounded accounts-tabs"
              style={{ backgroundColor: "#ffffff" }}
            >
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className=""
              >
                <Tab eventKey="allUsers" title="All Users">
                  <Table bordered className="my-4 team-members-table">
                    <thead>
                      <tr>
                        <th className="py-3">Username</th>
                        <th className="py-3">Email</th>
                        {/* <th className="py-3">Status</th>
                        <th className="py-3">Signed up</th> */}
                        <th></th>
                        <th></th>
                        <th className="py-3">Role</th>

                        {/* <th className="py-3">Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td className="d-flex align-items-center ps-0">
                            {/* <BsDot className="text-danger fs-2" /> */}
                            <span>{user.is_active}</span>
                          </td>
                          <td>{user.date_joined}</td>
                          <td>Member</td>
                          {/* <td>
                            <BsThreeDotsVertical />
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {/* <div className="d-flex jusfify-content-start w-100">
                    <small className="w-75 text-muted mt-2">
                      Showing 1 to 3 items
                    </small>
                    <nav aria-label="..." className="w-25">
                      <ul class="pagination">
                        <li class="page-item disabled">
                          <a class="page-link">Back</a>
                        </li>
                        <li class="page-item active">
                          <a class="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li class="page-item" aria-current="page">
                          <a class="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div> */}
                </Tab>
                <Tab eventKey="admins" className="py-2" title="Admins">
                  <Table bordered className="my-4 team-members-table">
                    <thead>
                      <tr>
                        <th className="py-3">Username</th>
                        <th className="py-3">Email</th>
                        <th className="py-3">Status</th>
                        <th className="py-3">Signed up</th>
                        <th className="py-3">Role</th>
                        <th className="py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Afrin ela</td>
                        <td>noore.afrin@brainstation-23.com</td>
                        <td className="d-flex align-items-center ps-0">
                          <BsDot className="text-success fs-2" />
                          <span>Active</span>
                        </td>
                        <td>Wed Feb 01 2023</td>
                        <td>Admin</td>
                        <td>
                          <BsThreeDotsVertical />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="members" className="py-2" title="Members">
                  <Table bordered className="my-4 team-members-table">
                    <thead>
                      <tr>
                        <th className="py-3">Username</th>
                        <th className="py-3">Email</th>
                        {/* <th className="py-3">Status</th>
                        <th className="py-3">Signed up</th> */}
                        <th className="py-3">Role</th>
                        <th className="py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Mobarak_bs23</td>
                        <td>mobarak@brainstation-23.com</td>
                        <td className="d-flex align-items-center ps-0">
                          <BsDot className="text-danger fs-2" />
                          <span>Invite expired</span>
                        </td>
                        <td>Tue Jan 31 2023</td>
                        <td>Member</td>
                        <td>
                          <BsThreeDotsVertical />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size={"lg"}
        centered
      >
        <Modal.Header className="modal-header p-4">
          <Modal.Title>Invite Team member</Modal.Title>
          <AiFillCloseCircle onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="p-4 pb-3">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex justify-content-start align-items-start">
                <span>Email address</span>
                <span
                  className="text-danger lh-base"
                  style={{ fontSize: ".6rem" }}
                >
                  &#10038;
                </span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address of your team member you want to invite"
                autoFocus
              />
              <Form.Text className="text-muted d-flex justify-content-start align-items-center gap-1 my-3"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex justify-content-start align-items-start">
                <span>Member role</span>
                <span
                  className="text-danger lh-base"
                  style={{ fontSize: ".6rem" }}
                >
                  &#10038;
                </span>
              </Form.Label>
              <div className="d-flex flex-column gap-0 account-type">
                <div className="form-check bg-transparent m-0">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    checked
                  />
                  <label
                    className="form-check-label d-flex gap-5 ms-4"
                    htmlFor="exampleRadios1"
                  >
                    <div className="d-flex flex-column gap-0 bg-transparent">
                      <p className="mb-0 fw-bold fs-6">Admin user</p>
                      <small className="mb-0 fw-normal">
                        The team member you are inviting will have all the admin
                        user roles and have full accessibility.
                      </small>
                    </div>
                  </label>
                </div>
                <div className="form-check bg-transparent">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="option2"
                  />
                  <label
                    className="form-check-label d-flex gap-5 ms-4"
                    htmlFor="exampleRadios2"
                  >
                    <div className="d-flex flex-column gap-0 bg-transparent">
                      <p className="mb-0 fw-bold fs-6">Member</p>
                      <small className="mb-0 fw-normal">
                        The team member you are inviting will have read-only
                        access.
                      </small>
                    </div>
                  </label>
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between p-4 pt-0">
          <Button
            variant="secondary"
            onClick={handleClose}
            className=" px-5 py-3 bg-light btn-close"
          >
            Cancel
          </Button>
          <Button variant="primary" className=" px-5 py-3">
            Invite
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TeamMembers;
