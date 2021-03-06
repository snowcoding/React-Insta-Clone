import React, { Component } from 'react';
import dummyData from './dummy-data.js'
import moment from 'moment'
import PostsPage from './components/PostContainer/PostsPage';
import Authenticate from './HOCs/Authenticate'

class App extends Component {
  constructor(){
    super();
    this.state = {
      data:[]
    }
  }

  componentDidMount(){
    this.setState(function(prevState,currentProps){
      return{
        data: dummyData
      }
    })
  }

  init = () => {
    console.log('................... Step 1.5: init state entered...')
    this.setState(function(prevState,currentProps){
      return{
        data: dummyData
      }
    })
    console.log(this.state.data, '................... Step 1.6: current state...')
  }

  addNewComment = (event,index) => {
    // 1. Make a shallow copy of data
    let data = [...this.state.data];
    
    // 2. Make a shallow copy of the item you want to mutate
    let dataObj = {...data[index]};
    
    // 3. Replace the property you're intested in
    dataObj.comments.push({
      username: JSON.parse(localStorage.getItem('instaclone'))[0].username,
      text:`${event.target.value}`
    });
    
    dataObj.timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
    
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    data[index] = dataObj;

    // 5. Set the state to our new copy
    this.setState({data:data});
  }

  updateLikes = (isLikeSelected,index) =>{

    // 1. Make a shallow copy of data
    let data = [...this.state.data];

    // 2. Make a shallow copy of the item you want to mutate
    let dataObj = {...data[index]};
    
    // 3. Replace the property you're intested in
    dataObj.likes = isLikeSelected ? ++dataObj.likes : --dataObj.likes

    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    data[index] = dataObj

    // 5. Set the state to our new copy
    this.setState({
      data:data
    });
  }

  searchHandler = (e) =>{
    e.preventDefault();
    console.log(e.target.value, '........... Step 1: Log the event target value') 
    
    //Initialize data after each change on search
    this.init()

    //If the target value length is zero, do not filter the posts
    if (e.target.value.length !== 0){
      console.log('................ Step 2: Entering filtering..')

      // 1. Make a shallow copy of data
      let data = [...this.state.data];

      console.log(data,'................ Step 3: copy of data before filtering...')
      // 2. Make a shallow copy of the item you want to mutate
      // let dataObj = {...data[index]};

      // 3. Replace the property you're intested in
      let filteredData = data.filter(cv => {
        console.log(cv.username.substring(0,e.target.value.length), '................ Step 4: logging the substring of event')
        // return cv.username.substring(0,e.target.value.length) === e.target.value
        return cv.username.includes(e.target.value)
      })

      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      // data[index] = dataObj

      // 5. Set the state to our new copy
      this.setState(function(prevState,currentProps){
        return {data:filteredData}
      });

      console.log(filteredData,'.............Step 5: Filtered Data')
    }

  }
  render() {
    return (
      <PostsPage searchHandler={this.searchHandler} stateData={this.state.data} addNewCommentHandler={this.addNewComment} updateLikesHandler={this.updateLikes}/>
    );
  }
}

const AuthenticatedApp = Authenticate(App)

export default AuthenticatedApp;
