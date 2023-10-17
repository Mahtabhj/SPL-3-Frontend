import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AiFillCloseCircle} from "react-icons/ai";
import { BsChevronDoubleDown } from "react-icons/bs";

function ModifyWAFR() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="m-4">
        <Button variant="primary" onClick={handleShow}>
          Modify WAFR
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size={"lg"}
          centered
        >
          <Modal.Header className="modal-header p-4">
            <Modal.Title>Modify WAFR</Modal.Title>
            <AiFillCloseCircle onClick={handleClose} />
          </Modal.Header>
          <Modal.Body className="p-4 pb-3">
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Review types</Form.Label>
                <Form.Select>
                  <option>Select review types</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Compliance frameworks</Form.Label>
                <Form.Select>
                  <option>Select compliance frameworks</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Create workload on your AWS account"
                  className="my-3"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>AWS account to pull resources from</Form.Label>
                <Form.Select>
                  <option>Select AWS account to pull resources from</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Select Environment</Form.Label>
                <Form.Select>
                  <option>PRODUCTION</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Please enter brief description of the workload"
                />
              </Form.Group>
            </Form>
            <Button
              variant="secondary"
              className="d-flex justify-content-center align-items-center gap-3 w-100 px-5 py-3 mt-2 bg-light btn-resource"
            >
              <span>Specify Workload Resource</span>
              <BsChevronDoubleDown />
            </Button>
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
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ModifyWAFR;
