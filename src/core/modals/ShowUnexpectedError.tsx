import { closeModal, showModal } from './showModal';

const showUnexpectedError = async (message: string, code: number): Promise<void> => {
    const unexpectedErrorBody: JSX.Element = (
        <div className="body">
            <h2>Unexpected Error</h2>
            <p>
                Sorry about that.
                <span>Our developers have been informed about this. Please try one more time. </span>
            </p>
            <p>{message}</p>
            <h3>
                Code: <span>{code}</span>
            </h3>
        </div>
    );

    return showModal(unexpectedErrorBody, {
        disableClose: false,
        modalClass: 'error-modal',
        onClose: () => closeModal(),
    });
};

export { showUnexpectedError };
