import {Button, Modal, ModalActions, ModalContent, ModalHeader} from "semantic-ui-react";
import React from "react";

const modalWarning = ({modalHeader, modalContent, modalOpen, setModalOpen, onClickEvent}: {
    modalHeader: string,
    modalContent: string,
    modalOpen: boolean,
    setModalOpen: (open: boolean) => void,
    onClickEvent: () => void
}) => {

    return (
        <Modal
            size={'small'}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
        >
            <ModalHeader>{modalHeader}</ModalHeader>
            <ModalContent>
                <p>{modalContent}</p>
            </ModalContent>
            <ModalActions>
                <Button negative onClick={() => setModalOpen(false)}>
                    No
                </Button>
                <Button positive onClick={() => {
                    setModalOpen(false);
                    onClickEvent();
                }}>
                    Yes
                </Button>
            </ModalActions>
        </Modal>
    );
}

export default modalWarning;