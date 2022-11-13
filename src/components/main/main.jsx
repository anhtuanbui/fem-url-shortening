import React, { Component } from 'react';
import working from '../../images/illustration-working.svg';
import brandRecognition from '../../images/icon-brand-recognition.svg';
import detailedRecords from '../../images/icon-detailed-records.svg';
import fullyCustomizable from '../../images/icon-fully-customizable.svg';
import { ReactComponent as Threedots } from '../../images/threedots.svg';

import './main.scss';

const cards = [
  {
    icon: brandRecognition,
    title: 'Brand Recognition',
    description: 'Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.'
  },
  {
    icon: detailedRecords,
    title: 'Detailed Records',
    description: 'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.'

  },
  {
    icon: fullyCustomizable,
    title: 'Fully Customizable',
    description: 'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.'
  }
];

const API_URL = 'https://api.shrtco.de/v2/shorten?url=';

var app = {
  link: '',
  shortLink: '',
  copied: false,
  menuOpened: false,
  error: false,
  history: []
}

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
    this.onCopyClicked = this.onCopyClicked.bind(this);
    this.onThreeDotsClick = this.onThreeDotsClick.bind(this);

    if (localStorage.getItem('history')) {
      app.history = JSON.parse(localStorage.getItem('history'));
    }

    this.state = app;
  }

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
  }

  onDocumentClick = (e) => {
    if (e.target.tagName !== 'svg') {
      app.history.forEach((item) => {
        item.menuOpened = false;
      });
      this.setState(app);
    }
  }

  onShortLinkInputChange = (e) => {
    const link = e.target.value;
    app.link = link;
  }

  onCopyClicked = (index) => {
    navigator.clipboard.writeText(app.history[index].shortLink);
    app.history[index].copied = true;
    this.setState(app);

    app.history.forEach((item, historyIndex) => {
      if (historyIndex !== index) {
        item.copied = false;
      }
    })
  }

  onShortLinkClick = (e) => {
    e.preventDefault();
    var url = API_URL + app.link;
    this.getLink(url);
  }

  onThreeDotsClick = (index) => {
    app.history[index].menuOpened = !app.history[index].menuOpened;
    app.history.forEach((item, historyIndex) => {
      if (historyIndex !== index) {
        item.menuOpened = false;
      }
    });
    this.setState(app);
  }

  onDelete = (index) => {
    app.history.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(app.history));
    this.setState(app);
  }

  getLink = async (link) => {
    if (app.link === '') {
      app.error = true;
      this.setState(app);
      return;
    }

    const response = await fetch(link);
    const data = await response.json();
    if (data.ok) {
      app.shortLink = data.result.full_short_link;
    } else {
      app.error = true;
    }
    app.history.push({
      link: app.link,
      shortLink: app.shortLink,
      copied: app.copied
    });

    localStorage.setItem('history', JSON.stringify(app.history));

    this.setState(app);
  }

  render() {
    return (
      <main>
        <section className='hero'>
          <div className="hero__background">
            <img src={working} alt="illustration working" />
          </div>
          <div className="container">
            <div className="hero__info">

              <h1>More than just shorter links</h1>
              <p>Build your brand’s recognition and get detailed insights on how your links are performing.</p>
              <GetStarted />
            </div>
          </div>
        </section>

        <div className="mid-sections">

          <section className='short-link'>
            <div className="container">
              <form>
                <div className="short-link__form-wrapper">
                  <div className="short-link__form">
                    <input type="text" name='short-link__input' onChange={this.onShortLinkInputChange} placeholder="Shorten a link here..." />
                    <p className={`short-link__form-error ${app.error ? 'short-link__form-error--active' : ''}`}>Please add a link</p>
                    <button className="button button__shorten" type='submit' onClick={this.onShortLinkClick} >Shorten It!</button>
                  </div>
                </div>
              </form>
            </div>
          </section>

          <section className="result">
            <div className="container">
              {
                app.history.map((item, index) => (
                  <ShortLink key={index} index={index} values={item} handleClick={this.onCopyClicked} threedotsClick={this.onThreeDotsClick} deleteClick={this.onDelete}/>
                ))
              }
            </div>
          </section>

          <section className='features'>
            <div className="container">


              <div className="features__info">
                <h2>Advanced Statistics</h2>
                <p>Track how your links are performing across the web with our
                  advanced statistics dashboard.</p>
              </div>

              <div className="features__middle"></div>

              <div className="features__cards">
                {cards.map((card, index) => (
                  <Card key={index} icon={card.icon} title={card.title} description={card.description} />
                ))}
              </div>
            </div>
          </section>

          <section className="get-started">
            <div className="container">
              <div className="get-started__info">
                <h2>Boost your links today</h2>
                <GetStarted />
              </div>
            </div>
          </section>

        </div>
      </main>
    )
  }
}

const GetStarted = () => {
  return (
    <button className='button button__sign-up'>Get Started</button>
  )
}

const Card = ({ icon, title, description }) => {
  return (
    <div className="card">
      <div className="card__icon">
        <img src={icon} alt="icon" aria-hidden="true" />
      </div>
      <div className="card__info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

const ShortLink = ({ values, index, handleClick, threedotsClick, deleteClick }) => {
  var item = values;

  return (
    <div className="shorted-link__wrapper">
      <div className="shorted-link__menu">
        <button className="button button__three-dots button__small" onClick={event => threedotsClick(index)}><Threedots /></button>
        <div className={`shorted-link__menu-buttons ${app.history[index].menuOpened ? 'shorted-link__menu-buttons--active' : ''}`}>
          <button className="button button__delete button__small" onClick={event => deleteClick(index)}>Delete</button>
        </div>
      </div>
      <div className="shorted-link">

        <p className='shorted-link__original'>{item.link}</p>
        <p className="shorted-link__shortened"><a href={item.shortLink}>{item.shortLink}</a></p>
        <button className={`button button__round-corner ${app.history[index].copied ? 'button__round-corner--active' : ''}`} onClick={event => handleClick(index)}>{item.copied ? "Copied" : "Copy"}</button>
      </div>
    </div>
  )
}
