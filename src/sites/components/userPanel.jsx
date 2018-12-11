import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {browserHistory} from 'react-router';
import axios from 'axios';
import Template from './template';
import Header from './Header';
import {  Button, Form,  Input } from 'reactstrap';
import ConferenceList from './conferenceList';
class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            user: this.getCookie("cookigesForUser"),
            title:'',
            content:'',
            posts: []

        }
        this.postSubmit = this.postSubmit.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.contentChange = this.contentChange.bind(this);
    }
    getCookie (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    postSubmit(e) {
        this.createTable();
        e.preventDefault();
        console.log(this.state.title)
        axios.post('http://94.237.87.26:3031/posts',{
            user:this.state.user,
            title:this.state.title,
            contents:this.state.content
        })
        .then((response) => {
            //this.setCookie("cookigesForUser",response.data, 100);
            //window.location.assign("/userPanel");
            //browserHistory.push("/userPanel")
          console.log(response.data);
          document.getElementById("title").value="";
          document.getElementById("content").value="";
          this.renderConference();
         
        })
        .catch((error)=> {
          console.log(error);
        })    
    }

    titleChange(e){
        this.setState({ title: e.target.value });
        console.log(e.target.value);

    }

    contentChange(e){
        this.setState({ content: e.target.value });
        console.log(e.target.value)
    }

    
    renderConference(){
        axios.get('http://94.237.87.26:3031/posts?user='+this.getCookie("cookigesForUser")      
        )
        .then((response) => {      
          //console.log(response.data);
          this.setState({posts:response.data})
          //console.log(this.state.posts);
         
        })
        .catch((error)=> {
          console.log(error);
        }) 

    }
    componentDidMount(){
        this.renderConference();
    }

    createTable = () => {
        let table = []
    
        // Outer loop to create parent
        for (let i = 0; i < this.state.posts.length; i++) {
            console.log(i)
          let children = []
          //Inner loop to create children
          for (let j = 0; j < 1; j++) {
            children.push(<td key={i+j} style={{paddingLeft:25}}><h2>{this.state.posts[i].title}</h2> 
            <p> {this.state.posts[i].content}</p></td>)
          }
          //Create the parent and add the children
          table.push(<tr>{children}</tr>)
        }
        return table
      }
   
    render() { 
        //console.log("get cookies - ", this.getCookie("cookigesForUser"))
        const getttingCookies = this.getCookie("cookigesForUser");
        console.log(getttingCookies);
        const test = this.createTable();
        console.log('length from up - '+test.length);
        if(getttingCookies){
            return ( 
                <div >
                    <Header/>
                <Template />
               
                <Container>
                
                <Row>
                  <Col xs="6" style={{paddingTop:25}}>
                  <div style={{backgroundColor:"#FFFFFF66"}}>

                 <ConferenceList postList= {test} lengthOfPost={test.length}/>
                  
                  </div>
                  </Col>
                  <Col xs="6" style={{paddingTop:25}}>
                  <div style={{backgroundColor:"#FFFFFF66"}}>
                  <Form onClick={this.postSubmit}>                     
                     
                            <Col sm={10}>
                                <h1>Reserve a conference</h1>
                                <hr></hr>
                            </Col>
                       
                            <Col sm={10}>
                                <h3>Location</h3>
                                <Input type="text" name="title" id="title" onChange={this.titleChange}/>
                            </Col>
                        
                            <Col sm={12}>
                                <h3>Conference details</h3>
                                <Input type="textarea" name="content" id="content" onChange={this.contentChange} />
                            </Col>
                        
                        <Col sm={{ size: 10, offset: 6 }}>
                            <Button>Varaa</Button>
                        </Col>
                      
                    </Form>
                    </div>
                  </Col>
                </Row>
                </Container>
                </div>
            );  
        }
        else {
            return (
                <div>{ browserHistory.push("/")}</div>
            )
           
        }
            
        }
       
    
}
 
export default UserPanel;