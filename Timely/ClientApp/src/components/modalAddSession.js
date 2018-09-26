import React,{Component} from 'react';
import Modal from 'react-bootstrap4-modal';
import '../css/modalSession.css';
import {convertMS} from '../convertMS.js'
import { ModalAddTag } from './modalAddTag';
import {Tag} from './tagComponent.js';
import { ModalAlert } from './modalAlert';

export class ModalAddSession extends Component{

    constructor(props)
    {
        super(props);
        this.state = {description : '',tags : [],durationMS : 0,addTag : false,addTagAlert : false};
        this.getDescription = this.getDescription.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onClose = this.onClose.bind(this);
        this.handleAddTag = this.handleAddTag.bind(this);
        this.cancelTagAdding = this.cancelTagAdding.bind(this);
        this.showTagDialog = this.showTagDialog.bind(this);
        this.handleTagRemove = this.handleTagRemove.bind(this);
    }
    componentWillReceiveProps(nextProps)
    {
      
        if(this.props !== nextProps && nextProps.session !== null)
        {
        var StartTime = new Date(nextProps.session.StartTime);
        var EndTime = new Date(nextProps.session.EndTime);
        var durationMS = EndTime - StartTime;
        var untaggedMinutes = Math.floor(durationMS / 60000);
        this.setState({duration : durationMS, untaggedMinutes : untaggedMinutes});
        }
    }
    onClose()
    {
        this.props.closeAddSession();
    }
    getDescription(e)
    {
        this.setState({description : e.target.value});
    }
    onSave()
    {
       this.props.saveSession(this.state.tags,this.state.description);
    }
    showTagDialog()
    {
        if(this.state.untaggedMinutes > 0)
        this.setState({addTag : true});
        else
        {
            this.setState({addTagAlert : true})
        }
    }
    cancelTagAdding()
    {
        this.setState({addTag : false});
    }
    handleTagRemove(tag)
    {
        var tags_filtered = this.state.tags.filter(item => item !== tag);
        this.setState({tags : tags_filtered , untaggedMinutes : this.state.untaggedMinutes + tag.duration});
    }
    
    handleAddTag(tagLabel,tagDuration)
    {
        var newTag = {name : tagLabel,duration : tagDuration};

        var tags = this.state.tags;

        var index = -1;
        tags.forEach((item,i) => 
        {
            if(item.name === tagLabel)
            index = i;
            
        })
        if(index === -1)
        {
            tags.push(newTag);
        }
        else
        {
            tags[index].duration += tagDuration; 
        }
        
        this.setState({addTag : false,tags : tags,untaggedMinutes : this.state.untaggedMinutes - tagDuration})
    }
    render()
    {
        var tagList = null;
        if(this.state.tags.length > 0)
        {
            tagList = this.state.tags.map((tag,i) =>
            <Tag key = {i} handleTagRemove = {this.handleTagRemove} tag = {tag} />
            
            )
        }
      
        return(
            <div>
            <Modal visible={this.props.visible} onClickBackdrop={this.modalBackdropClicked}>
                <div className="modal-header modal-session-header">
                    <h5 className="modal-title modal-session-title">Work session finished!</h5>
                    <h6 className="modal-session-subtitle">You worked for {convertMS(this.state.duration)}. Here you can add more details about this work session.</h6>
                </div>
                <div className="modal-body">
                <p>Description</p>
                <textarea className="form-control" rows="5" onChange = {this.getDescription} value={this.state.description}></textarea>
                <div className="add-session-tags">

                    <button onClick ={this.showTagDialog} className="btn btn-outline-primary btn-add-tag">+ Tag</button>
                    {tagList}
                </div>                
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.onClose}>
                    Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={this.onSave}>
                    Save session
                </button>
                </div>
            </Modal>
            <ModalAddTag visible = {this.state.addTag} untaggedMinutes = {this.state.untaggedMinutes} handleAddTag = {this.handleAddTag} cancelTagAdding = {this.cancelTagAdding}/> 
            <ModalAlert visible = {this.state.addTagAlert} title = {"Warning"} body = {"All minutes in this session are tagged."} handleOK = {() => this.setState({addTagAlert : false})} />
            </div>
        )
    }
}