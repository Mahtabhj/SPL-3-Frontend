import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button, Col, Form, Nav, Row, Tab } from "react-bootstrap";
import { AiFillCheckCircle, AiOutlineSave } from "react-icons/ai";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import Data from "./questions/SecurityQuestion.json";

const PerformanceTab = (props) => {
  const { questionsData, questionLoadingState, updateData, onPrevClick, onNextClick } = props;
  const [tabData, setTabData] = useState([]);

  const refs = useMemo(
    () =>
      Data.reduce((acc, _, index) => {
        acc[`ref-${index + 1}`] = createRef(null);
        return acc;
      }, {}),
    []
  );

  const handleNavClick = useCallback(
    (refKey) => {
      refs[refKey].current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    },
    [refs]
  );

  const handleChoiceChange = (question, choice, value) => {
    let qData = tabData.find((q) => q.QuestionId === question.QuestionId);

    if (value === true) qData.SelectedChoices.push(choice.ChoiceId);
    else if (value === false) {
      let filteredChoices = qData.SelectedChoices.filter(
        (c) => c !== choice.ChoiceId
      );

      qData.SelectedChoices = filteredChoices;
    }

    tabData.forEach((q, index) => {
      if (q.QuestionId === qData.QuestionId) tabData[index] = qData;
    });

    setTabData(tabData);

    if (choice.Title === "None of these") updateData(qData);
  };
  const [isSwitchChecked, setIsSwitchChecked] = useState({});
  const handleSwitchChange = (question, value) => {
    let qData = tabData.find((q) => q.QuestionId === question.QuestionId);

    qData.IsApplicable = !value;

    tabData.forEach((q, index) => {
      if (q.QuestionId === qData.QuestionId) tabData[index] = qData;
    });

    setTabData(tabData);

    updateData(qData);
  };

  const disbaledOrNot = (item) => {
    let noneOrNot = false;
    item.SelectedChoices.map((i) => {
      let choice = i.split("_");

      if (choice[choice.length - 1] === "no") noneOrNot = true;
    });

    return noneOrNot;
  };

  /*TODO: Make the note section functional based on the API */
  //add notes funtion
  /*const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");

  const handleSaveNotes = () => {
    // TODO: Save notes to backend or local storage
    setShowNotes(false);
  };

  const handleCancelNotes = () => {
    setNotes("");
    setShowNotes(false);
  };*/

  useEffect(() => {
    setTabData(questionsData);
  }, [questionsData]);

  return (
    <div>
      <Tab.Container>
        <Row className="assessment-innertabs">
          <Col className="assessment-innertabs-mainq">
            <Nav className="flex-column">
              {tabData.map((item, index) => (
                <Nav.Item key={`nav-item-${index}`}>
                  <Nav.Link
                    eventKey={`ref-${index + 1}`}
                    onClick={() => handleNavClick(`ref-${index + 1}`)}
                  >
                    <div
                      className={`d-flex align-items-center assessment-innertabs-mainq-links  ${item.SelectedChoices.length > 0 || item.IsApplicable === false ? "text-blue" : ""
                        }`}
                      id={`${item.QuestionId}`}
                    >

                      <AiFillCheckCircle className="circle-tick-icon" />

                      <div className="assessment-innertabs-mainq-question"><p className="m-0 fw-semibold w-100">{item.QuestionTitle}</p></div>
                      <div className="circle-dot-icon">
                        <RxDotFilled size={50} className={
                          item.Risk.includes('UNANSWERED')
                            ? 'circle-dot-unanswered'
                            : item.Risk.includes('HIGH')
                              ? 'circle-dot-high'
                              : item.Risk.includes('NOT_APPLICABLE')
                                ? 'circle-dot-not-applicable'
                                : item.Risk.includes('NONE')
                                  ? 'circle-dot-none'
                                  : item.Risk.includes('MEDIUM')
                                    ? 'circle-dot-medium'
                                    : ''
                        } />
                      </div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col xs={9} className="assessment-innertabs-subq">
            <div className="p-2">
              {tabData.map((item, index) => (
                <div className="p-2" key={index} ref={refs[`ref-${index + 1}`]}>
                  <Row className="d-flex align-items-center">
                    <Col xs={8}>
                      <div>
                        <h3 className="m-0">{item.QuestionTitle}</h3>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="d-flex justify-content-end">
                        <button
                          variant="primary"
                          //className="py-2 border-0 text-nowrap d-flex align-items-center"
                          className={
                            item.Risk.includes('UNANSWERED')
                              ? 'risk-button risk-button-unanswered'
                              : item.Risk.includes('HIGH')
                                ? 'risk-button risk-button-high'
                                : item.Risk.includes('NOT_APPLICABLE')
                                  ? 'risk-button risk-button-not-applicable'
                                  : item.Risk.includes('NONE')
                                    ? 'risk-button risk-button-none'
                                    : item.Risk.includes('MEDIUM')
                                      ? 'risk-button risk-button-none'
                                      : ''
                          }
                        >
                          <span>
                            <BsFillExclamationCircleFill
                              className="mx-2"
                              size={14}
                            />
                          </span>
                          {item.Risk}
                        </button>

                        {/* <Button
                          variant="secondary"
                          className=" px-3 py-2 mx-sm-3 bg-light text-dark text-nowrap"
                        >
                          Expand all
                        </Button> */}
                      </div>
                    </Col>
                  </Row>

                  <div className="d-flex flex-column">
                    <div className="custom-control custom-switch mr-3">
                      {questionLoadingState === item.QuestionId ? (
                        <div className="loading-line mt-3 mb-3">
                          <div className="loading-line__bar loading-line__bar--1"></div>
                          <div className="loading-line__bar loading-line__bar--2"></div>
                          <div className="loading-line__bar loading-line__bar--3"></div>
                          <div className="loading-line__bar loading-line__bar--4"></div>
                          <div className="loading-line__bar loading-line__bar--5"></div>
                          <div className="loading-line__bar loading-line__bar--6"></div>
                          <div className="loading-line__bar loading-line__bar--7"></div>
                          <div className="loading-line__bar loading-line__bar--8"></div>
                        </div>
                      ) : (
                        <Form className="d-flex flex-row">
                          <Form.Check
                            type="switch"
                            id={`${item.QuestionId}-switch`}
                            label="Question does not apply to this workload."
                            defaultChecked={item.IsApplicable === false}
                            onChange={(e) => {
                              handleSwitchChange(item, e.target.checked);
                            }}
                          />
                        </Form>
                      )}
                    </div>
                    <div>
                      {item.Choices.map((choice, choiceIndex) => (
                        <div
                          className="custom-control custom-checkbox"
                          key={choiceIndex}
                        >
                          {choice.Title === "None of these" ? (
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={`checkbox-${choice.ChoiceId}`}
                              disabled={item.IsApplicable === false}
                              defaultChecked={item.SelectedChoices.includes(
                                choice.ChoiceId
                              )}
                              onChange={(e) =>
                                handleChoiceChange(
                                  item,
                                  choice,
                                  e.target.checked
                                )
                              }
                            />
                          ) : (
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={`checkbox-${choice.ChoiceId}`}
                              disabled={
                                item.IsApplicable === false ||
                                disbaledOrNot(item)
                              }
                              defaultChecked={item.SelectedChoices.includes(
                                choice.ChoiceId
                              )}
                              onChange={(e) =>
                                handleChoiceChange(
                                  item,
                                  choice,
                                  e.target.checked
                                )
                              }
                            />
                          )}
                          <label htmlFor={`checkbox-${choice.ChoiceId}`}>
                            {questionLoadingState === item.QuestionId ? (
                              <div className="loading-line mt-3 mb-3">
                                <div className="loading-line__bar loading-line__bar--1"></div>
                                <div className="loading-line__bar loading-line__bar--2"></div>
                                <div className="loading-line__bar loading-line__bar--3"></div>
                                <div className="loading-line__bar loading-line__bar--4"></div>
                                <div className="loading-line__bar loading-line__bar--5"></div>
                                <div className="loading-line__bar loading-line__bar--6"></div>
                                <div className="loading-line__bar loading-line__bar--7"></div>
                                <div className="loading-line__bar loading-line__bar--8"></div>
                              </div>
                            ) : (
                              choice.Title
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="text-nowrap d-flex align-items-center mt-3 mb-3"
                    onClick={() => updateData(item)}
                  >
                    <span>
                      <AiOutlineSave className="mx-1" size={18} />
                    </span>
                    Submit
                  </Button>
                  <hr className="m-0" />
                  {/* *TODO: Make the note section functional based on the API */}
                  {/* 
                  <Button
                    variant="primary"
                    className="px-4 py-2 border-0 text-nowrap d-flex align-items-center justify-content-center"
                    onClick={() => setShowNotes(true)}
                  >
                    <span>
                      <SlNote className="mx-1" size={18} />
                    </span>
                    Add notes
                  </Button>
                  {showNotes && (
                    <Form className="mt-3">
                      <Form.Control
                        as="textarea"
                        placeholder="Enter notes"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                      <div className="d-flex mt-3">
                        <Button
                          variant="success"
                          className="px-4 d-flex align-items-center"
                          onClick={handleSaveNotes}
                        >
                          <span>
                            <IoSaveOutline className="mx-1" size={18} />
                          </span>
                          Save Note
                        </Button>
                        <button
                          className="mx-2 px-3 cancel-button"
                          onClick={handleCancelNotes}
                        >
                          Cancel Note
                        </button>
                      </div>
                    </Form>
                  )}
                  */}
                </div>
              ))}
            </div>
            <button className="button-previous mx-3 my-3 py-2 align-items-center w-25 fw-bold" onClick={onPrevClick}>
              Previous
            </button>
            <button className="button-next mx-3 my-3 py-2 align-items-center w-25 fw-bold" onClick={onNextClick}>
              Next
            </button>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default PerformanceTab;
