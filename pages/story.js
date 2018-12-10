// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';


const source = 'mtv-news';

const apiKey = 'f8aaba9d9e5045338d52b1281d45c46f';

//const url =`https://newsapi.org/v2/top-headlines?sources=mtv-news&apiKey=f8aaba9d9e5045338d52b1281d45c46f`;
//const url =`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;
const url = `http://www.mtv.com/news/3103754/travis-scott-astroworld-tour-kickoff/`;
// Pass this content as 'props' to child components
const News = props => (
    <div>
        <h2>News from {source.split("-").join(" ")}</h2>
        
        {props.articles.map(article => (
          <section>
            <h3>{article.title}</h3>
            <p className="author">{article.author} {article.publishedAt}</p>
            <img src={article.urlToImage} alt="article image" className="img-article"></img>
            <p>{article.description}</p>
            <p>{article.content}</p>
           
          </section>
        ))}
        
    <style jsx>{`
      section{
        width: 80%;
        border: 2px solid black;
        background-color: rgb(200, 6, 4);
        padding: 5em;
        margin: 5em;
      }

      .author{
        font-style: normal;
        font-size : 1em;
      }
      .img-article{
        max-width: 100%;
      }
    `}</style>
  </div>
 
  );

News.getInitialProps = async function() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Show data fetched. Count : ${data.articles.length}`);

    return{
      articles: data.articles
    }
  }
  
export default News;
