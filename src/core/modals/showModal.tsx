import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import Modal from '../components/Modal/Modal';

export interface ModalOptions {
    disableClose: boolean;
    onClose?: () => void;
    modalClass?: string;
    iconClass?: string;
}

let modalRootDOM: Root | undefined;

/**
 * Closes the modals
 * @returns {void}
 */
const closeModal = (): void => {
    document.body.classList.remove('modal-open');
    modalRootDOM?.unmount();
};

/**
 * Builds and show a modal with a custom body.
 * @param {React.ReactNode} body component to be displayed on the modal.
 * @param {ModalOptions} options modal configuration options.
 * @returns {void}
 */
const showModal = async (body: React.ReactNode, options: ModalOptions): Promise<void> => {
    // Renders the modal with the options
    const modal: JSX.Element = (
        <Modal
            modalClass={options.modalClass}
            disableClose={options.disableClose}
            onClose={options.onClose}
            iconClass={options.iconClass}
        >
            {body}
        </Modal>
    );

    const modalRoot = document.getElementById('modalRoot');
    if (!modalRoot) {
        console.error('html element with ID modalRoot is missing');
        return;
    }

    modalRootDOM = createRoot(modalRoot);
    modalRootDOM.render(modal);
    document.body.classList.add('modal-open');    
};

export { showModal, closeModal };
