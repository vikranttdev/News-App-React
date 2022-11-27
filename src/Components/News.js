import React, { Component } from "react";
import NewsIteam from "./NewsIteam";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    pageSize: 15,
    country: "in",
    category: "general",
  };
  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };
  captilizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("Hello i am constructor");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0

    };
    document.title = `${this.captilizeFirstLetter(this.props.category)}- NewsMonkey`;
  }

  async newsUpdate() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d04298cb66545fab5694ea2f3ae2bf5&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,

    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.newsUpdate();
  }

  /*handleNextClick = async () => {
    console.log("next");

    this.setState({ page: this.state.page + 1 });
    this.newsUpdate();
  };

  handlePrevClick = async () => {
    console.log("Previous");

    this.setState({ page: this.state.page - 1 });
    this.newsUpdate();
  };*/

  fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d04298cb66545fab5694ea2f3ae2bf5&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 })
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,

    })
  }

  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: "20px 0px" ,marginTop:"65px"}}> NewsMonkey -Top {this.captilizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        > <div className="container">
            <div className="row">
              {
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsIteam
                        title={element.title ? element.title.slice(0, 35) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 150)
                            : ""
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author ? element.author : "Unknown"}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
        {/*<div className="container d-flex justify-content-evenly">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevClick}
            className="btn btn-dark"
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>*/}
      </>
    );
  }
}
