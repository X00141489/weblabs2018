import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';

const apiKey = 'f8aaba9d9e5045338d52b1281d45c46f';

const defaultNewsSource = 'the-irish-times';

async function getNews(url){
    try{
        const res = await fetch(url);
        const data = await res.json();
        return(data);
    }catch (error){
        return(error);
    }

    export default class News extends React.Component{
        constructor(props){
            super(props)
            this.state = {
                newsSource: "",
                url: "",
                articles: []
            }
        }

        render(){
            if(this.state.articles.length==0){
            this.state.articles=this.props.articles;
            }
            return(
                <div>
                    <h3>{this.state.NewsSource.split("-").join(" ")}</h3>
                    <div>
                        {this.state.articles.map((aricle,index)=>(
                         <section key={index}>
                         <h3>{article.title}</h3>
                         <p className="author">{article.author}{article.publishedAt}</p>
                         <img src={article.urlTpImage}alt ="article image" className="img-article"></img>
                         <p>{article.description}</p>
                         <p>{article.content}</p>
                         <p><Link href="/story"><a>Read More</a></Link></p>
                         <p onClick={this.test}>click...</p>
                         </section>   
                        ))}
                    </div>
                    <style jsx>{`
                    section{
                   width:50%;
                   border:1px solid gray;
                   background-color:rgb(240,248,255);
                   padding:1em;
                   margin:1em;
                    }
                    .author{
                        font-style:italic;
                        font-size:0.8em;
                    }
                    .img-article{
                        max-width:50%;
                    }
                    `}
                    </style>
                </div>
            );
            
        }
    }
}