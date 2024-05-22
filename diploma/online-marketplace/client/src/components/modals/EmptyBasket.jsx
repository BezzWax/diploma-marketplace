import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EmptyBasket = ({ handleClose }) => {
  return (
    <Modal show={true} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Empty Basket</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your basket is empty</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EmptyBasket;
