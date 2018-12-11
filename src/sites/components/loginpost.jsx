import React, { Component } from 'react';
import {
    Button, Form, FormGroup, Input, DropdownItem 
} from 'reactstrap';

import {browserHistory} from 'react-router';

import axios from 'axios';

class LoginPost extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            user:'',
            pass:'',
        }
        this.userChange = this.userChange.bind(this);
        this.passChange = this.passChange.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
    }

    userChange(e){        
        this.setState({ user: e.target.value });
        console.log(this.state.user)
    }

    passChange(e){    
        this.setState({ pass: e.target.value });
        console.log(this.state.pass)
    }

    setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }

    

    loginSubmit(e) {
        e.preventDefault();
        console.log("login button click user name: " + this.state.user +
        " password: " + this.state.pass);
      
        axios.post('http://94.237.87.26:3031/login',{
            user:this.state.user,
            pass:this.state.pass
        })
        .then((response) => {
            this.setCookie("cookigesForUser",response.data, 100);
            //window.location.assign("/userPanel");
            browserHistory.push("/userPanel")
          console.log(response.data);
         
        })
        .catch((error)=> {
          console.log(error);
        }) 

       
        
    }
    render() { 
        return ( <div style={{width:250, padding:10}}>
            <h2>Login</h2>
                <DropdownItem divider />
                <Form onClick={this.loginSubmit}>
                  <FormGroup>
                    <Input type="text" name="user" id="user"  value={this.state.user}
                    onChange={this.userChange} placeholder="enter username" />
                  </FormGroup>
                  <FormGroup>
                    <Input type="password" name="pass" id="pass" value={this.state.pass}
                    onChange={this.passChange} placeholder="enter password" />
                  </FormGroup>
                  <Button type="submit" className="btn btn-primary">Submit</Button>
           
            </Form>
        </div> );
    }
}
 
export default LoginPost;