// This is the Link API
import Link from 'next/link';
// Import fech library
import fetch from 'isomorphic-unfetch';

import SearchForm from '../components/SearchForm';

// New source
const newsSource = 'the-irish-times';

//(free version) API key from  https://newsapi.org/
// Get your own key!
const apiKey = '6ad374741184420585d9ffc877f25a28';

// Build the url which will be used to get the data
// See https://newsapi.org/s/the-irish-times-api
const url = `https://newsapi.org/v2/top-headlines?sources=${newsSource}&apiKey=${apiKey}`;

function formatDate(input) {
  const date = new Date(input);
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const hour = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();


  return `${day} ${monthNames[monthIndex]} ${year} ${hour}:${minutes}`;
}

// Pass this content as 'props' to child components
const News = props => (
    <div>
        <SearchForm />
        { /* Display a title based on source */}
        <h3>News from {newsSource.split("-").join(" ")}</h3>
        <h4>Search: {}</h4>
        <div>
          { /* Iterate through articles using Array map) */}
          { /* Display author, publishedAt, image, description, and content */}
          { /* for each story. Also a link for more.. */}
          {props.articles.map((article, index) => (
            <section key={index}>
              <h3>{article.title}</h3>
              <p className="author">{article.author} {formatDate(article.publishedAt)}</p>
              <img src={article.urlToImage} alt="article image" className="img-article"></img>
              <p>{article.description}</p>
              <p>{article.content}</p>
              <p><Link href="/story"><a>Read More</a></Link></p>
            </section>
          ))}
        </div>

        <style jsx>{`

            section {
              width: 50%;
              border: 1px solid gray;
              background-color: rgb(240, 248, 255);
              padding: 1em;
              margin: 1em;
            }

          .author {
              font-style: italic;
              font-size: 0.8em;
            }
          .img-article {
              max-width: 50%;
            }
        `}</style>
    </div>
  );
  // Get initial data on server side using an AJAX call
  // This will initialise the 'props' for the News page         
  News.getInitialProps = async function() {
    
    // Make async call
    const res = await fetch(url);
    // get json data when it arrives
    const data = await res.json();
    // Log on server side (Node.js + Express)
    console.log(`Show data fetched. Count: ${data.articles.length}`);
  
    // return an array of the articles contained in the data
    // see https://newsapi.org/s/the-irish-times-api for json
    return {
      articles: data.articles
    }
  }

  News.componentDidUpdate = function() {
    console.log("update!!!");
  }
  
export default News;
