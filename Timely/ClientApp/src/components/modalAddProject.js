import React,{Component} from 'react';
import Modal from 'react-bootstrap4-modal';
export class ModalAddProject extends Component{

    constructor(props)
    {
        super(props);
        this.state = {newProjectName : ''};
        this.projectNameValue = this.projectNameValue.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    projectNameValue(event)
    {
        this.setState({newProjectName:event.target.value});
    }
    onSave()
    {
        this.props.onSave(this.state.newProjectName);
    }

    render()
    {
        return(
            <Modal visible={this.props.visible} onClickBackdrop={this.modalBackdropClicked}>
                <div className="modal-header">
                <h5 className="modal-title">Add new project</h5>
                </div>
                <div className="modal-body">
                <p>Project name</p>
                <input type="text" className="form-control form-control" onChange={this.projectNameValue} value={this.state.newProjectName}/>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>
                    Close
                </button>
                <button type="button" className="btn btn-primary" onClick={this.onSave}>
                    Save
                </button>
                </div>
            </Modal>
        )
    }
}