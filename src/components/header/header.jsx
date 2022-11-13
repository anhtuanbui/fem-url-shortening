import React, { Component } from 'react';
import logo from '../../images/logo.svg';

import './header.scss';

const TABLET_BREAKPOINT = 875;

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {hamburgerMenuOpened: false, isTablet: false};
    this.onHamburgerClick = this.onHamburgerClick.bind(this);
  }
  componentDidMount () {
    this.handleResize();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    if (window.innerWidth <= TABLET_BREAKPOINT) {
      document.querySelector('.hamburger-menu').classList.remove('display-none');
      this.setState({isTablet: true});
    } else {
      document.querySelector('.hamburger-menu').classList.add('display-none');
      this.setState({isTablet: false});
    }
  }
  
  onHamburgerClick() {
    document.querySelector('.hamburger-menu').classList.toggle('active');
    this.setState({hamburgerMenuOpened: !this.state.hamburgerMenuOpened});
  }
  render() {
    return (
      <header className='container'>
        <div className="header">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className={`nav ${this.state.hamburgerMenuOpened && this.state.isTablet?'nav--open':''}`}>

            <div className="nav__left">
              <ul>
                <li><a href="https://">Features</a></li>
                <li><a href="https://">Pricing</a></li>
                <li><a href="https://">Resources</a></li>
              </ul>
            </div>

            <div className="nav__right">
              <button className='button button__login button__menu'>Login</button>
              <button className='button button__sign-up button__menu'>Sign Up</button>
            </div>

          </div>

          <div className="hamburger-menu display-none" onClick={this.onHamburgerClick}>
            <div className='hamburger-menu__line hamburger-menu__line--1'></div>
            <div className='hamburger-menu__line hamburger-menu__line--2'></div>
            <div className='hamburger-menu__line hamburger-menu__line--3'></div>
          </div>
        </div>

        <div className="test">
          
        </div>
      </header>
    )
  }
}
