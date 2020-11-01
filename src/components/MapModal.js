import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


const MapModal = (props) => {

    return (
        <div>
                {/**MAP LAUNCHES TO VERIFY LOCATION */}
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Location Verification</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Is this the right location of you truck?</p>
                        <p>INSERT MAP WITH GEOCODED ADDRESS</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={props.retryAdd} variant="secondary">No I will input my address again</Button>
                        <Button onClick={props.submitCart} variant="primary">This is the corect address, Submit</Button>
                    </Modal.Footer>
                </Modal.Dialog>
        </div>
    )
}

export default MapModal;
