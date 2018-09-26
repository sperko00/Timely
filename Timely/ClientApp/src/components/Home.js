import React, { Component } from 'react';
import {ProjectDashboard} from './projectDashboard.js';
import '../css/home.css';
import {ModalAddProject} from './modalAddProject.js';
import {ModalAddSession} from './modalAddSession.js';
import {ModalAlert} from './modalAlert.js';

export class Home extends Component {
    displayName = Home.name
    constructor(props) {
        super(props);
        this.state = { projects: [], loading: true,addNewProject : false,newProjectName : '',addSession : false,currentSession : null,workingTimeTooShort : false,anyActive : false,modalAlert : false,projectNameExists : false};
        this.getAllProjects = this.getAllProjects.bind(this);
        this.activateProject = this.activateProject.bind(this);
        this.stopProjectSession = this.stopProjectSession.bind(this);
        this.addNewProject = this.addNewProject.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onSave = this.onSave.bind(this);
        this.getProjectDetails = this.getProjectDetails.bind(this);
        this.saveSession = this.saveSession.bind(this);
        this.closeAddSession = this.closeAddSession.bind(this);
        this.closeAlertModal = this.closeAlertModal.bind(this);
        this.closeProjectExists = this.closeProjectExists.bind(this);
    }
    componentWillMount()
    {
        this.getAllProjects();
    }
    getAllProjects()
    {
        fetch('api/Home/GetAllProjects')
            .then(response => 
                    response.json()
                )
            .then(data => {

                var disabled = data.filter(item => item.isActive === 0);
                var inActive = null;
                if(disabled.length !== data.length)
                {  
                    inActive = disabled.map(item => {return {...item,isDisabled : true}})
                    var active = data.filter(item => item.isActive === 1)
                    this.setState({projects : active.concat(inActive),loading : false,anyActive : true })
                }
                else
                {
                    this.setState({ projects: data, loading: false, anyActive : false});
                }
            });
    }
    getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }
    createSession(project,workingTime)
    {
        if(workingTime !== '00:00')
        {
        var session = {
            ProjectId : project.projectId,
            StartTime : project.activatedAt,
            EndTime : new Date().toString(),
            Note : "No description"
        }
        var form_data = new FormData();
        form_data = this.getFormData(session);

        fetch("api/Session/AddSession",{
            method : 'POST',
            body : form_data
        }).then(response => response.json())
        .then(sessionId => this.setState({addSession : true, currentSession : {...session,SessionId : sessionId}}))
        }
        else
        {
           this.setState({modalAlert : true})
        }
        
    }
    stopProjectSession(id,workingTime)
    {
       
        var projects = this.state.projects;
        var dateActivated = 0;
        var sessionProject = 0;
        var activeProject = 0;
        projects.forEach((element) => {
            if(element.projectId === id)
            {
                sessionProject = element;
                dateActivated = element.activatedAt;
                element.isActive = 0;
                element.activatedAt = null;
                activeProject = element;
            }
            else
            {
                element.isDisabled = false;
            }
        })
       
        sessionProject.activatedAt = dateActivated;
        var form_data = new FormData();
        form_data = this.getFormData(activeProject);
        fetch("api/Home/ActivateProject",{
            method : 'PUT',
            body : form_data
        }).then(response => response.json())
        .then(
          this.createSession(sessionProject,workingTime)
        )
        .then(this.setState({projects:projects,anyActive: false}))
    }
    
    activateProject(id)
    {
        var projects = this.state.projects;
        var activeProject = null;
        projects.forEach((element) => {
            if(element.projectId === id)
            {
                element.isActive = 1;
                element.activatedAt = new Date().toString();
                activeProject = element;
            }
            else
            {
                element.isDisabled = true;
            }
        })
        var form_data = new FormData();
        form_data = this.getFormData(activeProject);
        fetch("api/Home/ActivateProject",{
            method : 'PUT',
            body : form_data
        }).then(this.setState({projects : projects,anyActive : true}));
    }
    addNewProject()
    {
        this.setState({addNewProject : true})
    }
    onClose()
    {
        this.setState({addNewProject : false})
    }
    closeAddSession()
    {
        this.setState({addSession : false})
    }
    onSave(name)
    {
        var exists = false;
        this.state.projects.forEach(element => {
            if(element.name === name)
                exists = true;
        });
        if(!exists)
        {
        var newProject = {
            name : name
        }
        var form_data = new FormData();
        form_data = this.getFormData(newProject);
        
        fetch("api/Home/AddProject",{
            method : 'POST',
            body : form_data
        }).then(response => response.json())
        .then(projectId => 
            {

                newProject = {...newProject, projectId : projectId, isActive : 0, isDisabled : this.state.anyActive,activatedAt : null}
                let projects  = this.state.projects;
                projects.push(newProject);
                this.setState({projects : projects,addNewProject : false})
            }
            );
        }
        else
        {
            this.setState({projectNameExists : true})
        }
    }

    saveSession(tags,description)
    {
        if(description.length > 0)
        {   
            var session = {...this.state.currentSession, Note : description}
            var session_form = new FormData();
            session_form = this.getFormData(session);
            fetch("api/Session/UpdateSession",{
                method : 'PUT',
                body : session_form
            }).then(this.updateTags(this.state.currentSession.SessionId,tags))
        }
        else
        {
            this.updateTags(this.state.currentSession.SessionId,tags);
        }
    }
    updateTags(SessionId,tags)
    {   var tag_form = new FormData();
        if(tags.length > 0)
        {
            tags.forEach((tag,i) => 
                {
                    tag.sessionId = SessionId;
                    tag_form = this.getFormData(tag);
                    fetch("api/Session/UpdateTags",{
                        method : 'POST',
                        body : tag_form,
                    }).then( 
                        this.setState({addSession : false})
                        );
                })
        }
        else
        {
            this.setState({addSession : false})
        }
    }
    getProjectDetails(projectId)
    {
        this.props.history.push("/Details/" + projectId)
    }
    closeAlertModal()
    {
        this.setState({modalAlert : false})
    }
    closeProjectExists()
    { 
        this.setState({projectNameExists : false})
    }

    render() {
        var active = this.state.loading ? <h1>Loading...</h1> : 
        <ProjectDashboard getProjectDetails = {this.getProjectDetails} addNewProject = {this.addNewProject} projects = {this.state.projects} stopProjectSession = {this.stopProjectSession} activateProject = {this.activateProject}/>;
    return (
       
            <div className="container-fluid home-wrap">
                <div className="heading" >Timely</div>
                <hr className="separator"/>
                {active}
                <ModalAddProject onSave = {this.onSave} onClose = {this.onClose} visible= {this.state.addNewProject}/>
                <ModalAddSession visible = {this.state.addSession} session = {this.state.currentSession} saveSession = {this.saveSession} closeAddSession = {this.closeAddSession}/>
                <ModalAlert visible = {this.state.modalAlert} title = "Warning" body="Work session lasted less than a minute. It wont be saved." handleOK = {this.closeAlertModal}/>
                <ModalAlert visible = {this.state.projectNameExists} title = "Warning" body="Project name you entered already exists. Please try something else" handleOK = {this.closeProjectExists}/> 
            </div>
    );
  }
}
