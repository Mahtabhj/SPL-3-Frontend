import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Form } from 'react-bootstrap';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import { AiOutlineDollar } from "react-icons/ai";
import {
  BsBox,
  BsFillExclamationCircleFill,
  BsFillExclamationTriangleFill,
} from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { FiDownload, FiSettings } from "react-icons/fi";
import { GoCircleSlash } from "react-icons/go";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { IoBarChartOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";

import Header from "./Header";
import CostTab from "./assessment/CostTab";
import OperationsTab from "./assessment/OperationsTab";
import PerformanceTab from "./assessment/PerformanceTab";
import ReliabilityTab from "./assessment/ReliabilityTab";
import SecurityTab from "./assessment/SecurityTab";
import SustainabilityTab from "./assessment/SustainabilityTab";

function Assesment(props) {
  const location = useLocation();
  const workloadId = location.pathname.split("/")[2];
  const lenseAlias = location.pathname.split("/")[3];

  const userId = localStorage.getItem("user_id");
  const accountId = localStorage.getItem(`selected_account_${userId}`);
  const token = localStorage.getItem("access_token");

  const [pillarQuestions, setPillarQuestions] = useState([]);
  const [workload, setWorkload] = useState(null);
  const [questionLoader, setQuestionLoader] = useState(null);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);
  const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);
  const [selectedTab, setSelectedTab] = useState("security");
  const [selectedServices, setSelectedServices] = useState([]);
  const [availableServices, setAvailableServices] = useState(['AWS', 'Microsoft', 'Google']);

  //Questions based on pillars id
  const fetchQuestionsByPillerId = async (pillarId) => {
    let selectedQuestions = 0;

    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `http://54.173.112.117:8000/api/questions/?workloadId=${workloadId}&lensAlias=wellarchitected&pillarId=${pillarId}&account_id=${accountId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setTotalQuestionsCount(data.length);

    data.forEach((d) =>
      d.SelectedChoices.length > 0 ? selectedQuestions++ : ""
    );

    setAnsweredQuestionsCount(selectedQuestions);

    setPillarQuestions(data);
    setQuestionLoader(null);
  };

  const handleTabSelect = (key) => {
    setSelectedTab(key);
    setPillarQuestions([]);
    setAnsweredQuestionsCount(0);
    setTotalQuestionsCount(0);
    fetchQuestionsByPillerId(key);
    window.scrollTo(0, 0);
  };
  const handleNextClick = (key) => {
    setSelectedTab(key);
    setPillarQuestions([]);
    setAnsweredQuestionsCount(0);
    setTotalQuestionsCount(0);
    fetchQuestionsByPillerId(key);
    window.scrollTo(0, 0);
  };

  const handlePrevClick = (key) => {
    setSelectedTab(key);
    setPillarQuestions([]);
    setAnsweredQuestionsCount(0);
    setTotalQuestionsCount(0);
    fetchQuestionsByPillerId(key);
  };

  const updateQuestionData = (data) => {
    setQuestionLoader(data.QuestionId);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // replace token_local with the actual token value
      },
      body: JSON.stringify({
        questionId: data.QuestionId,
        selectedChoices: data.SelectedChoices,
        isApplicable: data.IsApplicable,
      }),
    };

    fetch(
      `http://54.173.112.117:8000/api/questions/answer/?workloadId=${workloadId}&lensAlias=${lenseAlias}&account_id=${accountId}`,
      requestOptions
    )
      .then(async (response) => {
        let responseData = await response.json();

        return responseData.Answer;
      })
      .then((data) => {
        getWorkloadData();
        fetchQuestionsByPillerId(data.PillarId);
      })
      .catch((error) => console.log(error));
  };

  // make a GET request to the API endpoint with the workloadId parameter
  const getWorkloadData = () => {
    axios
      .get(
        `http://54.173.112.117:8000/api/workloads/view/?workloadId=${workloadId}&account_id=${accountId}`
      )
      .then((response) => {
        setWorkload(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Download report
  const downloadReport = () => {
    axios
      .get(
        `http://54.173.112.117:8000/api/reports/pdf/?workloadId=${workloadId}&lensAlias=${lenseAlias}&account_id=${accountId}`,
        { responseType: "blob" }
      )
      .then((response) => {
        saveAs(response.data, "report.pdf");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getWorkloadData();
    fetchQuestionsByPillerId("security");
  }, []);

  const handleServiceSelect = (event) => {
    const selectedOption = event.target.value;
    setSelectedServices((prevSelectedServices) => [...prevSelectedServices, selectedOption]);
    setAvailableServices((prevAvailableServices) =>
      prevAvailableServices.filter((service) => service !== selectedOption)
    );
  };

  const handleServiceDeselect = (service) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.filter((selectedService) => selectedService !== service)
    );
    setAvailableServices((prevAvailableServices) => [...prevAvailableServices, service]);
  };

  useEffect(() => {
    // Reset available services when a new assessment is loaded
    setAvailableServices(['AWS', 'Microsoft', 'Google']);
  }, [workloadId]); // Reset when workloadId changes

  //Assessment progress
  const progress = parseFloat(
    (
      ((workload?.RiskCounts.HIGH +
        workload?.RiskCounts.MEDIUM +
        workload?.RiskCounts.NONE +
        workload?.RiskCounts.NOT_APPLICABLE) /
        (workload?.RiskCounts.HIGH +
          workload?.RiskCounts.UNANSWERED +
          workload?.RiskCounts.MEDIUM +
          workload?.RiskCounts.NONE +
          workload?.RiskCounts.NOT_APPLICABLE)) *
      100
    ).toFixed(2)
  );

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid className="assesment">
      <Header />

      <Row className="px-4 py-3">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="">
              <Link to="/wafr" className="text-decoration-none">
                WAFR{" "}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{workload?.WorkloadId} </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Row className="px-4 py-2">
        <Col className="d-flex justify-content-between ">
          <div>
            <h5 className="fw-bold">
              {workload?.WorkloadName} (WAFR Assessment)
            </h5>
          </div>
        </Col>
        <Col md={4} className="d-flex justify-content-start">
          <div>
            <h5 className="fw-bold">Selected Services</h5>
            <ul>
              {selectedServices.map((service, index) => (
                <li key={index}>
                  {service}{' '}
                  <button onClick={() => handleServiceDeselect(service)}>Deselect</button>
                </li>
              ))}
            </ul>
          </div>
        </Col>
       
        <Col className="d-flex flex-row-reverse justify-content-between ">
          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              className="py-2 border-0 text-nowrap d-flex align-items-center bg-info"
              onClick={downloadReport}
            >
              <span>
                <FiDownload className="mx-1" size={18} />
              </span>
              Export Report
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="px-4 py-2">
        <Col className="d-flex justify-content-end">
          <Form>
            <Form.Group controlId="servicesForm">
              <Form.Label>Services</Form.Label>
              <Form.Control as="select" multiple onChange={handleServiceSelect}>
                {availableServices.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      
      <Row className="assessment-result-cards d-flex justify-content-between px-4 mb-3 ">
        <Col>
          <Card className="text-center mb-3 ">
            <Card.Body className="border py-3  px-3">
              <div className="d-flex">
                <div className="d-flex flex-column text-start my-auto">
                  <small className="d-flex align-items-center text-muted text-nowrap">
                    UNASNWERED
                    <span>
                      <HiOutlineQuestionMarkCircle className="mx-1"></HiOutlineQuestionMarkCircle>
                    </span>
                  </small>
                  <div className="d-flex flex-row">
                    <h2 className="p-0 m-0 fw-bold">
                      {workload?.RiskCounts.UNANSWERED}
                    </h2>
                    <BsFillExclamationCircleFill
                      className="mx-2 my-2"
                      size={23}
                      style={{ color: "#3ed1bf" }}
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center ">
            <Card.Body className="border py-3  px-3">
              <div className="d-flex">
                <div className="d-flex flex-column text-start my-auto">
                  <small className="d-flex align-items-center text-muted text-nowrap">
                    MEDIUM
                    <span>
                      <HiOutlineQuestionMarkCircle className="mx-1"></HiOutlineQuestionMarkCircle>
                    </span>
                  </small>
                  <div className="d-flex flex-row">
                    <h2 className="p-0 m-0 fw-bold">
                      {workload?.RiskCounts.MEDIUM}
                    </h2>
                    <BsFillExclamationTriangleFill
                      className="mx-2 my-2"
                      size={23}
                      style={{ color: "#fa923d" }}
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center ">
            <Card.Body className="border py-3  px-3">
              <div className="d-flex">
                <div className="d-flex flex-column text-start my-auto">
                  <small className=" d-flex align-items-center text-muted text-nowrap">
                    HIGH
                    <span>
                      <HiOutlineQuestionMarkCircle className="mx-1"></HiOutlineQuestionMarkCircle>
                    </span>
                  </small>
                  <div className="d-flex flex-row">
                    <h2 className="p-0 m-0 fw-bold">
                      {workload?.RiskCounts.HIGH}
                    </h2>
                    <BsFillExclamationTriangleFill
                      className="mx-2 my-2"
                      size={23}
                      style={{ color: "#e93746" }}
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center ">
            <Card.Body className="border py-3  px-3">
              <div className="d-flex">
                <div className="d-flex flex-column text-start my-auto">
                  <small className=" d-flex align-items-center text-muted text-nowrap">
                    NONE
                    <span>
                      <HiOutlineQuestionMarkCircle className="mx-1"></HiOutlineQuestionMarkCircle>
                    </span>
                  </small>
                  <h2 className="p-0 m-0 fw-bold">
                    {workload?.RiskCounts.NONE}
                  </h2>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center ">
            <Card.Body className="border py-3 px-3">
              <div className="d-flex">
                <div className="d-flex flex-column text-start my-auto">
                  <small className="d-flex align-items-center text-muted text-nowrap">
                    NOT APPLICABLE
                  </small>
                  <div className="d-flex flex-row">
                    <h2 className="p-0 m-0 fw-bold">
                      {workload?.RiskCounts.NOT_APPLICABLE}
                    </h2>
                    <GoCircleSlash
                      className="mx-2 my-2"
                      size={23}
                      style={{ color: "#0d6efd" }}
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center ">
            <Card.Body className="border py-2 px-3">
              <div className="d-flex">
                <div className="d-flex flex-column text-start my-auto">
                  <small className=" d-flex align-items-center text-muted text-nowrap">
                    ASSESSMENT COMPLETED
                    <span>
                      <HiOutlineQuestionMarkCircle className="mx-1"></HiOutlineQuestionMarkCircle>
                    </span>
                  </small>
                  <ProgressBar
                    completed={progress}
                    label={`${parseFloat(progress.toFixed(2))}%`}
                    labelAlignment="outside"
                    bgColor="#03ac6b"
                    labelColor="#002130"
                    labelSize="18px"
                    height="12px"
                    className="mt-2 mb-2"
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Tab.Container
        defaultActiveKey="security"
        activeKey={selectedTab}
        onSelect={handleTabSelect}
      >
        <Row className="assessment-tabs px-4">
          <Col>
            <Nav>
              <Col>
                <Nav.Item>
                  <Nav.Link
                    eventKey="security"
                    className={selectedTab === "security" ? "active" : ""}
                  >
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        <CiLock size={25} className="mx-2"></CiLock>
                      </div>
                      <div>
                        <h5 className="m-0">Security</h5>
                        {selectedTab === "security" && (
                          <small className="text-muted">{`${answeredQuestionsCount}/${totalQuestionsCount} answer saved`}</small>
                        )}
                      </div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Col>
              <Col>
                <Nav.Item>
                  <Nav.Link eventKey="costOptimization">
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        <AiOutlineDollar
                          size={25}
                          className="mx-2"
                        ></AiOutlineDollar>
                      </div>
                      <div>
                        <h5 className="m-0">Cost</h5>
                        {selectedTab === "costOptimization" && (
                          <small className="text-muted">{`${answeredQuestionsCount}/${totalQuestionsCount} answer saved`}</small>
                        )}
                      </div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Col>

              <Col>
                <Nav.Item>
                  <Nav.Link eventKey="reliability">
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        <MdOutlineSecurity
                          size={25}
                          className="mx-2"
                        ></MdOutlineSecurity>
                      </div>
                      <div>
                        <h5 className="m-0">Reliablity</h5>
                        {selectedTab === "reliability" && (
                          <small className="text-muted">{`${answeredQuestionsCount}/${totalQuestionsCount} answer saved`}</small>
                        )}
                      </div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Col>

              <Col>
                <Nav.Item>
                  <Nav.Link eventKey="operationalExcellence">
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        <FiSettings size={25} className="mx-2"></FiSettings>
                      </div>
                      <div>
                        <h5 className="m-0">Operations</h5>
                        {selectedTab === "operationalExcellence" && (
                          <small className="text-muted">{`${answeredQuestionsCount}/${totalQuestionsCount} answer saved`}</small>
                        )}
                      </div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Col>

              <Col>
                <Nav.Item>
                  <Nav.Link eventKey="performance">
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        <IoBarChartOutline
                          size={25}
                          className="mx-2"
                        ></IoBarChartOutline>
                      </div>
                      <div>
                        <h5 className="m-0">Performance</h5>
                        {selectedTab === "performance" && (
                          <small className="text-muted">{`${answeredQuestionsCount}/${totalQuestionsCount} answer saved`}</small>
                        )}
                      </div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Col>

              <Col>
                <Nav.Item>
                  <Nav.Link eventKey="sustainability">
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        <BsBox size={25} className="mx-2"></BsBox>
                      </div>
                      <div>
                        <h5 className="m-0">Sustainability</h5>
                        {selectedTab === "sustainability" && (
                          <small className="text-muted">{`${answeredQuestionsCount}/${totalQuestionsCount} answer saved`}</small>
                        )}{" "}
                      </div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Col>
            </Nav>

            <ProgressBar
              completed={progress}
              bgColor="#03ac6b"
              isLabelVisible={false}
              height="8px"
              className="mt-2"
            />
            {/* <ProgressBar
              now={progress}
              animated
              className="my-3 assessment-progressbar"
            /> */}

            {pillarQuestions.length === 0 ? (
              <div className="loader-container" style={{ marginTop: "100px" }}>
                <div className="loader"></div>
              </div>
            ) : (
              <Tab.Content>
                <Tab.Pane eventKey="security">
                  <SecurityTab
                    questionsData={pillarQuestions}
                    questionLoadingState={questionLoader}
                    updateData={updateQuestionData}
                    onNextClick={() => handleNextClick("costOptimization")}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="costOptimization">
                  <CostTab
                    questionsData={pillarQuestions}
                    questionLoadingState={questionLoader}
                    updateData={updateQuestionData}
                    onPrevClick={() => handlePrevClick("security")}
                    onNextClick={() => handleNextClick("reliability")}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="reliability">
                  <ReliabilityTab
                    questionsData={pillarQuestions}
                    questionLoadingState={questionLoader}
                    updateData={updateQuestionData}
                    onPrevClick={() => handlePrevClick("costOptimization")}
                    onNextClick={() => handleNextClick("operationalExcellence")}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="operationalExcellence">
                  <OperationsTab
                    questionsData={pillarQuestions}
                    questionLoadingState={questionLoader}
                    updateData={updateQuestionData}
                    onPrevClick={() => handlePrevClick("reliability")}
                    onNextClick={() => handleNextClick("performance")}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="performance">
                  <PerformanceTab
                    questionsData={pillarQuestions}
                    questionLoadingState={questionLoader}
                    updateData={updateQuestionData}
                    onPrevClick={() => handlePrevClick("operationalExcellence")}
                    onNextClick={() => handleNextClick("sustainability")}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="sustainability">
                  <SustainabilityTab
                    questionsData={pillarQuestions}
                    questionLoadingState={questionLoader}
                    updateData={updateQuestionData}
                    onPrevClick={() => handlePrevClick("performance")}
                    onNextClick={() => handleNextClick("security")}
                  />
                </Tab.Pane>
              </Tab.Content>
            )}
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default Assesment;
