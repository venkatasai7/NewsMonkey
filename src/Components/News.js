import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  state = {
    articles: [],
    loading: false,
    page: 1,
    totalResults: 0,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    document.title = `${this.props.category[0].toUpperCase() + this.props.category.slice(1)} - NewsMonkey`;
  }

  handlePrevClick = async () => {
    const newPage = this.state.page - 1;
    if (newPage > 0) {
      this.setState({ loading: true });
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${newPage}&pageSize=${this.props.pageSize}`;
      const data = await fetch(url);
      const parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: newPage,
        loading: false,
      });
    }
  };

  handleNextClick = async () => {
    const newPage = this.state.page + 1;
    if (newPage <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState({ loading: true });
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${newPage}&pageSize=${this.props.pageSize}`;
      const data = await fetch(url);
      const parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: newPage,
        loading: false,
      });
    }
  };

  fetchMoreData = async () => {
    const newPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${newPage}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: newPage,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <div style={{paddingTop :'4%'}}>
        <h1 className="text-center">
          NewsMonkey - Top {this.props.category[0].toUpperCase() + this.props.category.slice(1)} Headlines
        </h1>
        </div>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <>
            <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ' '}
                    description={element.description ? element.description.slice(0, 90) + '...' : ' '}
                    imageurl={element.urlToImage ? element.urlToImage : 'https://odishanewsinsight.com/wp-content/uploads/2019/05/Do-You-Know.jpeg'}
                    newurl={element.url}
                    author={element.author ? element.author : 'Unknown'}
                    date={element.publishedAt}
                    sourcename={element.source.name}
                  />
                </div>
              ))}
            </div>
          </>
        </InfiniteScroll>
      </div>
    );
  }
}
