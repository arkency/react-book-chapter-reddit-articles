import React, { useState } from "react";

function ArticleList(props) {
  const [articles, updateArticles] = useState(props.initialArticles);

  const sortedArticles = () => {
    return [].concat(articles).sort((articleOne, articleTwo) => {
      if (articleOne.score == articleTwo.score) return 0;
      if (articleOne.score > articleTwo.score) return -1;
      return 1;
    });
  };

  const upvote = articleIndex => {
    const article = articles[articleIndex];
    updateArticles([
      ...articles.slice(0, articleIndex),
      { ...article, score: article.score + 1 },
      ...articles.slice(articleIndex + 1)
    ]);
  };

  const handleUpvoting = article => {
    return ev => {
      ev.preventDefault();
      upvote(articles.indexOf(article));
    };
  };

  return (
    <ul>
      {sortedArticles().map(article => (
        <li key={article.url}>
          ({article.score}) <a href={article.url}>{article.title}</a>{" "}
          <a href="#" onClick={handleUpvoting(article)}>
            upvote
          </a>
        </li>
      ))}
    </ul>
  );
}

ArticleList.defaultProps = {
  initialArticles: [
    {
      title: "What React component class syntax should I use?",
      url:
        "http://reactkungfu.com/2015/07/what-react-component-class-syntax-should-i-use/",
      score: 2
    },
    {
      title: "Why are we using React.js in our projects?",
      url:
        "http://reactkungfu.com/2015/07/why-are-we-using-react-js-in-our-projects/",
      score: 4
    },
    {
      title: "Approaches to testing React components - an overview",
      url:
        "http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/",
      score: 3
    }
  ]
};

export default ArticleList;
