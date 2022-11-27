import React, { Component } from 'react'

export default class NewsIteam extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className="my-3">
          <div className="card" style={{height:"500px"}} >
            <img src={!imageUrl ? "https://www.karlsruhe-insider.de/wp-content/uploads/2020/02/ikea-konzern-er-ffnet-erstes-einrichtungshaus-in-indien-696x391.jpeg" : imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
            <div><span className="badge rounded-pill bg-warning">
                {source}
              </span></div>
              <h5 className="card-title"> {title}...</h5>
              
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted  position-absolute bottom-10 end-10">By {author} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark position-absolute bottom-0 end-10 my-3">Read More</a>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
