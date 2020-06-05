import React, { Component } from 'react';
import App from './App';
import './App.css';

export default class ShowPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      comments:[],
      isloading:true,
      back:false,
      }
      this.handleback = this.handleback.bind(this);

    }
componentDidMount(){
          console.log('fetching Post data')
          fetch('http://127.0.0.1:8000/api/'+ this.props.pid + '/' )
          .then(res => res.json())
          .then(data => {this.setState({
            title: data.title,
            content: data.content,
            comments: data.comments,
            isloading:false });});
};

handleback(){
      this.setState({ back:true});
};

renderTableData() {
      return this.state.comments.map((comment, index) => {
         const { id, subject , email,body } = comment //destructuring
         return (
            <tr key={id}>
               <td>{subject}</td>
               <td>{email}</td>
               <td>{body}</td>
            </tr>
         )
      })
    };

renderTableHeader() {
          return (<tr>
        <th>Subject</th>
        <th>Email</th>
        <th>Body</th>
        </tr>)
        };
render() {
       if (this.state.isloading) return <h1>Loading.....</h1>
       if (this.state.back) return <App />
      return (
       <div>
       <h2>Post Details</h2>
       <h4>{this.state.title}</h4>
       <h4>{this.state.content}</h4>

       <div className="tabletwo">
           <table id='postuser'>
              <tbody>
              {this.renderTableHeader()}
              {this.renderTableData()}
              </tbody>
           </table>
        </div>
        <button className="Back" onClick={() => { this.handleback() }}>Back</button>

       </div>

      );}
}
