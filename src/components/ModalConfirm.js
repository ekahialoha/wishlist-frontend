import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ModalConfirm extends Component {
    handleConfirmed = () => {
        this.props.handleConfirmed();
        this.props.handleModalToggle();
    }

    render() {
        return (
            <Modal
                show={this.props.displayModal}
                centered
            >
                <Modal.Header>
                    <Modal.Title>{this.props.heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.props.body}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={this.props.handleModalToggle}
                    >Cancel</Button>
                    <Button
                        variant="primary"
                        onClick={this.handleConfirmed}
                    >Confirm</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalConfirm;
