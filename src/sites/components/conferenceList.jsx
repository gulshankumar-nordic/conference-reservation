import React, { Component } from 'react';

class ConferenceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: props.postList,
          }
    }

    componentWillReceiveProps(props){
        this.setState({    posts: this.props.postList})
    }
     render() { 
        //console.log('in rendering - ' + this.props.postList.length);
        //console.log(this.props.lengthOfPost)
        
      
        return <table>
          {this.props.postList}
          </table>
        
    }
       
    
   
}
 
export default ConferenceList;