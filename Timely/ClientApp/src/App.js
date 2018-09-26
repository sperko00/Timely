import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';
import { Details } from './components/Details.js';
import { ProjectReport } from './components/projectReport';

export default class App extends Component {
  displayName = App.name

    render() {
    return (
      <div>
        <Route exact path='/'  component={Home} />
        <Route path='/Details/:projectId' component={Details} />
        <Route path='/Report/:projectId' render = {props => <ProjectReport {...props} />} />
      </div>
    );
  }
}
