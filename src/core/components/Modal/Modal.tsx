import * as React from 'react';

interface ModalProps {
    children: React.ReactNode;
    disableClose?: boolean;
    onClose?: () => void;
    modalClass?: string;
    iconClass?: string;
}

class Modal extends React.Component<ModalProps> {
    public constructor(props: ModalProps) {
        super(props);

        this.onCloseClicked = this.onCloseClicked.bind(this);
    }

    /**
     * Functionality when the user click on the close button.
     * @returns {void}
     */
    private onCloseClicked(): void {
        if (this.props.disableClose) {
            return;
        }

        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    // #region Render Methods
    /**
     * Renders the header of the modal.
     * @returns {JSX.Element | null} html to be rendered
     */
    public renderHeader(): JSX.Element | null {
        const closeButton = this.props.disableClose ? null : (
            <span role="button" className="close-modal-button" onClick={this.onCloseClicked}>
                <span />
            </span>
        );

        if (!this.props.disableClose) {
            return (
                <div className="header">
                    {this.props.iconClass ? <div className="modal-icon"><i className={this.props.iconClass} /></div> : null}
                    {closeButton}
                </div>
            );
        }

        return null;
    }

    // #endregion

    // Main Render Function
    public render(): JSX.Element {
        return (
            <div className={`modal ${this.props.modalClass}`}>
                <div className="frame">
                    {this.renderHeader()}
                    {this.props.children}
                </div>
                <div role="presentation" className="overlay" onClick={this.onCloseClicked} />
            </div>
        );
    }
}

export default Modal;
