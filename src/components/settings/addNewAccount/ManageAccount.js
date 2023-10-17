import axios from "axios";
import randomstring from "randomstring";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Form, Tab, Tabs } from "react-bootstrap";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineError } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import Header from "./../../Header";

function ManageAccount() {
  const token = localStorage.getItem("access_token");

  const [randomStr1, setRandomStr1] = useState("");
  const [randomStr2, setRandomStr2] = useState("");
  const [randomStr3, setRandomStr3] = useState("");
  const [randomStr4, setRandomStr4] = useState("");
  const [randomStr5, setRandomStr5] = useState("");
  const [externalId, setExternalId] = useState("");

  useEffect(() => {
    setRandomStr1(randomstring.generate(8));
    setRandomStr2(randomstring.generate(4));
    setRandomStr3(randomstring.generate(4));
    setRandomStr4(randomstring.generate(4));
    setRandomStr5(randomstring.generate(12));
  }, []);

  useEffect(() => {
    setExternalId(
      `${randomStr1}-${randomStr2}-${randomStr3}-${randomStr4}-${randomStr5}`
    );
  }, [randomStr1, randomStr2, randomStr3, randomStr4, randomStr5]);

  console.log(externalId);

  const [key, setKey] = useState("cloud-account-type");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle next button click
  const handleNextClick = () => {
    switch (key) {
      case "cloud-account-type":
        setKey("setup-method");
        break;
      case "setup-method":
        setKey("account-details");
        break;
      default:
        break;
    }
  };

  const handlePrevClick = () => {
    switch (key) {
      case "setup-method":
        setKey("cloud-account-type");
        break;
      case "account-details":
        setKey("setup-method");
        break;
      default:
        break;
    }
  };
  // AWS account setup
  const [name, setName] = useState("");
  const [arnIamRole, setArnIamRole] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [reportName, setReportName] = useState("");
  const [prefixPath, setPrefixPath] = useState("");
  const [roleSessioName, setRoleSessioName] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e) => {
    console.log("clicked");
    try {
      e.preventDefault();
      const token = localStorage.getItem("access_token");

      const payload = {
        name,
        arn_of_iam_role: arnIamRole,
        bucket_name: bucketName,
        report_name: reportName,
        prefix_path: prefixPath,
        role_session_name: roleSessioName,
        external_id: externalId,
      };
      console.log(payload);

      const response = await axios.post(
        "https://cloudpoint.brainstation-23.com/api/aws-accounts/",
        payload,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setRedirect(true);
    } catch (error) {
      console.log(error);
      console.error(error.response);
    }
  };
  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />

      <div className="settings px-4 py-3">
        <Breadcrumb className="ps-2">
          <Breadcrumb.Item href="/settings/cloudAccounts">
            Profile settings
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/settings/cloudAccounts">
            Cloud accounts
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Add new account</Breadcrumb.Item>
        </Breadcrumb>

        <div className="d-flex justify-content-between gap-4">
          <div className="w-25" style={{ background: "#ffffff" }}>
            <Sidebar defaultActiveKey="/settings/cloudAccounts" />
          </div>

          <div className="w-75">
            <div
              className="d-flex justify-content-between align-items-start px-2 py-3"
              style={{ background: "#f8f8f9" }}
            >
              <p className="settings-title">Add New Cloud Account</p>
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
                <Tab eventKey="cloud-account-type" title="Cloud account type">
                  <div className="px-2 py-3">
                    <p className="settings-title mb-1 fw-bold fs-5 pt-2">
                      Cloud account type
                    </p>
                    <small className="fs-6">
                      Please choose the cloud account type
                    </small>
                  </div>
                  <div className="d-flex flex-column gap-3 account-type">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                        //   checked
                      />
                      <label
                        className="form-check-label label-1 d-flex gap-5"
                        htmlFor="exampleRadios1"
                      >
                        <div className="d-flex flex-column gap-0">
                          <p className="mb-0 fw-bold fs-6">AWS account</p>
                          <small className="mb-0">
                            Select this option to add your AWS account to nOps
                            by using a wizard, or by using manual set up.
                          </small>
                        </div>
                      </label>
                    </div>
                    {/* <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios2"
                        value="option2"
                      />
                      <label
                        className="form-check-label label-2 d-flex gap-5"
                        htmlFor="exampleRadios2"
                      >
                        <div className="d-flex flex-column gap-0">
                          <p className="mb-0 fw-bold fs-6">Azure account</p>
                          <small className="mb-0">
                            Select this option to add your Azure Account for
                            nOps.
                          </small>
                        </div>
                      </label>
                    </div> */}{" "}
                  </div>
                  <div className="d-flex justify-content-start gap-3 my-4">
                    <Button
                      className="px-5 bg-light"
                      style={{
                        borderColor: "#0f1a43",
                        color: "#0f1a43",
                      }}
                      as={Link}
                      to="/settings/cloudAccounts"
                    >
                      Cancel
                    </Button>
                    <Button className="px-5" onClick={handleNextClick}>
                      Next
                    </Button>
                  </div>
                </Tab>
                <Tab eventKey="setup-method" title="Setup method">
                  <div className="px-2 py-3">
                    <p className="settings-title mb-1 fw-bold fs-5 pt-2">
                      Setup method
                    </p>
                    <small className="fs-6">
                      Please choose the setup method
                    </small>
                  </div>
                  <div className="d-flex flex-column gap-3 account-type">
                    {/* <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios3"
                        value="option3"

                      />
                      <label
                        className="form-check-label label-3 d-flex gap-5 ps-4"
                        htmlFor="exampleRadios3"
                      >
                        <div className="d-flex flex-column gap-0">
                          <p className="mb-0 fw-bold fs-6">Wizard setup</p>
                          <small className="mb-0">
                            With a few clicks, CloudPoint23 will set up the
                            stack for integration.
                          </small>
                          <Link
                            to="#"
                            className="text-decoration-none fw-semibold pt-1"
                          >
                            Click here to learn more
                          </Link>
                        </div>
                      </label>
                    </div> */}
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios4"
                        value="option4"
                      />
                      <label
                        className="form-check-label label-4 d-flex gap-5"
                        htmlFor="exampleRadios4"
                      >
                        <div className="d-flex flex-column gap-0 ps-4">
                          <p className="mb-0 fw-bold fs-6">Manual setup</p>
                          <small className="mb-0">
                            You manually set up integration by adding ARN and
                            IAM role.
                          </small>
                          <Link
                            to="https://cloud-23.com/adding-an-aws-account-to-cloudpoint-23-with-manual-setup/"
                            className="text-decoration-none fw-semibold pt-1"
                            target="_blank"
                          >
                            Click here to learn more
                          </Link>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-start gap-3 my-4">
                    <Button
                      className="px-5 bg-light"
                      style={{
                        borderColor: "#0f1a43",
                        color: "#0f1a43",
                      }}
                      onClick={handlePrevClick}
                    >
                      Back
                    </Button>
                    <Button className="px-5" onClick={handleNextClick}>
                      Next
                    </Button>
                  </div>
                </Tab>
                <Tab eventKey="account-details" title="Account details">
                  <div className="px-2 py-3">
                    <p className="settings-title mb-1 fw-bold fs-5 pt-2">
                      Account details
                    </p>
                    <small className="fs-6">Manual setup</small>
                  </div>
                  <div className="error-msg p-0">
                    <p className="d-flex align-items-center justify-content-start gap-2 p-2 my-2">
                      <MdOutlineError className="text-danger" />
                      Please refer to detailed instructions for manual
                      <a
                        href="https://cloud-23.com/adding-an-aws-account-to-cloudpoint-23-with-manual-setup/"
                        className="fw-semibold"
                        target="_blank"
                      >
                        setup here
                      </a>
                      .
                    </p>
                  </div>
                  <div className="d-flex flex-column gap-3 px-1 py-3">
                    <Form onSubmit={submit}>
                      <Form.Group className="mb-3">
                        <Form.Text>
                          <small className="fw-bold fs-6">
                            AWS ACCOUNT DETAILS
                          </small>
                        </Form.Text>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="d-flex justify-content-start align-items-start">
                          <span>AWS account name</span>
                          <span
                            className="text-danger lh-base"
                            style={{ fontSize: ".6rem" }}
                          >
                            &#10038;
                          </span>
                        </Form.Label>

                        <Form.Control
                          placeholder="Enter name for your cloudpoint23 project"
                          required
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="externalId">
                        <Form.Label className="d-flex justify-content-start align-items-start">
                          <span>External ID</span>
                        </Form.Label>
                        <Form.Control
                          value={externalId}
                          readOnly
                          autoFocus
                          required
                          // onChange={e => setExternalId(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="d-flex justify-content-start align-items-start">
                          <span>ARN of IAM role</span>
                          <span
                            className="text-danger lh-base"
                            style={{ fontSize: ".6rem" }}
                          >
                            &#10038;
                          </span>
                        </Form.Label>
                        <Form.Control
                          placeholder="Enter arn of iam for your cloudpoint23 project"
                          autoFocus
                          onChange={(e) => setArnIamRole(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Text>
                          <small className="fw-bold fs-6">
                            S3 BUCKET DETAILS
                          </small>
                          <div className="error-msg p-0">
                            <p className="d-flex align-items-center justify-content-start gap-2 p-2 my-2">
                              <MdOutlineError className="text-danger" />
                              Please create or use a bucket that you own with
                              encryption enable and follow the{" "}
                              <a
                                href="https://cloud-23.com/adding-an-aws-account-to-cloudpoint-23-with-manual-setup/"
                                className="fw-semibold"
                                target="blank"
                              >
                                documentation
                              </a>{" "}
                              for manual setup.
                            </p>
                          </div>
                        </Form.Text>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="d-flex justify-content-start align-items-start">
                          <span>Bucket name</span>
                          <span
                            className="text-danger lh-base"
                            style={{ fontSize: ".6rem" }}
                          >
                            &#10038;
                          </span>
                        </Form.Label>
                        <Form.Control
                          placeholder="Enter S3 bucket you created for cloudpoint23"
                          required
                          onChange={(e) => setBucketName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Text>
                          <small className="fw-bold fs-6 d-flex justify-content-between">
                            AWS COST AND USAGE REPORT (CUR) DETAILS
                            <div>
                              <a
                                href="https://brainstation-23.com/contact/"
                                className="fw-semibold fs-6 d-flex gap-1 align-items-center"
                                target="_blank"
                              >
                                <AiOutlineQuestionCircle className="fs-5 fw-semibold" />
                                Need help?
                              </a>
                            </div>
                          </small>
                        </Form.Text>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="d-flex justify-content-start align-items-start">
                          <span>Report name</span>
                          <span
                            className="text-danger lh-base"
                            style={{ fontSize: ".6rem" }}
                          >
                            &#10038;
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Please enter report name"
                          autoFocus
                          onChange={(e) => setReportName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="d-flex justify-content-start align-items-start">
                          <span>Prefix path</span>
                          <span
                            className="text-danger lh-base"
                            style={{ fontSize: ".6rem" }}
                          >
                            &#10038;
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Please enter prefix path"
                          autoFocus
                          onChange={(e) => setPrefixPath(e.target.value)}
                        />
                      </Form.Group>

                      {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label className="d-flex justify-content-start align-items-start">
                                                    <span>Role Session Name</span>
                                                    <span className="text-danger lh-base"
                                                        style={
                                                            {fontSize: ".6rem"}
                                                    }>
                                                        &#10038;
                                                    </span>
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Please enter role session name" autoFocus
                                                    onChange={
                                                        e => setRoleSessioName(e.target.value)
                                                    }/>
                                            </Form.Group> */}

                      <div className="d-flex justify-content-start gap-3 my-4">
                        <Button
                          className="px-5 bg-light"
                          style={{
                            borderColor: "#0f1a43",
                            color: "#0f1a43",
                          }}
                          onClick={handlePrevClick}
                        >
                          Back
                        </Button>
                        <Button type="submit" className="px-5">
                          Setup
                        </Button>
                      </div>
                    </Form>
                  </div>
                  {/* <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size={"lg"}
                    centered
                  >
                    <Modal.Header className="modal-header p-4">
                      <Modal.Title>Delete WAFR</Modal.Title>
                      <AiFillCloseCircle onClick={handleClose} />
                    </Modal.Header>
                    <Modal.Body className="p-4 pb-3">
                      <div className="d-flex flex-column align-items-center">
                        <AiOutlineSetting
                          size={100}
                          color="#0F1A43"
                          style={{
                            background: "rgba(15, 26, 67, 0.05)",
                            borderRadius: "50px",
                          }}
                          className="p-4 m-2"
                        ></AiOutlineSetting>
                        <p className="py-2 text-center">
                          On the next step you're going to be redirected to AWS
                          CloudFormation console. Please ensure you're logged
                          into AWS account with number{" "}
                          <span className="fw-bold">749779696556</span> and
                          click 'Proceed'
                        </p>
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-between gap-0 p-4 pt-0 w-100">
                      <Button
                        variant="secondary"
                        onClick={handleClose}
                        className=" px-5 py-3 bg-light btn-close"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        className=" px-5 py-3"
                        style={{ width: "48%" }}
                        to="/settings/cloudAccounts"
                        as={Link}
                      >
                        Proceed
                      </Button>
                    </Modal.Footer>
                  </Modal> */}{" "}
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageAccount;
