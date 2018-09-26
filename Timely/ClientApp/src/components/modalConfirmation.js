import React,{Component} from 'react';
import Modal from 'react-bootstrap4-modal';

export class ModalConfirmation extends Component{

    render()
    {
        return(
            <Modal visible={this.props.visible} onClickBackdrop={this.modalBackdropClicked}>
                <div className="modal-header">
                <h5 className="modal-title">Delete project</h5>
                </div>
                <div className="modal-body">
                <p>Sure you want delete <b>{this.props.name}</b>?</p>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.props.onCancel}>
                    Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={this.props.onConfirm}>
                    Confirm
                </button>
                </div>
            </Modal>
        )
    }
}