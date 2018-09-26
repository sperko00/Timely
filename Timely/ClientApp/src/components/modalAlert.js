import React,{Component} from 'react';
import Modal from 'react-bootstrap4-modal';

export class ModalAlert extends Component{

    render()
    {
        return(
            <Modal visible={this.props.visible} onClickBackdrop={this.modalBackdropClicked}>
                <div className="modal-header">
                <h5 className="modal-title">{this.props.title}</h5>
                </div>
                <div className="modal-body">
                <p>{this.props.body}</p>
                </div>
                <div className="modal-footer">
                
                <button type="button" className="btn btn-primary" onClick={this.props.handleOK}>
                    OK
                </button>
                </div>
            </Modal>
        )
    }
}