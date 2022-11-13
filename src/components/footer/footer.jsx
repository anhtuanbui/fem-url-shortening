import React, { Component } from 'react';
import { ReactComponent as FacebookIcon } from '../../images/icon-facebook.svg';
import { ReactComponent as InstagramIcon } from '../../images/icon-instagram.svg';
import { ReactComponent as PinterestIcon } from '../../images/icon-pinterest.svg';
import { ReactComponent as TwitterIcon } from '../../images/icon-twitter.svg';

import logo from '../../images/logo.svg';

import './footer.scss';

const links = [
  {
    title: 'Features',
    links: ['Link Shortening', 'Branded Links', 'Analytics']
  },
  {
    title: 'Resources',
    links: ['Blog', 'Developers', 'Support']
  },
  {
    title: 'Company',
    links: ['About', 'Our Team', 'Careers', 'Contact']
  }
];

const socialMedias = [
  {
    icon: <FacebookIcon />,
    link: 'https://'
  },
  {
    icon: <TwitterIcon />,
    link: 'https://'
  },
  {
    icon: <PinterestIcon />,
    link: 'https://'
  },
  {
    icon: <InstagramIcon />,
    link: 'https://'
  }
]

export default class Footer extends Component {
  render() {
    return (
      <footer className='footer'>
        <div className="container">
          <div className="footer-wrapper">

            <div className="footer__logo">
              <img src={logo} alt="logo" />
            </div>

            <div className="footer__links-box">
              {links.map((link, index) => (
                <FooterLinks key={index} link={link} />
              ))}
              <div className="footer__social-medias">
                {
                  socialMedias.map((socialMedia, index) => (
                    <SocialMedia key={index} icon={socialMedia.icon} link={socialMedia.link} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>


      </footer>
    )
  }
}


const FooterLinks = (values) => {
  return (
    <div className="footer__links">
      <h3>{values.link.title}</h3>
      <ul>
        {values.link.links.map((link, index) => (
          <li key={index}><a href="https://">{link}</a></li>
        ))}
      </ul>
    </div>
  )
}

const SocialMedia = (values) => {
  return (
    <div className="footer__social-media">
      <a href={values.link}>{values.icon}</a>
    </div>
  )
}