import React from 'react';
import './index.css';
import defaultImage from '../../assets/default.png'

export class Article extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      latest: [],
    };
  }

  /*
  * Returns the latest UK news feeds
  */
  getNewsFeed = async () => {
    const response = await fetch('http://localhost:8081/latest');
    const latest = await response.json();
    if (response.status !== 200) throw Error(latest.message);
    return latest; 
  };

  componentDidMount = async () => {
    const response = await this.getNewsFeed()
    this.setState({ latest: response });
  }

  formatDate = (publishedAt) => {
    const _date = new Date(publishedAt)
    const _retVal = _date.getDate() + '/' + (_date.getMonth() + 1) + '/' + _date.getFullYear()
    return _retVal
  }

  render() {
    //Displays the latest news or search results
    let items = this.state.latest
    if (this.props.articles && this.props.articles.length) {
      items = this.props.articles
    }

    const articles = items.map((news, i) => (
      <div className="article" key={i}>
        <h1 className="title">{ news.title }</h1>
        <p>
          <a href={news.url}>
            {news.urlToImage ? (
              <img src = {news.urlToImage}/>
            ) : (
              <img src = {defaultImage}/>
            )}
          </a>
        </p>        
        <p className="news-content">{ news.description}</p>        
        {news.publishedAt && <h3 className="author"> Published : {this.formatDate(news.publishedAt)}</h3>}
        {news.author && <h3 className="author"> Author : {news.author}</h3>}
      </div>
    ));
    return  (
      <div id="headlines">{ articles }</div>
    )
  }
}