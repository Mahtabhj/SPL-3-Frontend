import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Doughnut, Pie } from "react-chartjs-2";
import { BsArrowRight } from "react-icons/bs";

import { Link, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header";
ChartJS.register(ArcElement, Tooltip, Legend);

function ViewWafr() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [assesmentStart, setAssesmentStart] = useState(false);
  {
    /*progress count */
  }
  const now = 60;
  {
    /*Active tab */
  }
  const [activeTab, setActiveTab] = useState("summary");

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };
  {
    /*Chart data*/
  }
  const data1 = {
    labels: [
      "Label 1",
      "Label 2",
      "Label 3",
      "Label 4",
      "Label 5",
      "Label 6",
      "Label 7",
      "Label 8",
      "Label 9",
      "Label 10",
      "Label 11",
      "Label 12",
      "Label 13",
      "Label 14",
      "Label 15",
      "Label 16",
      "Label 17",
      "Label 18",
      "Label 19",
      "Label 20",
      "Label 21",
      "Label 22",
    ],
    datasets: [
      {
        data: [
          300, 50, 100, 40, 120, 50, 140, 20, 90, 70, 110, 50, 20, 90, 70, 110,
          50, 20, 90, 70, 110, 150,
        ],
        backgroundColor: [
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#949FB1",
          "#4D5360",
          "#AC64AD",
          "#FEDCBA",
          "#ABCDEF",
          "#DDDDDD",
          "#ABCABC",
          "#4169E1",
          "#C71585",
          "#FF4500",
          "#FEDCBA",
          "#46BFBD",
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#949FB1",
          "#4D5360",
          "#AC64AD",
        ],
        hoverBackgroundColor: [
          "#FF5A5E",
          "#5AD3D1",
          "#FFC870",
          "#A8B3C5",
          "#616774",
          "#DA92DB",
          "#FFFFFF",
          "#ABCABC",
          "#DDDDDD",
          "#ABCABC",
          "#408080",
          "#8B008B",
          "#FF6347",
          "#FFFFFF",
          "#5AD3D1",
          "#FF5A5E",
          "#5AD3D1",
          "#FFC870",
          "#A8B3C5",
          "#616774",
          "#DA92DB",
        ],
      },
    ],
  };
  const data2 = {
    labels: ["Label 1", "Label 2"],
    datasets: [
      {
        data: [300, 50],
        backgroundColor: ["#4169E1", "#4D5360"],
        hoverBackgroundColor: ["#4773f5", "#666e80"],
      },
    ],
  };

  const options1 = {
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: true,
        text: "Custom Chart Title",
      },
    },
  };
  const options2 = {
    cutoutPercentage: 50,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid className="view-wafr ">
      <Header />
      <Row className="py-3 px-4 ">
        <Col className="d-flex justify-content-between">
          <div>
            <Breadcrumb>
              <Breadcrumb.Item href="">
                <Link to="/wafr" className="text-decoration-none">
                  WAFR
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>749779696556 WAFR</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="d-flex">
            <img
              src="images/last-edit-icon.svg"
              alt="last edit icon"
              className="mx-2"
            />
            <span> Last edited on 06 Feb, 2023 (8:32 PM)</span>
          </div>
        </Col>
      </Row>
      <Row className="py-2 px-4">
        <Col className="d-flex justify-content-between ">
          <div>
            <h5 className="fw-bold">749779696556 WAFR</h5>
            <p className="m-0">Created by afrin ela on 06 January 2023</p>
          </div>
          <div className="d-flex align-items-end">
            <div className="overflow-hidden view-wafr-edit-icon d-flex align-items-center justify-content-center">
              <img src="images/edit-icon.svg" />
            </div>
            <div className="overflow-hidden view-wafr-trash-icon d-flex align-items-center justify-content-center">
              <img src="images/delete-icon.svg" />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="py-2 px-4">
        <h5 className="fw-bold">Resources Summary</h5>
      </Row>

      <Row className="d-flex justify-content-around resource-summary-cards px-4">
        <Col>
          <Card className="text-center mb-3 ">
            <Card.Body className="border">
              <div className="d-flex">
                <img
                  src="images/total-resource-icon.svg"
                  className="view-wafr-resource-icon mx-3"
                  alt=""
                />
                <div className="d-flex flex-column text-start my-auto">
                  <h5 className="p-0 m-0 fw-bold">23</h5>
                  <small className="text-muted text-nowrap">
                    Total resources
                  </small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center mb-3">
            <Card.Body className="border">
              <div className="d-flex">
                <img
                  src="images/violations-icon.svg"
                  className="mx-3 view-wafr-violation-icon"
                />
                <div className="d-flex flex-column text-start my-auto">
                  <h5 className="p-0 m-0 fw-bold">19</h5>
                  <small className="text-muted text-nowrap">
                    With Violations
                  </small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center mb-3">
            <Card.Body className="border">
              <div className="d-flex">
                <img
                  src="images/reserve-icon.svg"
                  className="mx-3 view-wafr-reserve-icon"
                />
                <div className="d-flex flex-column text-start my-auto">
                  <h5 className="p-0 m-0 fw-bold">0</h5>
                  <small className="text-muted text-nowrap">
                    Reserved Instances
                  </small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center mb-3">
            <Card.Body className="border">
              <div className="d-flex">
                <img
                  src="images/autoscaling-icon.svg"
                  className="mx-3 view-wafr-scaling-icon"
                />
                <div className="d-flex flex-column text-start my-auto">
                  <h5 className="p-0 m-0 fw-bold">0</h5>
                  <small className="text-muted text-nowrap">
                    Part of AutoScaling
                  </small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="px-4">
        <Tabs
          id="controlled-tab-example"
          activeKey={activeTab}
          onSelect={handleSelect}
        >
          {/*Summary */}
          <Tab eventKey="summary" title="Summary">
            <Row className="">
              <Col xs={12} lg={6} className=" viewwafr-card-container">
                <Card className="my-3 border bg-white rounded">
                  <Card.Header className="px-4 py-3">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <h5 className="text-center fw-bold m-0 ">
                          Resources by Regions
                        </h5>
                      </div>

                      <div className="d-flex ml-3">
                        {/* <Link
                          to="/viewwafr"
                          className="d-flex text-decoration-none align-items-center"
                        >
                          <a
                            href=""
                            className="text-decoration-none text-dark d-flex align-items-center"
                          >
                            View All{" "}
                            <span>
                              <BsArrowRight size={22} className="mx-1" />
                            </span>{" "}
                          </a>
                        </Link> */}
                      </div>
                    </div>
                  </Card.Header>

                  <Card.Body>
                    <div className="d-flex flex-column align-items-center">
                      <div className="py-2 text-center">
                        <h2 className="fw-bold m-0">22</h2>
                        <small className="text-muted">Total Regions</small>
                      </div>

                      <Doughnut
                        data={data1}
                        options={options1}
                        className="dougnut-chart"
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} lg={6} className="">
                <Card className="my-3 pe-4  border bg-white rounded">
                  <Card.Header className="px-4 py-3">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <h5 className="text-center fw-bold m-0">
                          Resources by Cloud Services
                        </h5>
                      </div>

                      {/* <div className="d-flex ml-3">
                        <a
                          href=""
                          className="text-decoration-none text-dark d-flex align-items-center"
                        >
                          View All{" "}
                          <span>
                            <BsArrowRight size={22} className="mx-1" />
                          </span>{" "}
                        </a>
                      </div> */}
                    </div>
                  </Card.Header>

                  <Card.Body>
                    <div className="d-flex flex-column align-items-center ">
                      <div className="py-2 text-center">
                        <h2 className="fw-bold m-0">02</h2>
                        <small className="text-muted">Total Services</small>
                      </div>
                      <Pie
                        data={data2}
                        options={options2}
                        className="pie-chart"
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>

          {/* Compliance */}
          <Tab eventKey="compliance" title="Compliance">
            <Row className="">
              <Col xs={12} md={6} className="viewwafr-card-container">
                <Card className="my-3 border bg-white rounded">
                  <Card.Header className="px-4 py-3">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <h5 className="text-center fw-bold m-0 ">
                          Lenses Summary
                        </h5>
                      </div>

                      <div className="d-flex ml-3">
                        {/* <Link
                          to="/viewwafr"
                          className="d-flex text-decoration-none align-items-center"
                        >
                          <a
                            href=""
                            className="text-decoration-none text-dark d-flex align-items-center"
                          >
                            View All{" "}
                            <span>
                              <BsArrowRight size={22} className="mx-1" />
                            </span>{" "}
                          </a>
                        </Link> */}
                      </div>
                    </div>
                  </Card.Header>
                  <hr className="m-0 " />
                  <Card.Body className="py-3 m-0">
                    <div className="d-flex flex-column ">
                      <h6 className="fw-bold">AWS Lenses</h6>
                      <Form className="d-flex flex-row">
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label="WAFR"
                          className="my-1"
                        />
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label="FTR"
                          className="my-1 mx-4"
                        />
                      </Form>

                      <Row className="d-flex flex-row justify-content-between my-4">
                        <h6 className="fw-bold">WAFR Assessment</h6>
                        <Col>
                          <div className="d-flex flex-column text-muted justify-content-between ">
                            <p className="text-nowrap">LENSE TYPE</p>
                            <p className="text-nowrap">WAFR</p>
                          </div>
                        </Col>

                        <Col className="col-6 px-2">
                          <div className="d-flex flex-column ">
                            <p className="text-nowrap">ISSUES RISK SEVERITY</p>
                            <div className="d-flex flex-row ">
                              <span className="px-1">
                                44{" "}
                                <span className="bg-primary px-2 py-1 text-white">
                                  U
                                </span>
                              </span>
                              <span className="px-1">
                                --
                                <span className="bg-primary px-2 py-1 text-white">
                                  M
                                </span>
                              </span>
                              <span className="px-1">
                                14{" "}
                                <span className="bg-primary px-2 py-1 text-white">
                                  H
                                </span>
                              </span>
                              <span className="px-1">
                                --{" "}
                                <span className="bg-primary px-2 py-1 text-white">
                                  N
                                </span>
                              </span>
                              <span className="px-1">
                                --{" "}
                                <span className="bg-primary px-2 py-1 text-white">
                                  N
                                </span>
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col className="view-wafr-assesment">
                          <p className="text-nowrap">ASSESSMENT COMPLETED</p>
                          <ProgressBar now={now} label={`${now}%`} />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button
                            variant="primary"
                            className="px-5 py-2 border-0 text-nowrap"
                            onClick={() => navigate("/assesment")}
                          >
                            Manual Assessment
                          </Button>

                          <Button
                            variant="secondary"
                            className="px-5 py-2 mx-sm-3 bg-light text-dark text-nowrap"
                          >
                            View Report
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card className="my-3  border bg-white rounded">
                  <Card.Header className="px-4 py-3">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <h5 className="text-center fw-bold m-0">
                          Top Recommendation
                        </h5>
                      </div>

                      <div className="d-flex ml-3">
                        <a
                          href=""
                          className="text-decoration-none text-dark d-flex align-items-center"
                        >
                          View All{" "}
                          <span>
                            <BsArrowRight size={22} className="mx-1" />
                          </span>{" "}
                        </a>
                      </div>
                    </div>
                  </Card.Header>
                  <hr className="m-0 " />
                  <Card.Body className="py-3">
                    <div className="d-flex flex-column align-items-center"></div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Row>

      {/* WAFR AUTOMATED ASSESMENT POPUP */}
      {/* <Modal
        show={assesmentStart}
        onHide={() => setAssesmentStart(false)}
        backdrop="static"
        keyboard={false}
        size={"lg"}
        centered
      >
        <Modal.Header className="modal-header p-4">
          <Modal.Title>Your Automated Assessment Has Started</Modal.Title>
          <AiFillCloseCircle onClick={() => setAssesmentStart(false)} />
        </Modal.Header>
        <Modal.Body className="p-4 pb-3">
          <div className="d-flex flex-column align-items-center">
            <BsClockHistory color="#22C38F" className="assesment-popup-icon"></BsClockHistory>
            <p className="py-4 text-center">
              Assessment is in progress. Please come after sometime to get <br />
              the assessment result.
            </p>
          </div>

        </Modal.Body>
      </Modal> */}
    </Container>
  );
}

export default ViewWafr;
