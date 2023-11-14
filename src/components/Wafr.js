import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { BsArrowRight, BsTrash } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";

import Header from "./Header";

const Wafr = (props) => {
  const userId = localStorage.getItem("user_id");
  const accountId = localStorage.getItem(`selected_account_${userId}`);
  const token = localStorage.getItem("access_token");

  const [createWorkLoad, setCreateWorkLoad] = useState(false);
  const [modifyWafr, setModifyWafr] = useState(false);
  const [deleteWafr, setDeleteWafr] = useState(false);
  const [workloadToDelete, setWorkloadToDelete] = useState(null);
  const [workloads, setWorkloads] = useState([]);
  const [isWorkloadCreated, setIsWorkloadCreated] = useState(false);
  const [workload, setWorkload] = useState({
    workloadName: "",
    description: "",
    lenses: "",
    awsRegions: "",
    environment: "",
    accountId: accountId,
  });
  const [activeTab, setActiveTab] = useState("allworkloads");
  // const [regionOptions, setRegionOptions] = useState([]);
  const [selectedWorkload, setSelectedWorkload] = useState({
    AwsRegions: [],
    Lenses: [],
  });
  const [accountIds, setAccountIds] = useState([]);
  // const [lenseOptions, setLenseOptions] = useState([]);

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

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

  const handleCreateWorkLoad = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // replace token_local with the actual token value
      },
      body: JSON.stringify({
        workloadName: workload.workloadName,
        description: workload.description,
        lenses: workload.lenses,
        awsRegions: workload.awsRegions,
        environment: workload.environment,
      }),
    };

    fetch(
      `http://localhost:8000/api/workloads/?account_id=${workload.accountId}`,
      requestOptions
    )
      .then(async (response) => {
        if (response.ok) {
          console.log("Workload created successfully");
          setCreateWorkLoad(false); // close the popup modal if successful
          setIsWorkloadCreated(true); // update state variable to trigger useEffect
          toast.success("Your workload is created successfully!", {
            autoClose: 1000,
          });

          localStorage.setItem(
            `selected_account_${userId}`,
            workload.accountId
          );
        } else {
          toast.error("Couldn't create workload.Try again later!", {
            autoClose: 1000,
          });
          console.log("Error creating workload");
        }
        return await response.json();
      })
      .catch((error) => console.log(error));
  };

  const getWorkloadData = (id) => {
    axios
      .get(
        `http://localhost:8000/api/workloads/view/?workloadId=${id}&account_id=${accountId}`
      )
      .then((response) => {
        setSelectedWorkload(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateWorkload = async (event) => {
    event.preventDefault();

    const updatedWorkload = {
      workloadId: selectedWorkload?.WorkloadId,
      workloadName: selectedWorkload?.WorkloadName,
      description: selectedWorkload?.Description,
      awsRegions: selectedWorkload?.AwsRegions,
      environment: selectedWorkload?.Environment,
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/workloads/?account_id=${accountId}`,
        updatedWorkload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Your workload is updated successfully!", {
        autoClose: 1000,
      });
      setModifyWafr(false);
      setSelectedWorkload({ AwsRegions: [], Lenses: [] });

      fetchWorkloads();
    } catch (error) {
      toast.error("Couldn't update workload.Try again later!", {
        autoClose: 1000,
      });
      console.log(error);
    }
  };

  //Delete workload
  const handleDeleteWorkLoad = async () => {
    try {
      console.log("WORKLOAD TO DELETE: ", workloadToDelete);

      const response = await axios.delete(
        `http://localhost:8000/api/workloads/?workloadId=${workloadToDelete.WorkloadId}&account_id=${accountId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("MESSAGE: ", response);

      toast.success("Your workload is deleted successfully!", {
        autoClose: 1000,
      });
      // filter out the deleted workload from the state
      const updatedWorkloads = workloads.filter(
        (workload) => workload.WorkloadId !== workloadToDelete.WorkloadId
      );
      setWorkloads(updatedWorkloads);
      setDeleteWafr(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWorkloads = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `http://localhost:8000/api/workloads/?account_id=${accountId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data && !data.account_id) {
        data?.sort((a, b) =>
          new Date(a.UpdatedAt) < new Date(b.UpdatedAt) ? 1 : -1
        );

        setWorkloads(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*TODO: Will fetch all available lens when the db is updated */
  // //importing lenses
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = localStorage.getItem("access_token");
  //     const response = await fetch("http://localhost:8000/api/lense/", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     setLenseOptions(data);
  //   };
  //   fetchData();
  // }, []);

  // importing Regions
  // useEffect(() => {
  //   const fetchRegions = async () => {
  //     const token = localStorage.getItem("access_token");
  //     const response = await fetch(
  //       `http://localhost:8000/api/regions/?account_id=${accountId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const data = await response.json();

  //     if (data && !data.account_id) {
  //       setRegionOptions(data);
  //     }
  //   };

  //   fetchRegions();
  // }, []);

  useEffect(() => {
    fetchWorkloads();
  }, [isWorkloadCreated]);

  useEffect(() => {
    getAccountIds();
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <ToastContainer />
      <Container fluid className="wafr-content">
        <Header />
        <Row className="px-4 py-3">
          <Col>
            <h3 className="fw-bold">WAFR</h3>
            <p className="m-0">
              Create WAFR to group resources and start assessments or see
              reports.
            </p>
          </Col>
        </Row>
        <Row className="px-4">
          <Col>
            <div className="create-new d-flex justify-content-end ">
              <Button
                className="create-new-button d-flex align-items-center"
                onClick={() => setCreateWorkLoad(true)}
              >
                <span>
                  <AiFillPlusCircle
                    className="mx-2"
                    size={22}
                  ></AiFillPlusCircle>
                </span>{" "}
                Create new workload
              </Button>
            </div>
            <Tabs
              id="controlled-tab-example"
              activeKey={activeTab}
              onSelect={handleSelect}
            >
              {/*All Workloads */}
              <Tab eventKey="allworkloads" title="All Workloads">
                <Row className="">
                  {workloads.map((workload) => (
                    <Col xs={12} md={6} className="pe-2">
                      <Card
                        key={workload.WorkloadId}
                        className="my-3 border bg-white rounded"
                      >
                        <Card.Header className="px-4 py-2">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <h5 className="text-center fw-bold m-0">
                                {workload.WorkloadName}
                              </h5>
                            </div>

                            <div className="d-flex ml-3">
                              <Button
                                className="card-top-button btn-light rounded-pill"
                                onClick={() => {
                                  getWorkloadData(workload.WorkloadId);
                                  setModifyWafr(true);
                                }}
                              >
                                <TbEdit className="card-icon" />
                              </Button>
                              <Button
                                className="card-top-button btn-light rounded-pill"
                                onClick={() => {
                                  setWorkloadToDelete(workload);
                                  setDeleteWafr(true);
                                }}
                              >
                                <BsTrash className="card-icon my-auto" />
                              </Button>

                              <Link
                                to={`/assesment/${workload.WorkloadId}/${workload.Lenses[0]}`}
                                className="d-flex text-decoration-none align-items-center"
                              >
                                <span
                                  href=""
                                  className="text-decoration-none text-dark d-flex align-items-center"
                                >
                                  Manual Assessment
                                  <span>
                                    <BsArrowRight size={22} className="mx-1" />
                                  </span>{" "}
                                </span>
                              </Link>
                            </div>
                          </div>
                        </Card.Header>

                        <Card.Body className="py-3">
                          <div className="d-flex flex-column align-items-center">
                            <img
                              src="/workload-card-icon.svg"
                              className="py-4"
                            />
                            <p className="py-2 fw-bold">{`RiskCounts: UNANSWERED ${workload.RiskCounts.UNANSWERED}`}</p>
                          </div>
                        </Card.Body>

                        <Card.Footer className="d-flex justify-content-between px-4 py-3">
                          <p className="my-auto text-muted">
                            Last updated on:{" "}
                            <span className="fw-bold ">
                              {new Date(workload.UpdatedAt).toLocaleString()}
                            </span>
                            <br />
                            Lenses: {workload.Lenses.join(", ")}
                          </p>
                          {/* TODO: Will include the environment when available in API */}
                          {/*<Button
                            variant="rounded-pill"
                            className="card-button"
                          >
                            PREPRODUCTION
                              </Button>*/}
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab>

              {/* HIPAA */}
              {/* <Tab eventKey="hippa" title="HIPAA"></Tab> */}

              {/* Production */}
              {/* <Tab eventKey="production" title="Production"></Tab> */}
            </Tabs>
          </Col>
        </Row>

        {/* Create WAFR modal */}
        <Modal
          show={createWorkLoad}
          onHide={() => setCreateWorkLoad(false)}
          backdrop="static"
          keyboard={false}
          size={"lg"}
          centered
          className="modal"
        >
          <Modal.Header className="modal-header p-4">
            <Modal.Title>Create new WAFR</Modal.Title>
            <AiFillCloseCircle onClick={() => setCreateWorkLoad(false)} />
          </Modal.Header>
          <Modal.Body className="p-4 pb-3">
            <Form onSubmit={(e) => handleCreateWorkLoad(e)}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Select Account Name
                  <span
                    className="text-danger lh-base"
                    style={{ fontSize: ".6rem" }}
                  >
                    &#10038;
                  </span>
                </Form.Label>
                <Form.Select
                  required
                  onChange={(e) =>
                    setWorkload((prevWorkload) => ({
                      ...prevWorkload,
                      accountId: e.target.value,
                    }))
                  }
                  defaultValue={accountId}
                >
                  <option value="">Select AWS Account</option>
                  {accountIds.map((account) => (
                    <option key={account} value={account}>
                      {account}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="d-flex justify-content-start align-items-start">
                  <span>Workload name </span>
                  <span
                    className="text-danger lh-base"
                    style={{ fontSize: ".6rem" }}
                  >
                    &#10038;
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Unique identifier for workload"
                  autoFocus
                  onChange={(e) =>
                    setWorkload((prevWorkload) => ({
                      ...prevWorkload,
                      workloadName: e.target.value,
                    }))
                  }
                />
                <Form.Text className="text-muted d-flex justify-content-start align-items-center gap-1 my-3">
                  <AiOutlineQuestionCircle /> You can't change the workload name
                  once you create the workload.
                </Form.Text>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  AWS Regions
                  <span
                    className="text-danger lh-base"
                    style={{ fontSize: ".6rem" }}
                  >
                    &#10038;
                  </span>
                </Form.Label>
                <Form.Select
                  required
                  onChange={(e) =>
                    setWorkload((prevWorkload) => ({
                      ...prevWorkload,
                      awsRegions: [e.target.value],
                    }))
                  }
                >
                  <option value="">Select Regions</option>
                  <option value="us-east-1">us-east-1</option>
                  {/* {regionOptions.map((region) => (
                    <option key={region.name} value={region.name}>
                      {region.name}
                    </option>
                  ))} */}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="lenses">
                <Form.Label>
                  Select a lens
                  <span
                    className="text-danger lh-base"
                    style={{ fontSize: ".6rem" }}
                  >
                    &#10038;
                  </span>
                </Form.Label>
                <Form.Select
                  required
                  name="lenses"
                  onChange={(e) =>
                    setWorkload((prevWorkload) => ({
                      ...prevWorkload,
                      lenses: [e.target.value],
                    }))
                  }
                >
                  <option value="">Select a lens</option>
                  <option value="wellarchitected">wellarchitected</option>
                  {/* {lenseOptions.map((option) => (
                    <option key={option.LensAlias} value={option.LensAlias}>
                      {option.LensAlias}
                    </option>
                  ))} */}
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Environment
                  <span
                    className="text-danger lh-base"
                    style={{ fontSize: ".6rem" }}
                  >
                    &#10038;
                  </span>
                </Form.Label>
                <Form.Select
                  required
                  onChange={(e) =>
                    setWorkload((prevWorkload) => ({
                      ...prevWorkload,
                      environment: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Environment</option>
                  <option value="PRODUCTION">PRODUCTION</option>
                  <option value="PREPRODUCTION">PREPRODUCTION</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  Description
                  <span
                    className="text-danger lh-base"
                    style={{ fontSize: ".6rem" }}
                  >
                    &#10038;
                  </span>
                </Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={2}
                  placeholder="Workload description"
                  onChange={(e) =>
                    setWorkload((prevWorkload) => ({
                      ...prevWorkload,
                      description: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Modal.Footer className="d-flex justify-content-between p-4 pt-0">
                <Button
                  variant="secondary"
                  onClick={() => setCreateWorkLoad(false)}
                  className=" px-5 py-3 bg-light btn-close"
                >
                  Cancel
                </Button>
                <Button type="submit" className=" px-5 py-3">
                  Create
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>

        {/* modify WAFR modal */}
        <Modal
          show={modifyWafr}
          onHide={() => {
            setModifyWafr(false);
            setSelectedWorkload({ AwsRegions: [], Lenses: [] });
          }}
          backdrop="static"
          keyboard={false}
          size={"lg"}
          centered
        >
          <Modal.Header className="modal-header p-4">
            <Modal.Title>Modify WAFR</Modal.Title>
            <AiFillCloseCircle
              onClick={() => {
                setModifyWafr(false);
                setSelectedWorkload({ AwsRegions: [], Lenses: [] });
              }}
            />
          </Modal.Header>
          <Form onSubmit={handleUpdateWorkload}>
            <Modal.Body className="p-4 pb-3">
              <Form.Group className="mb-3">
                <Form.Label className="d-flex justify-content-start align-items-start">
                  <span>Account Name </span>
                  <span
                    className="text-danger lh-base"
                    style={{ fontSize: ".6rem" }}
                  >
                    &#10038;
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  autoFocus
                  placeholder="Account Name"
                  value={accountId}
                  disabled
                />
                <Form.Text className="text-muted d-flex justify-content-start align-items-center gap-1 my-3">
                  <AiOutlineQuestionCircle /> You can't change the account name
                  once you create the workload.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="d-flex justify-content-start align-items-start">
                  <span>Workload name </span>
                  <span
                    className="text-danger lh-base"
                    style={{ fontSize: ".6rem" }}
                  >
                    &#10038;
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  autoFocus
                  placeholder="Unique identifier for workload"
                  value={selectedWorkload?.WorkloadName}
                  disabled
                />
                <Form.Text className="text-muted d-flex justify-content-start align-items-center gap-1 my-3">
                  <AiOutlineQuestionCircle /> You can't change the workload name
                  once you create the workload.
                </Form.Text>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  AWS Regions
                  <span
                    className="text-danger lh-base"
                    style={{ fontSize: ".6rem" }}
                  >
                    &#10038;
                  </span>
                </Form.Label>
                <Form.Select
                  required
                  onChange={(e) =>
                    setSelectedWorkload((prevWorkload) => ({
                      ...prevWorkload,
                      AwsRegions: [e.target.value],
                    }))
                  }
                  value={
                    selectedWorkload?.AwsRegions[
                      selectedWorkload?.AwsRegions.length - 1
                    ]
                  }
                >
                  <option value="">Select Regions</option>
                  <option value="us-east-1">us-east-1</option>
                  {/* {regionOptions.map((region) => (
                    <option key={region.name} value={region.name}>
                      {region.name}
                    </option>
                  ))} */}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="lenses">
                <Form.Label>
                  Select a lens
                  <span
                    className="text-danger lh-base"
                    style={{ fontSize: ".6rem" }}
                  >
                    &#10038;
                  </span>
                </Form.Label>
                <Form.Select
                  required
                  name="lenses"
                  onChange={(e) =>
                    setSelectedWorkload((prevWorkload) => ({
                      ...prevWorkload,
                      Lenses: [e.target.value],
                    }))
                  }
                  value={
                    selectedWorkload?.Lenses[
                      selectedWorkload?.Lenses.length - 1
                    ]
                  }
                >
                  <option value="">Select a lens</option>
                  <option value="wellarchitected">wellarchitected</option>
                  {/* {lenseOptions.map((option) => (
                    <option key={option.LensAlias} value={option.LensAlias}>
                      {option.LensAlias}
                    </option>
                  ))} */}
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Environment
                  <span
                    className="text-danger lh-base"
                    style={{ fontSize: ".6rem" }}
                  >
                    &#10038;
                  </span>
                </Form.Label>
                <Form.Select
                  required
                  onChange={(e) =>
                    setSelectedWorkload((prevWorkload) => ({
                      ...prevWorkload,
                      Environment: e.target.value,
                    }))
                  }
                  value={selectedWorkload?.Environment}
                >
                  <option value="">Select Environment</option>
                  <option value="PRODUCTION">PRODUCTION</option>
                  <option value="PREPRODUCTION">PREPRODUCTION</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  Description
                  <span
                    className="text-danger lh-base"
                    style={{ fontSize: ".6rem" }}
                  >
                    &#10038;
                  </span>
                </Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={2}
                  placeholder="Workload description"
                  value={selectedWorkload?.Description}
                  onChange={(e) =>
                    setSelectedWorkload((prevWorkload) => ({
                      ...prevWorkload,
                      Description: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </Modal.Body>
            {/* <Button
                variant="secondary"
                className="d-flex justify-content-center align-items-center gap-3 w-100 px-5 py-3 mt-2 bg-light btn-resource"
              >
                <span>Specify Workload Resource</span>
                <BsChevronDoubleDown />
              </Button> */}
            <Modal.Footer className="d-flex justify-content-between p-4 pt-0">
              <Button
                variant="secondary"
                onClick={() => {
                  setModifyWafr(false);
                  setSelectedWorkload({ AwsRegions: [], Lenses: [] });
                }}
                className=" px-5 py-3 bg-light btn-close"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" className=" px-5 py-3">
                Update
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Delete modal */}
        <Modal
          show={deleteWafr}
          onHide={() => setDeleteWafr(false)}
          backdrop="static"
          keyboard={false}
          size={"lg"}
          centered
        >
          <Modal.Header className="modal-header p-4">
            <Modal.Title>Delete WAFR</Modal.Title>
            <AiFillCloseCircle onClick={() => setDeleteWafr(false)} />
          </Modal.Header>
          <Modal.Body className="p-4 pb-3">
            <div className="d-flex flex-column align-items-center">
              <BsTrash
                size={110}
                color="#EE5F59"
                className="trash-button"
              ></BsTrash>
              <p className="py-2 text-center">
                Are you sure you want to delete this workload? You cannot revert
                it <br /> once removed.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between p-4 pt-0">
            <Button
              variant="secondary"
              onClick={() => setDeleteWafr(false)}
              className=" px-5 py-3 bg-light btn-close"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="btn-delete px-5 py-3"
              onClick={() => handleDeleteWorkLoad(workload.WorkloadId)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Wafr;
