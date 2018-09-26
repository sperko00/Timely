import React,{Component} from 'react';
import Modal from 'react-bootstrap4-modal';
import '../css/addTag.css';
import Slider from '@material-ui/lab/Slider';

export class ModalAddTag extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {tagLabel : '',sliderValue : 0,labelIncorrect : false};
        this.getTagName = this.getTagName.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onClose = this.onClose.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
    }
    
    componentWillReceiveProps(nextProps)
    {
        if(this.props !== nextProps)
        {
            if(nextProps.untaggedMinutes > 0)
            {
                this.setState({tagLabel : '',sliderValue : nextProps.untaggedMinutes,sliderMax : nextProps.untaggedMinutes})
            }
        }
    }
    getTagName(event)
    {
        this.setState({tagLabel:event.target.value});
    }
    onClose()
    {
        this.props.cancelTagAdding();
    }
    capitalizeFirstLetter(str)
    {

        if(str.length === 1)
        {
            return str.toUpperCase();
        }
        else
        {
            return str[0].toUpperCase() + str.slice(1).toLowerCase();
        }
    }
    onSave()
    {
       
        if(this.state.tagLabel.length !== 0)
        {
            var label = this.capitalizeFirstLetter(this.state.tagLabel)
            this.props.handleAddTag(label,this.state.sliderValue);
        }
        else
        {
            
        }
    }
    handleSliderChange (event,value)
    {
        if(value > 0)
        {
            this.setState({ sliderValue : value });
        }
        else
        {
            this.setState({ sliderValue : 1});
        }
        
    };
    componentDidUpdate(prevProps, prevState) {
        this._input.focus();
      }

    render()
    {
        
        return(
            <Modal visible={this.props.visible} onClickBackdrop={this.modalBackdropClicked}>
                <div className="modal-header addtag-header">
                <h5 className="modal-title addtag-title">Add new tag</h5>
                <h6>This session has <b>{this.props.untaggedMinutes} minutes </b> untagged.</h6>
                </div>
                <div className="modal-body">
                <div className="tag-name-container">
                <div className="tag-name-label"><b>Tag label</b></div>
                <input autoFocus={true} ref={c => (this._input = c)} type="text" className="form-control tag-label-input" onChange={this.getTagName} value={this.state.tagLabel}/>
                </div>
                <div className="tag-slider-container">
                    <span className="tag-slider-label"><b>Select tag duration</b></span>
                    <div className="slider-labels">
                        <span className="slider-min"><b>{1} minute</b></span>
                        <span className="slider-max"><b>{this.state.sliderMax} minutes</b></span>
                    </div>
                    <Slider min = {0} max = {this.state.sliderMax} onChange = {this.handleSliderChange} step = {1} value ={this.state.sliderValue}/>
                    <span className="slider-current"><b>Duration : {this.state.sliderValue} min</b></span>
                </div>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.onClose} >
                    Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={this.onSave}>
                    Add tag
                </button>
                </div>
            </Modal>
        )
    }
}