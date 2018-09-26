import React,{Component} from 'react';
import {convertMS} from '../convertMS.js'

export class Session extends Component{

    constructor(props)
    {
        super(props);
        this.showSessionPreview = this.showSessionPreview.bind(this);
    }
    showSessionPreview()
    {  
        this.props.showSessionPreview(this.props.startTime,this.props.endTime,this.props.description,this.props.tags);
    }
    render()
    {
        var tags = this.props.tags;
       
        var tag_list = null;
        if(tags.length > 0)
        {
            tag_list = tags.map((tag,i) =>
            
                <span key = {i} className="session-tag">{tag.name}</span>
            
        )
        }
        else
        {
            tag_list = <span className="tag-message">No tags in this session</span>
        } 
        return(
            
            <div onClick = {this.showSessionPreview} className="session-wrap shadow">
            <div className="session row">
            <div className="session-time col-12 text-center col-sm-3">
            <div className="session-duration"> {convertMS(this.props.duration)}h </div>
            <div className="session-date"> {this.props.endTime.slice(4,15)} </div>
            </div>
            
                <div className="col-12 col-sm-4 text-center session-description"> {this.props.description} </div>
                <div className="col-12 col-sm-4 text-center session-tags"> {tag_list}</div>
                </div>
            </div>
            
        )
    }

}