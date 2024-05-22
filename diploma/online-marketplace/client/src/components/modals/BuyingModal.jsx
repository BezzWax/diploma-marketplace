import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const BuyingModal = ({ handleClose }) => {
  return (
    <Modal show={true} onHide={handleClose} animation={true} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thanks for buying</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <iframe src="https://giphy.com/embed/JLELwGi2ksYTu" 
        width="480" 
        height="254" 
        className="giphy-embed" 
        allowFullScreen>
        </iframe>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BuyingModal;
