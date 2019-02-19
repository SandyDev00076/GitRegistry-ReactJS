import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom';
import UserEntry from './components/UserEntryPage';
import UserDetails from './components/UserDetailsPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path={`/users/:handle`} component={UserDetails}/>
          <Route exact path={``} component={UserEntry}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
