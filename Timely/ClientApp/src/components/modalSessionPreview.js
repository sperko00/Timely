import React,{Component} from 'react';
import Modal from 'react-bootstrap4-modal';

export class ModalSessionPreview extends Component{

    render()
    {
        var tagList = null;
        if(this.props.session.tags.length > 0)
        {
            tagList = this.props.session.tags.map((tag,i) =>
            <span key = {i} className="added-tag">
                <span className="added-tag-label">{tag.name} <span className="badge badge-secondary tag-badge">{tag.duration}</span></span>
            </span>
            )
        }
        return(
            <Modal visible={this.props.visible} onClickBackdrop={this.modalBackdropClicked}>
                <div className="modal-header modal-session-header">
                    <h5 className="modal-title modal-session-title">Work session</h5>
                    <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-5 preview-time"><b>START TIME </b></div>
                        <div className="col-sm-7 preview-date">{" "+this.props.session.startTime.slice(0,24)}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-5 preview-time"><b>END TIME </b></div>
                        <div className="col-sm-7 preview-date">{" "+this.props.session.endTime.slice(0,24)}</div>
                    </div>
                    </div>
                </div>
                <div className="modal-body">
                
                <p className="preview-description">{this.props.session.description}</p>
                <div className="add-session-tags">
                    {tagList === null ? <h6>No tags in this session</h6> : tagList}
                </div>                
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.props.closeSessionPreview}>
                    Close
                </button>
                </div>
            </Modal>
        )
    }
}