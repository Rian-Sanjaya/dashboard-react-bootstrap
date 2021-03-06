import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Nav, Collapse, Button } from 'reactstrap'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import logo from '../../logo-white.svg'

var ps

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openAvatar: false,
      ...this.getCollapseStates(props.routes)
    }

    this.sidebar = React.createRef()
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    // to stop the warning of calling setState of unmounted component
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {}
    
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        }
      }

      return null
    })

    return initialState
  }

  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }

  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        var st = {}
        st[prop["state"]] = !this.state[prop.state]
        
        return (
          <li
            className={this.getCollapseInitialState(prop.views) ? "active" : ""}
            key={key}
          >
            <a
              href="#rian"
              data-toggle="collapse"
              aria-expanded={this.state[prop.stat]}
              onClick={e => {
                e.preventDefault()
                this.setState(st)
              }}
            >
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <p>
                    {prop.name}
                    <b className="caret" />
                  </p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini-icon">{prop.mini}</span>
                  <span className="sidebar-normal">
                    {prop.name}
                    <b className="caret" />
                  </span>
                </>
              )}
            </a>
            <Collapse isOpen={this.state[prop.state]}>
              <ul className="nav">{this.createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        )
      }

      return (
        <li className={this.activeRoute(prop.layout + prop.path)} key={key}>
          <NavLink to={prop.layout + prop.path} activeClassName="">
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </> 
            ) : (
              <>
                <span className="sidebar-mini-icon">{prop.mini}</span>
                <span className="sidebar-normal">{prop.name}</span>
              </>
            )}
          </NavLink>
        </li>
      )
    })
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return window.location.href.indexOf(routeName) > -1 ? "active" : ""
  }

  render() {
    // console.log(this.props)
    // console.log(this.state)

    return (
      <>
        <div className="sidebar" data-color={this.props.backgroundColor}>
          <div className="logo">
            <a
              href="https://rian-sanjaya.github.io"
              className="simple-text logo-mini"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="logo-img">
                <img src={logo} alt="react-logo" />
              </div>
            </a>
            <a
              href="https://rian-sanjaya.github.io"
              className="simple-text logo-normal"
              target="_blank"
              rel="noopener noreferrer"
            >
              LoneCode
            </a>
            <div className="navbar-minimize">
              <Button
                outline
                className="btn-round btn-icon"
                color="neutral"
                id="minimizeSidebar"
                onClick={() => this.props.minimizeSidebar()}
              >
                <i className="now-ui-icons text_align-center visible-on-sidebar-regular" />
                <i className="now-ui-icons design_bullet-list-67 visible-on-sidebar-mini" />
              </Button>
            </div>
          </div>
          <div className="sidebar-wrapper" ref={this.sidebar}>
            <Nav>{this.createLinks(this.props.routes)}</Nav>
          </div>
        </div>
      </>
    )
  }
}

Sidebar.defaultProps = {
  routes: [],
  showNotification: false,
  backgroundColor: "blue",
  minimizeSidebar: () => {}
}

Sidebar.propTypes = {
  // links that are rendered
  routes: PropTypes.arrayOf(PropTypes.object),
  // if you want to show a notification when switching between min sidebar and normal
  showNotification: PropTypes.bool,
  backgroundColor: PropTypes.oneOf([
    "blue", "yellow", "green", "orange", "red"
  ]),
  // function that is called upon pressing the button near the logo
  minimizeSidebar: PropTypes.func
}

export default Sidebar