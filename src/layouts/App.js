import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import '../assets/css/now-ui-dashboard.css'

import AdminLayout from './Admin'

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/admin"
          render={ props => {
            return <AdminLayout {...props} />
          }}
        />
        <Redirect to="/admin/dashboard" />
      </Switch>
    </Router>
  );
}

export default App;
