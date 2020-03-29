import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

function DeleteButtonComponent(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.report ? props.report.description : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Oops, you're about to delete this Report</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              props.deleteReport(props.report.id);
            }}
          >
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteButtonComponent;
