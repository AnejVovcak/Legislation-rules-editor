import {Button, Modal, ModalActions, ModalContent, ModalHeader} from "semantic-ui-react";
import React from "react";

const modalWarning = ({modalOpen, setModalOpen, handleProductionPush}: {
    modalOpen: boolean,
    setModalOpen: (open: boolean) => void,
    handleProductionPush: () => void
}) => {

    return (
        <Modal
            size={'mini'}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
        >
            <ModalHeader>Push on production</ModalHeader>
            <ModalContent>
                <p>Are you sure you want to push this on production?</p>
            </ModalContent>
            <ModalActions>
                <Button negative onClick={() => setModalOpen(false)}>
                    No
                </Button>
                <Button positive onClick={() => {
                    setModalOpen(false);
                    handleProductionPush();
                }}>
                    Yes
                </Button>
            </ModalActions>
        </Modal>
    );
}

export default modalWarning;