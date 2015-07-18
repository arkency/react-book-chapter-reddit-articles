import React from 'react/addons';

class RedditList extends React.Component {
  static defaultProps = {
    initialThreads: [
      { title: "What React component class syntax should I use?", 
        url: "http://reactkungfu.com/2015/07/what-react-component-class-syntax-should-i-use/",
        score: 2
      },
      { title: "Why are we using React.js in our projects?",
        url: "http://reactkungfu.com/2015/07/why-are-we-using-react-js-in-our-projects/",
        score: 4
      },
      { title: "Approaches to testing React components - an overview",
        url: "http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/",
        score: 3
      }
    ]
  };

  state = { threads: this.props.initialThreads };

  upvote = index => {
    let threadToUpvote = this.state.threads[index];

    threadToUpvote.score = threadToUpvote.score + 1;

    this.setState({ threads: [].concat(this.state.threads) });
  };

  handleUpvoteClick = (thread) => {
    return (ev) => {
      ev.preventDefault();
      this.upvote(this.state.threads.indexOf(thread));
    }
  };

  sortedThreads = () => {
    // Sort changes the array.
    // We don't want to change state (except by an explicit setState).
    // [].concat(threads) creates a new list with threads within.

    let {threads} = this.state;
    return [].concat(threads).sort((threadOne, threadTwo) => {
      if(threadOne.score == threadTwo.score) return 0;
      if(threadOne.score > threadTwo.score) return -1;
      if(threadOne.score < threadTwo.score) return 1;
    });
  };

  render() {
    let {threads} = this.state;

    return (
      <ul>
        {this.sortedThreads().map((thread) => 
        <li>
          ({thread.score})
          {' '}
          <a href={thread.url}>
            {thread.title}
          </a>
          {' '}
          <a onClick={this.handleUpvoteClick(thread)} href="#">upvote</a>
        </li>)}
      </ul>
    );
  }
}

export default RedditList;
