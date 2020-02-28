import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

class AdminNavbar extends React.Component {
  state = {
    isOpen: false,
    dropdownOpen: false,
    color: "transparent",
  }

  sidebarToggle = React.createRef()

  toggle = () => {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent"
      })
    } else {
      this.setState({
        color: "white"
      })
    }

    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  dropdownToggle = e => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  openSideBar = () => {
    document.documentElement.classList.toggle("nav-open")
    this.sidebarToggle.current.classList.toggle("toggled")
  }

  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "white"
      })
    } else {
      this.setState({
        color: "transparent"
      })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this))
  }

  componentDidUpdate(e) {
    console.log("window innerWidth: ", window.innerWidth)
  }

  render() {
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          window.location.href.indexOf("full-screen-maps") !== -1
            ? "white"
            : this.state.color
        }
        expand="lg"
        className={
          window.location.href.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute "
            : "navbar-absolute " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                className="navbar-toggler"
                ref={this.sidebarToggle}
                onClick={() => this.openSideBar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />  
              </button>
            </div>
            <NavbarBrand>{this.props.brandText}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            <form>
              <InputGroup className="no-border">
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="now-ui-icons ui-1_zoom-bold" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </form>
            <Nav navbar>
              <NavItem>
                <Link to="#lonecode" className="nav-link">
                  <i className="now-ui-icons media-2_sound-wave" />
                  <p>
                    <span className="d-lg-none d-md-block">Stats</span>
                  </p>
                </Link>
              </NavItem>
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={e => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="now-ui-icons location_world" />
                  <p>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="a">Action</DropdownItem>
                  <DropdownItem tag="a">Another Action</DropdownItem>
                  <DropdownItem tag="a">Something else here</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <Link to="#lonecode" className="nav-link">
                  <i className="now-ui-icons users_single-02" />
                  <p>
                    <span className="d-lg-none d-md-block">Account</span>
                  </p>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

AdminNavbar.defaultProps = {
  brandText: "Default Brand Text"
}

AdminNavbar.propTypes = {
  // string for the page name
  brandText: PropTypes.string
}

export default AdminNavbar