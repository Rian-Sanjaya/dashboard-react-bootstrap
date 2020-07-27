import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid}>
          <nav>
            <ul>
              <li>
                <a
                  href="https://rian-sanjaya.github.io"
                  className="mr-4-px"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LoneCode
                </a>
              </li>
              <li>
                <a
                  href="https://rian-sanjaya.github.io"
                  className="mr-4-px"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://rian-sanjaya.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright">
            &copy; {1900 + new Date().getYear()}, Designed by{" "}
            <a href="https://rian-sanjaya.github.io" target="_blank" rel="noopener noreferrer">
              LoneCode
            </a>
            . Coded by{" "}
            <a
              href="https://rian-sanjaya.github.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              LoneCode
            </a>
            .
          </div>
        </Container>
      </footer>
    )
  }
}

Footer.defaultProps = {
  default: false,
  fluid: false,
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
}

export default Footer