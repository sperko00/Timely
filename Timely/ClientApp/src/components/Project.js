import React, { Component } from 'react';
import '../css/home.css';
import {convertMS} from '../convertMS.js'

export class Project extends Component {
    
    constructor(props) {
        super(props);
        this.state = {workingTime : 0}
        this.activateProject = this.activateProject.bind(this);
        this.stopProjectSession = this.stopProjectSession.bind(this);
        this.getProjectDetails = this.getProjectDetails.bind(this);
    }
    stopProjectSession()
    {
        
        this.props.stopProjectSession(this.props.projectId,this.state.workingTime);
    
    }
    activateProject()
    {
        this.props.activateProject(this.props.projectId);
    }
    workingTime() {
        if(this.props.isActive === 1)
        {
        var activatedDate = new Date(this.props.ActivatedAt);
        var date = new Date();
        this.setState({workingTime : convertMS(date - activatedDate)})
        }
        else
        {
            this.setState({workingTime : 0})
        }
    }

      componentDidMount() {
        this.interval = setInterval(() => this.workingTime(), 500);
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }
     getProjectDetails()
     {
        this.props.getProjectDetails(this.props.projectId);
     }
    render() {
        var active = null;

        if(this.props.isActive)
        {
            active = 
            <div className="project-controller">
                <div className="controller-working">
                    <div className="working-time">{this.state.workingTime} h</div>
                    <div onClick={this.stopProjectSession} className="stop-tag">Stop</div>
                </div>
            </div>
        }
        else if(this.props.isDisabled)
        {
            active=
            <div className="project-controller">
                <span className="controller-play"><i className="play-icon grayed fas fa-play"></i></span>
            </div>
        }
        else
        {
            active=
            <div className="project-controller">
                <span className="controller-play"><i onClick = {this.activateProject} className="play-icon fas fa-play"></i></span>
            </div>
        }
        

    return (
        <div className="col-sm-6 col-lg-4 project-container">
            <div className="project shadow rounded">
            <div className="project-left">
            <div className="project-name font-weight-bold">{this.props.name}</div>
            <div onClick = {this.getProjectDetails} className="project-details">Project details <span><i className="fas fa-arrow-right"></i></span></div>
            </div>
            <div className="project-right">
                {active}
            </div>
            </div>
        </div>
    );
  }
}
