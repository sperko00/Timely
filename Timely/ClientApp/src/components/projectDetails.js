import React, { Component } from 'react';
import '../css/details.css'
import {Session} from './session.js';
import {ModalSessionPreview} from './modalSessionPreview.js';

export class ProjectDetails extends Component{
    constructor(props)
    {   super(props);
        this.state = {sessionPreview : false,sessionForPreview : null,searchValue : ''};
        this.showSessionPreview = this.showSessionPreview.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.getSessions = this.getSessions.bind(this);

    }
    handleSearchChange(e)
    {
        this.setState({searchValue : e.target.value});
    }
    showSessionPreview(startTime,endTime,description,tags)
    {
        var session = null;
        if(this.state.sessionForPreview === null)
        {
            session = 
            {
            startTime : startTime,
            endTime : endTime,
            description : description,
            tags : tags
            }
        }
        
        this.setState({sessionPreview : !this.state.sessionPreview, sessionForPreview : session});
    }
    getSessions()
    {
        var sessions = this.props.sessions;
        if(this.state.searchValue.slice(0,4) === "tag:")
        {
            var sessionsFilteredTags = sessions.map((session,i) =>{
                var containTag = session.tags.filter(item => item.name.toLowerCase().includes(this.state.searchValue.slice(4).toLowerCase().trim()));
                if(containTag.length > 0)
                    return <Session key={i} showSessionPreview = {this.showSessionPreview} duration = {new Date(session.endTime) - new Date(session.startTime)} startTime = {session.startTime} endTime = {session.endTime} description={session.note} tags={session.tags}/> 
            })

            return sessionsFilteredTags;
        }
        else if(this.state.searchValue.slice(0,5) === "date:")
        {
            var sessionsFilteredDates = sessions.map((session,i) =>{
                if(session.endTime.slice(4,15).toLowerCase().includes(this.state.searchValue.slice(5).toLowerCase().trim()))
                    return <Session key={i} showSessionPreview = {this.showSessionPreview} duration = {new Date(session.endTime) - new Date(session.startTime)} startTime = {session.startTime} endTime = {session.endTime} description={session.note} tags={session.tags}/> 
            })

            return sessionsFilteredDates;
        }
        else
        {
        var sessionsFilteredDescription =
        sessions.map ((session,i) => 
            {
            if(session.note.toLowerCase().includes(this.state.searchValue.toLowerCase().trim()))
            return <Session key={i} showSessionPreview = {this.showSessionPreview} duration = {new Date(session.endTime) - new Date(session.startTime)} startTime = {session.startTime} endTime = {session.endTime} description={session.note} tags={session.tags}/> 
            }
            )
        return sessionsFilteredDescription;
        }   
    }

    render()
    {
        
        var session_list = null;
        var sessionPrevieModal = null;
        if(this.props.sessions.length > 0)
        {

            session_list =  this.getSessions();
        }
        else
        {
            session_list = <h1 className="no-session-note">There is no work sessions in this project</h1>
        }
        if(this.state.sessionForPreview !== null)
        sessionPrevieModal = <ModalSessionPreview visible = {this.state.sessionPreview} closeSessionPreview = {this.showSessionPreview} session = {this.state.sessionForPreview} />
        
        
        return(
           
        <div>
        <div className = "details-heading">
        <div><span className="details-project-name">{this.props.name}</span><span className={this.props.isActive ? "badge badge-danger" : "hidden" }>ACTIVE</span> <span className={this.props.isActive ? "hidden" : "edit-icon"}><i onClick = {this.props.changeProjectName} className="fas fa-edit"></i></span> </div>
        <h6 className="total-time">Total time spent on project is {this.props.totalTime} hour(s)</h6>
        </div>
        <hr className = "separator"/>
        
        <div className="row controls">
        
        <div className="control-btns col-12 col-md-6"> 
            <button onClick = {() => this.props.showReport()} className={this.props.isActive ? "control-btn-active btn btn-outline-success":"control-btn btn btn-outline-success"}>FULL REPORT</button>
            <button onClick = {() => this.props.deleteProject()}className={this.props.isActive ? "hidden": "control-btn btn btn-outline-danger"}>DELETE PROJECT</button>
        </div>
        <div className="col-12 col-md-1"></div> 
        <div className="col-12 col-md-5 col-search"> <input type="text" placeholder="search..." className="form-control search" onChange = {this.handleSearchChange} value={this.state.searchValue}/></div>

        </div>

        <div className="details-session-container container-fluid">
            {session_list}
        
        </div>
        {sessionPrevieModal}
        
        </div>
        );        
    }

}
