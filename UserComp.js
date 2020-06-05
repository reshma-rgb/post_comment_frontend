import React, { Component } from 'react';
import App from './App';
import './App.css';


export default class ShowUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      full_name: "",
      user_email: "",
      website: "",
      company: "",
      isloading:true,
      back:false,
      }
      this.handleback = this.handleback.bind(this);

    }
componentDidMount(){
          console.log('fetching User data')
          fetch('http://127.0.0.1:8000/api/'+ this.props.pid + '/' )
          .then(res => res.json())
          .then(data => {this.setState({
            user_name: data.userpost.user_name,
            full_name: data.userpost.full_name,
            user_email: data.userpost.user_email,
            website: data.userpost.website,
            company: data.userpost.company,
            isloading:false });});
};

handleback(){
      this.setState({ back:true});
};
render() {
       if (this.state.isloading) return <h1>Loading.....</h1>
        if (this.state.back) return <App />
      return (
       <div>
       <h2>User Details</h2>
       <h4>{this.state.user_name}</h4>
       <h4>{this.state.full_name}</h4>
       <h4>{this.state.user_email}</h4>
       <h4>{this.state.website}</h4>
       <h4>{this.state.company}</h4>
       <button  onClick={() => { this.handleback() }}>Back</button>
       </div>

      );}
}
