import React, { Component } from 'react';
import {Project} from "./Project.js";
import '../css/home.css';


export class ProjectDashboard extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = { projects : this.props.projects};

    }
    
    render() {
        
    return (
        
        <div className="project-dashboard">
                <button onClick = {this.props.addNewProject} className="btn btn-outline-success add-project-btn">Add new project</button>
                 <div className="project-grid row">
                {
                    this.props.projects.map((project,i) => 
                        <Project key = {i} getProjectDetails = {this.props.getProjectDetails} projectId = {project.projectId} name = {project.name} isActive = {project.isActive} isDisabled = {project.isDisabled} ActivatedAt = {project.activatedAt} stopProjectSession = {this.props.stopProjectSession} activateProject = {this.props.activateProject}/>
                    ) 
                }
                </div> 
        </div>
    );
  }
}
