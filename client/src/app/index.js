import React from 'react'
import { Article } from '../components/article'
import { Search } from '../components/search'
import './index.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      articles: [],
    };
  }

  /*
  * Updates the article section with news results
  */
  updateNewsFeed = (articles) => {
    this.setState({ articles: articles })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <h1>Latest News - UK</h1>
        <Search onSearch={this.updateNewsFeed} />
        <Article articles={this.state.articles} />
      </div>
    ) 
  }
}

export default App;