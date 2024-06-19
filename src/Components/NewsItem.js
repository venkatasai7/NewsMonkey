import React, { Component } from 'react'
export default class NewsItem extends Component {


  render() {
    let { title, description, imageurl, newurl, author, date, sourcename } = this.props;
    return (
      <div>
        <div className="my-3">
          <div className="card" >
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: '1',left: '80%'}} >
            {sourcename}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>

            <a href={newurl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer" >Read more</a>

          </div>
        </div>
      </div>
      </div >
    )
  }
}
