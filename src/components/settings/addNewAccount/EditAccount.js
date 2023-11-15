import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Form } from "react-bootstrap";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineError } from "react-icons/md";
import Sidebar from "../../Sidebar";
import Header from "./../../Header";
import { Link, useLocation, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function EditAccount() {
  const location = useLocation();
  const account_id = location.pathname.split("/")[3];
  const token = localStorage.getItem("access_token");

  const [account, setAccount] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const fetchAccountData = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // replace token_local with the actual token value
      },
    };

    fetch(
      `http://54.173.112.117:8000/api/get-account/?account_id=${account_id}`,
      requestOptions
    )
      .then(async (response) => {
        let res = await response.json();
        setAccount(res);
      })
      .catch((error) => console.log(error));
  };

  const updateAccountData = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // replace token_local with the actual token value
      },
      body: JSON.stringify({
        name: account?.name,
        arn_of_iam_role: account?.arn_of_iam_role,
        bucket_name: account?.bucket_name,
        external_id: account?.external_id,
        prefix_path: account?.prefix_path,
        report_name: account?.report_name,
        role_session_name: null,
      }),
    };

    fetch(
      `http://54.173.112.117:8000/api/aws-accounts/${account?.id}/`,
      requestOptions
    )
      .then(async (response) => {
        if (response.ok) {
          toast.success("Account data updated sucessfully!", {
            autoClose: 1000,
          });

          setTimeout(() => {
            setRedirect(true);
          }, 1000);

          clearTimeout();
        } else {
          console.log("Error Updating Account Data!");
        }

        return await response.json();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAccountData();
  }, [account_id]);

  if (redirect) {
    return <Navigate to="/settings/cloudAccounts" />;
  }

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className="settings px-4 py-3">
        <ToastContainer />
        <Breadcrumb className="ps-2">
          <Breadcrumb.Item href="/settings/cloudAccounts">
            Profile settings
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/settings/cloudAccounts">
            Cloud accounts
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit account</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex justify-content-between gap-4">
          <div className="w-25">
            <Sidebar defaultActiveKey="/settings/cloudAccounts" />
          </div>

          <div className="w-75">
            <div
              className="d-flex justify-content-between align-items-start px-2 py-3"
              style={{ background: "#f8f8f9" }}
            >
              <p className="settings-title">
                Edit Account Details (Manual Setup)
              </p>
            </div>
            <div
              className="settings-leftDescription px-4 py-4 rounded accounts-tabs"
              style={{ backgroundColor: "#ffffff" }}
            >
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
                <Form>
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
                      type="text"
                      placeholder="3e1e3830-a902-11ed-85ac-759d6082749e"
                      value={account?.name}
                      onChange={(e) =>
                        setAccount((a) => ({ ...a, name: e.target.value }))
                      }
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="d-flex justify-content-start align-items-start">
                      <span>External ID</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="3e1e3830-a902-11ed-85ac-759d6082749e"
                      disabled
                      value={account?.external_id}
                      onChange={(e) =>
                        setAccount((a) => ({
                          ...a,
                          external_id: e.target.value,
                        }))
                      }
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
                      type="text"
                      autoFocus
                      value={account?.arn_of_iam_role}
                      onChange={(e) =>
                        setAccount((a) => ({
                          ...a,
                          arn_of_iam_role: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Text>
                      <small className="fw-bold fs-6">S3 BUCKET DETAILS</small>
                      <div className="error-msg p-0">
                        <p className="d-flex align-items-center justify-content-start gap-2 p-2 my-2">
                          <MdOutlineError className="text-danger" />
                          Please create or use a bucket that you own with
                          encryption enable and follow the{" "}
                          <a
                            href="https://cloud-23.com/adding-an-aws-account-to-cloudpoint-23-with-manual-setup/"
                            className="fw-semibold"
                            target="_blank"
                          >
                            documentation
                          </a>
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
                      type="text"
                      placeholder="Enter S3 bucket you created for nOps"
                      autoFocus
                      value={account?.bucket_name}
                      onChange={(e) =>
                        setAccount((a) => ({
                          ...a,
                          bucket_name: e.target.value,
                        }))
                      }
                    />
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
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Please enter report name"
                      autoFocus
                      value={account?.report_name}
                      onChange={(e) =>
                        setAccount((a) => ({
                          ...a,
                          report_name: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="d-flex justify-content-start align-items-start">
                      <span>Prefix path</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Please enter prefix path"
                      autoFocus
                      value={account?.prefix_path}
                      onChange={(e) =>
                        setAccount((a) => ({
                          ...a,
                          prefix_path: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>
                </Form>
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
                    Back
                  </Button>
                  <Button
                    className="px-5 text-light fs-6"
                    onClick={(e) => updateAccountData(e)}
                  >
                    Update Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditAccount;
