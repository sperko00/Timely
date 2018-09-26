import React,{Component} from 'react';

export class Tag extends Component{
    constructor(props)
    {
        super(props);
        this.handleTagRemove = this.handleTagRemove.bind(this);
    }

    handleTagRemove()
    {
        this.props.handleTagRemove(this.props.tag);
    }


    render()
    {
        return(
        <span className="added-tag">
            <span className="added-tag-label">{this.props.tag.name} <span className="badge badge-secondary tag-badge">{this.props.tag.duration}</span></span>
            <span onClick = {this.handleTagRemove} className="added-tag-remove"><i className="fas fa-times"></i></span>
        </span>
        )
    }
}