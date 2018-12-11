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
        return <table>
          {this.props.postList}
          </table>
        
    }
       
    
   
}
 
export default ConferenceList;