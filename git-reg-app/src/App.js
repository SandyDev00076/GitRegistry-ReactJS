import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserEntry from './components/UserEntryPage';
import UserDetails from './components/UserDetailsPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={UserEntry}/>
          <Route path="/users/:handle" component={UserDetails}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
