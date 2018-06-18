import React, { Component } from 'react';
import './PostContainer.css'

class Post extends Component {
  constructor(props) {
    super(props);
    this.props = props
  }
  render() { 
    return (
      <div>
        <div className="post-header">
          <div className="thumbnail">
            <img className="img-fluid" src={this.props.postObj.thumbnailUrl} alt=""/>
          </div> 
          <div className="username">
            <span>{this.props.postObj.username}</span>
          </div>
        </div>
        <div>
         <div>
          <img className="img-fluid" src={this.props.postObj.imageUrl} alt="" />
         </div> 
        </div>

      </div>
     )
  }
}
 
export default Post