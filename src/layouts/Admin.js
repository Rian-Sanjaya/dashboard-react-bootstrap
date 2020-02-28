import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// react plugin for creating notifications
import NotificationAlert from 'react-notification-alert'
// javascript plugin used to create scrollbars on Windows
import PerfectScrollbar from "perfect-scrollbar";
import routes from '../routes'
import AdminNavbar from '../components/Navbars/AdminNavbar'
import Sidebar from '../components/Sidebar/Sidebar'

var ps

class Admin extends Component {
  state = {
    sidebarMini: true,
    backgroundColor: "blue"
  }

  notificationAlert = React.createRef()
  mainPanel = React.createRef()

  componentDidMount() {
    // check the operating system the browser running on
    // navigator come with browser (Chrome)
    if (navigator.platform.indexOf("Win") > -1) {
      // running on Windows
      // add the root of document / documentElement (html tag) class
      // remove the html class list of 'perfect-scrollbar-off'
      document.documentElement.className += " perfect-scrollbar-on"
      document.documentElement.classList.remove("perfect-scrollbar-off")
      ps = new PerfectScrollbar(this.mainPanel.current)
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy()
      document.documentElement.className += " perfect-scrollbar-off"
      document.documentElement.classList.remove("perfect-scrollbar-on")
    }
  }

  minimizeSidebar = () => {
    var message = "Sidebar mini ";
    if (document.body.classList.contains("sidebar-mini")) {
      this.setState({ sidebarMini: false });
      message += "deactivated...";
    } else {
      this.setState({ sidebarMini: true });
      message += "activated...";
    }
    document.body.classList.toggle("sidebar-mini");
    var options = {};
    options = {
      place: "tr",
      message: message,
      type: "primary",
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7
    };
    this.notificationAlert.current.notificationAlert(options);
  };

  getRoutes = routes => {
    return routes.map((prop, idx) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views)
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={idx}
          />
        )
      } else {
        return null
      }
    })
  }

  // return the name of active route
  getActiveRoute = routes => {
    let activeRoute = "Default Brand Text"
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else {
        if (
          window.location.pathname.indexOf(
            routes[i].layout + routes[i].path
          ) !== -1
        ) {
          return routes[i].name
        }
      }
    }
    return activeRoute
  }

  render() {
    return (
      <div className="wrapper">
        <NotificationAlert ref={this.notificationAlert} />
        <Sidebar 
          {...this.props}
          routes={routes}
          backgroundColor={this.state.backgroundColor}
          minimizeSidebar={this.minimizeSidebar}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <AdminNavbar
            {...this.props}
            brandText={this.getActiveRoute(routes)}
          />
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Admin