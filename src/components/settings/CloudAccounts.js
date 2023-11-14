import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import axios from "axios";

import { Button, Modal, Tab, Table, Tabs } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsFillPlusCircleFill, BsTrash } from "react-icons/bs";
import { MdOutlineError } from "react-icons/md";

import Header from "../Header";
import Sidebar from "../Sidebar";

function AccountSettings() {
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("access_token");
  const accountId = localStorage.getItem(`selected_account_${userId}`);

  const [key, setKey] = useState("all-cloud-accounts");
  const [show, setShow] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [deleteAccount, setDeleteAccount] = useState(null);

  const handleClose = () => setShow(false);

  // Delete workload
  const handleDeleteAccount = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/aws-accounts/${accountToDelete.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // filter out the deleted workload from the state
      const updatedAccounts = accounts.filter(
        (account) => account.id !== accountToDelete.id
      );

      if (accountId && accountId === accountToDelete.account_id)
        localStorage.removeItem(`selected_account_${userId}`);

      setAccounts(updatedAccounts);
      setDeleteAccount(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // get the list of account IDs
    const getAllAccounts = async () => {
      const url =
        "http://localhost:8000/api/get-aws-account-list/";
      const token = localStorage.getItem("access_token");

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAccounts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllAccounts();
  }, [userId]);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className="settings px-4 py-3">
        <div className="d-flex justify-content-between gap-4">
          <div className="w-25" style={{ background: "#ffffff" }}>
            <Sidebar defaultActiveKey="/settings/cloudAccounts" />
          </div>

          <div className="w-75">
            <div
              className="d-flex justify-content-between align-items-start px-2 py-3"
              style={{ background: "#f8f8f9" }}
            >
              <p className="settings-title">Cloud Accounts</p>
              <Button
                className="d-flex align-items-center gap-2"
                as={Link}
                to="/settings/manageAccount"
              >
                <BsFillPlusCircleFill />
                Add new account
              </Button>
            </div>
            <div
              className="settings-rightDescription px-4 py-4 rounded accounts-tabs"
              style={{ backgroundColor: "#ffffff" }}
            >
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className=""
              >
                <Tab
                  eventKey="all-cloud-accounts"
                  title={`All Cloud Accounts (${accounts.length})`}
                >
                  <Table>
                    <tbody>
                      {accounts?.map((account) => (
                        <tr key={account?.account_id}>
                          <td className="pt-4">
                            <img
                              src="/images/aws.png"
                              width={50}
                              height={50}
                              className="rounded-circle"
                            />
                          </td>
                          <td className="pt-4">
                            <p className="mb-1 fw-semibold fs-6">
                              AWS account name
                            </p>
                            <div className="d-flex align-items-center justify-content-start gap-3 ">
                              <span
                                className="fs-6 fw-normal"
                                style={{ color: "#0F1A43" }}
                              >
                                {account?.account_id}{" "}
                              </span>
                              <small></small>
                            </div>
                          </td>
                          <td className="pt-4">
                            <p className="mb-1 fw-semibold fs-6">Bucket name</p>
                            <div className="mb-3">
                              <p className="mb-0">{account?.bucket_name}</p>
                            </div>
                          </td>
                          <td className="pt-4 d-flex">
                            <Button
                              className="d-flex align-items-center justify-content-start gap-1 fs-6 bg-transparent text-dark border-none"
                              as={Link}
                              to={`/settings/editAccount/${account?.account_id}`}
                            >
                              <BiEdit size={24} />
                            </Button>
                            <Button
                              className="ml-5 d-flex align-items-center justify-content-start fs-6 bg-transparent text-dark border-none"
                              onClick={() => {
                                setAccountToDelete(account);
                                setDeleteAccount(true);
                              }}
                            >
                              <BsTrash size={24}></BsTrash>
                            </Button>
                          </td>
                        </tr>
                      ))}
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
          <Modal.Title>Check Connection for IAM</Modal.Title>
          <AiFillCloseCircle onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="p-4 pb-3">
          <div className="error-msg p-0 pb-3">
            <p className="d-flex fw-bold fs-6 align-items-center justify-content-start gap-2 p-2 px-0 my-2 bg-transparent border-0">
              <MdOutlineError className="text-danger" />
              List of configuration/permission issues for CloudPoint23
              integration
            </p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <Table striped className="check-modal">
              <tbody>
                <tr className="text-uppercase fw-semibold text-muted fs-6">
                  <th className="text-secondary p-3">Service</th>
                  <th className="text-secondary p-3">Method</th>
                </tr>
                <tr>
                  <td className="p-3">Project setup</td>
                  <td className="p-3">assume_role</td>
                </tr>
                <tr>
                  <td colSpan={2} className="p-3">
                    <small style={{ color: "#0f1a43" }}>
                      Can't access AWS API, mostly by project setup with wrong
                      IAM Role permission. Please check the project settings and
                      AWS IAM Role.
                    </small>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end gap-0 p-4 pt-0 w-100">
          <Button
            className="px-2 bg-light w-auto"
            style={{
              borderColor: "#0f1a43",
              color: "#0f1a43",
            }}
          >
            Back
          </Button>
          <Button
            className="px-2 bg-light w-auto"
            style={{
              borderColor: "#0f1a43",
              color: "#0f1a43",
            }}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={deleteAccount}
        onHide={() => setDeleteAccount(false)}
        backdrop="static"
        keyboard={false}
        size={"lg"}
        centered
      >
        <Modal.Header className="modal-header p-4">
          <Modal.Title>Delete Account</Modal.Title>
          <AiFillCloseCircle onClick={() => setDeleteAccount(false)} />
        </Modal.Header>
        <Modal.Body className="p-4 pb-3">
          <div className="d-flex flex-column align-items-center">
            <BsTrash
              size={110}
              color="#EE5F59"
              className="trash-button"
            ></BsTrash>
            <p className="py-2 text-center">
              Are you sure you want to delete this account? You cannot revert it
              <br />
              once removed.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between p-4 pt-0">
          <Button
            variant="secondary"
            onClick={() => setDeleteAccount(false)}
            className=" px-5 py-3 bg-light btn-close"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="btn-delete px-5 py-3"
            onClick={() => {
              handleDeleteAccount();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AccountSettings;
