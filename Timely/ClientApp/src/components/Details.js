import React, { Component } from 'react';
import '../css/details.css'
import {convertMS} from '../convertMS.js';
import { ProjectDetails } from './projectDetails';
import {ModalChangeProjectName} from './modalChangeProjectName.js';
import {ModalConfirmation} from './modalConfirmation.js';
export class Details extends Component{

    constructor(props)
    {
        super(props);
        var projectId = this.props.match.params["projectId"];
        this.state = {
            isLoading : true, showReport : false, noProject : false,changeProjectName : false, deleteDialog : false
           };
        this.calculateTotalTime = this.calculateTotalTime.bind(this);
        this.showReport = this.showReport.bind(this);
        this.changeProjectName = this.changeProjectName.bind(this);
        this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
        this.handleProjectNameChangeCanceled = this.handleProjectNameChangeCanceled.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.cancelProjectDelete = this.cancelProjectDelete.bind(this);
        this.showDeleteDialog = this.showDeleteDialog.bind(this);
          
        fetch("api/Project/GetProjectDetails/" + projectId)
            .then(response => response.json())
            .then(data => {
                if(data[0] !== undefined)
                {
                this.setState({project : data[0] , isLoading : false})
                this.calculateTotalTime();
                }
                else
                {
                    this.setState({isLoading : false,noProject : true});
                }
            });
        
    }
  
    getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }
    calculateTotalTime ()  
    {
        var time = 0;
        this.state.project.sessions.forEach(session => {
            time += new Date(session.endTime) - new Date(session.startTime);
        });
        var timeInMS = time;
        time = convertMS(time);
        this.setState({totalTime : time, timeInMS : timeInMS})
    }
    
    showReport()
    {
        this.props.history.push({pathname : "/Report/"+ this.state.project.projectId, state : {timeInMS : this.state.timeInMS,project : this.state.project,totalTime : this.state.totalTime}});
    }
    changeProjectName()
    {
        this.setState({changeProjectName : true})
    }
    handleProjectNameChangeCanceled()
    {
        this.setState({changeProjectName : false})
    }
    handleProjectNameChange(newName)
    {
        
        if(newName !== this.state.project.name)
        {
            var newProject = {...this.state.project,
                name : newName
            }
            var form_data = new FormData();
            form_data = this.getFormData(newProject);
            fetch("api/Project/ChangeProjectName",{
                method : 'PUT',
                body : form_data
            }).then(this.props.history.push("/Details/"+this.state.project.projectId)).then(this.setState({changeProjectName : false,  project : {...this.state.project, name : newName}}))
        }
        else
        {
            this.setState({changeProjectName : false})
        }

    }
    showDeleteDialog()
    {
        this.setState({deleteDialog : true})
    }
    deleteProject()
    {
        fetch("api/Project/DeleteProject/"+this.state.project.projectId,{
            method : 'DELETE'
        }).then(response => response.json()).then(data =>
            {
                if(data == 1)
                this.props.history.push("/")
            }
            
        );
    }
    cancelProjectDelete()
    {
        this.setState({deleteDialog : false})
    }
  
    
    render()
    {
        
       var active = this.state.isLoading ? <h1>Loading...</h1> :
       this.state.noProject ? <h1>There is no project with given id</h1> : <div>
            <ProjectDetails deleteProject = {this.showDeleteDialog} changeProjectName = {this.changeProjectName} showReport = {this.showReport} name = {this.state.project.name} isActive = {this.state.project.isActive} totalTime = {this.state.totalTime} sessions = {this.state.project.sessions}/>
            <ModalChangeProjectName onSave = {this.handleProjectNameChange} onClose = {this.handleProjectNameChangeCanceled} currentName = {this.state.project.name} visible = {this.state.changeProjectName} />
            <ModalConfirmation name = {this.state.project.name} visible = {this.state.deleteDialog} onConfirm = {this.deleteProject} onCancel = {this.cancelProjectDelete}/>
            </div>
        return(
            
            <div className="details-wrap">
                {active}
                
            </div>
        
        );        
    }

}
