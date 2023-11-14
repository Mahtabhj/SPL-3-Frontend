import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { Link, Navigate } from "react-router-dom";
import Header from "./Header";

const Dashboard = () => {
  // get the aws account name
  const [response, setResponse] = useState("");
  let [selectedAccountId, setSelectedAccountId] = useState("");
  const [accountIds, setAccountIds] = useState([]);

  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("access_token");
  const lastSelectedAccount = localStorage.getItem(
    `selected_account_${userId}`
  );

  useEffect(() => {
    const getLastAddeddAccount = async () => {
      console.log("Called APi");
      const url =
        "http://localhost:8000/api/get-last-added-aws-account/";

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const lastAccountResponse = response.data;
        const lastSelectedAccountId = lastAccountResponse.account_id;
        console.log(lastAccountResponse);

        if (lastSelectedAccountId) {
          setSelectedAccountId(lastSelectedAccountId);
          localStorage.setItem(
            `selected_account_${userId}`,
            lastSelectedAccountId
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (!lastSelectedAccount) getLastAddeddAccount();
  }, []);

  useEffect(() => {
    // get the list of account IDs
    const getAccountIds = async () => {
      const url =
        "http://localhost:8000/api/get-aws-account-list/";

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const accounts = response.data.map((account) => account.account_id);
        setAccountIds(accounts);
      } catch (error) {
        console.error(error);
      }
    };
    getAccountIds();

    // get billing data with accountName
    const handleRetrieveBillingData = async (accountId) => {
      const url =
        "http://localhost:8000/api/get-billing-data/";
      const payload = {
        account_id: accountId,
      };

      try {
        const response = await axios.post(url, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setResponse(response.data);
      } catch (error) {
        setResponse("");
      }
    };

    if (selectedAccountId !== "") {
      handleRetrieveBillingData(selectedAccountId);
    }
  }, [selectedAccountId]);

  // handle selection change and save selected account ID to localStorage
  const handleSelectChange = (e) => {
    const accountId = e.target.value;
    setSelectedAccountId(accountId);
    console.log("handlesecte change", selectedAccountId);
    localStorage.setItem(`selected_account_${userId}`, accountId);
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div>
        <div className="dashboard">
          <Container fluid>
            <Header />
          </Container>

          {/* Dashboard Content Description */}
          <Container fluid className="dashboard-content">
            <Row className="p-4">
              <Col>
                <h3 className="fw-bold">Dashboard</h3>
                <p className="m-0">
                  The data presented reflects the changes in cost that are
                  accounted for by factors such as the account, service
                  provided, extent of usage, and type of operation. The data is
                  sorted based on the level of impact it has in your
                  surroundings.
                </p>
              </Col>
            </Row>

            <Row className="px-4 py-2 ">
              <Col className="d-flex align-items-start justify-content-start">
                <div>
                  <Form.Select
                    value={selectedAccountId || lastSelectedAccount}
                    onChange={handleSelectChange}
                    className="px-4 aws-dropdown"
                  >
                    <option value="">Select AWS Account</option>
                    {accountIds.map((accountId) => (
                      <option key={accountId} value={accountId} className="">
                        {accountId}{" "}
                      </option>
                    ))}{" "}
                  </Form.Select>
                </div>
              </Col>
              <Col className="d-flex align-items-end justify-content-end">
                <Button
                  className="d-flex align-items-center gap-2"
                  as={Link}
                  to="/settings/manageAccount"
                  style={{ backgroundColor: "#0F1A43" }}
                >
                  <BsFillPlusCircleFill />
                  Add New AWS Account
                </Button>
              </Col>
            </Row>

            {/* Dashboard Content table*/}
            <Row className="px-4 ">
              <Col className="col-12">
                <div className="wafr-table">
                  <Table bordered hover responsive>
                    <thead>
                      <tr className="table-header">
                        <th className="col-5 fs-5">Cloud Accounts</th>
                        <th className="col-2 text-muted ">
                          {response
                            ? response.month
                            : new Date().toLocaleString("default", {
                                month: "long",
                              })}{" "}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td className="d-flex py-4">
                          <div>
                            <div className="text-decoration-none text-dark d-flex align-items-center m-0">
                              <span>
                                <img
                                  src="images/aws-icon-dash.svg"
                                  alt="aws"
                                  className="w-75 py-1 "
                                />
                              </span>
                              <span className="mx-3 fw-bold">
                                {selectedAccountId
                                  ? selectedAccountId
                                  : "No AWS account found"}{" "}
                              </span>

                              {selectedAccountId && (
                                <Button
                                  as={Link}
                                  to={`/settings/editAccount/${selectedAccountId}`}
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                  }}
                                >
                                  <TbEdit className="text-black" size={24} />
                                </Button>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="fw-bold">
                          ${response ? response.total_cost : 0.0}{" "}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <div className="wafr-table">
                  <Table bordered striped hover responsive>
                    <thead>
                      <tr className="table-header">
                        <th className="col-5 fs-5">Cloud Services</th>
                        <th className="col-2 text-muted">
                          {response
                            ? response.month
                            : new Date().toLocaleString("default", {
                                month: "long",
                              })}{" "}
                        </th>
                      </tr>
                    </thead>
                    {response &&
                    Object.keys(response.cloud_services_with_cost).length >
                      0 ? (
                      <tbody>
                        {" "}
                        {Object.keys(response.cloud_services_with_cost).map(
                          (service) => (
                            <tr key={service}>
                              <td className="d-flex">
                                <span>
                                  <img
                                    src="images/aws-icon-dash.svg"
                                    alt="aws"
                                    className="w-75 py-1 "
                                  />
                                </span>
                                <span className="fw-bold">{service}</span>
                              </td>
                              <td className="fw-bold">
                                ${response.cloud_services_with_cost[service]}{" "}
                              </td>
                            </tr>
                          )
                        )}{" "}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td>
                            No Data to show at the moment for Cloud Accounts
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    )}{" "}
                  </Table>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
