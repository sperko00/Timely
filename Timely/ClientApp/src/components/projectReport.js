import React, { Component } from 'react';
import '../css/details.css'
import {convertMS} from '../convertMS.js';
import {convertMIN} from '../convertMIN.js';
import {ChartComponent} from './chartComponent.js';

const colors = ["#0a27ff","#b400da","#f000ae","#ff0083","#ff005c","#ff4a3a","#ff7f19",
"#ffa600","#00ff0d","#72f400","#9ce800","#bbdb00","#d3ce00","#e6c100","#f4b300","#ffa600",];
export class ProjectReport extends Component{

    constructor(props)
    {
        super(props);
        var projectId = this.props.match.params["projectId"];
        this.state = { isLoading : true ,noProject : false,tag_list : [],timeInMS : 0};  
        this.calculateTotalTime = this.calculateTotalTime.bind(this);
        this.getTagTime = this.getTagTime.bind(this);
        this.showProjectDetails = this.showProjectDetails.bind(this);

        if(this.props.location.state !== undefined)
        {
            
            this.state = {project : this.props.location.state.project,totalTime : this.props.location.state.totalTime,timeInMS : this.props.location.state.timeInMS, isLoading : false};
            this.getTagTime();
        }
        else
        {
            fetch("api/Project/GetProjectDetails/" + projectId)
            .then(response => response.json())
            .then(data => {
                if(data[0] !== undefined)
                {
                this.setState({project : data[0] , isLoading : false});
                this.calculateTotalTime();
                this.getTagTime();
                }
                else
                {
                    this.setState({noProject : true,isLoading : false})
                }
            });
        }
    
    }
    calculateTotalTime ()  
    {
        var time = 0;
        this.state.project.sessions.forEach(session => {
            time += new Date(session.endTime) - new Date(session.startTime);
        });
        const timeMS = time;
        const converted = convertMS(time);
        this.setState({totalTime : converted,timeInMS : timeMS })
    }
    getTagTime()
    {
        var tag_list = [];
        var isInList = false;
        var tags_duration_sum = 0;
        this.state.project.sessions.forEach(session => {
            session.tags.forEach((tag,i) => {
                isInList = false;
                tags_duration_sum +=tag.duration;
                for(let i = 0; i< tag_list.length;i++)
                {
                    if(tag_list[i].name === tag.name)
                    {

                        tag_list[i].duration += tag.duration;
                        isInList = true;
                        break;
                    }
                }                
                if(!isInList)
                    tag_list.push(tag);
            })
       })
       var time_difference = this.state.timeInMS - tags_duration_sum * 60000;
       
       if(time_difference > 0 && time_difference >= 60000)
       {
           let newTag = {name : "Other",duration : Math.floor(time_difference / 60000)};
           tag_list.push(newTag);
       }
       this.state = {...this.state,tag_list : tag_list};


    }

    showProjectDetails()
    {
        this.props.history.push("/Details/"+ this.state.project.projectId);
    }
    
    render()
    {
      
        var active = this.state.isLoading ? <h1> Loading...</h1> : 
            this.state.noProject ? <h1>There is no project with given id</h1> : 
            <div>
                <div className = "details-heading">
                    <div><span onClick = {this.showProjectDetails} className="details-project-name clickable">{this.state.project.name}</span></div>
                    <h6 className="total-time">Total time spent on project is {this.state.totalTime} hour(s)</h6>
                </div>
                <hr className = "separator"/>
                {
                    
                       this.state.tag_list.length == 0 ? <h1>Nothing to report on this project</h1> :
                       <div className="report-main row">
                        <div className="report-tags-wrap col-12 col-md-6">
                            {
                                this.state.tag_list.map((tag,i) => 
                                
                                    <div key = {i} className="report-tag row">
                                        <div style = {{border : "1px solid"+colors[i],color : colors[i]}} className="col-6 report-tag-name">{tag.name}</div>
                                        <div className="col-6 report-tag-duration">{convertMIN(tag.duration)} hour(s)</div> 
                                    </div>
                                )
                            }
                        </div>
                        <div className="col-12 col-md-6 report-chart-wrap">
                                <ChartComponent colors = {colors} data = {this.state.tag_list}/>
                        </div>
                        </div>
                }      
            </div>
        return(
            <div className="details-wrap">
                {active}
            </div>
        );        
    }

}
