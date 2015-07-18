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

  sortedThreads = () => {
    // Sort changes the array.
    // We don't want to change state (except by an explicit setState).
    // [].concat(threads) creates a new list with threads within.

    let {threads} = this.state;
    return [].concat(threads).sort((threadOne, threadTwo) => {
      if(threadOne.score > threadTwo.score) return -1;
      if(threadOne.score < threadTwo.score) return 1;
      return 0;
    });
  };

  render() {
    let {threads} = this.state;

    return (
      <ul>
        {this.sortedThreads().map(thread => 
        <li>
          ({thread.score}){' '}
          <a href={thread.url}>
            {thread.title}
          </a>
        </li>)}
      </ul>
    );
  }
}

export default RedditList;
