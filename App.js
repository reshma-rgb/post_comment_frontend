import React, { Component } from 'react';
import './App.css';
import ShowUser from './UserComp';
import ShowPost from './PostComp';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      pid: '',
      isloading:true,
      userclick: false,
      postclick:false,
      }
      this.handlepost = this.handlepost.bind(this);
      this.handleuser = this.handleuser.bind(this);
    }

componentDidMount(){
       console.log('fetching List of Post')
       fetch('http://127.0.0.1:8000/api/')
        .then(res => res.json())
        .then(data => {this.setState({ posts :data , isloading:false});
      });

    };

handlepost(id){
      this.setState({ postclick:true, pid: id});
};

handleuser(id){
      this.setState({ userclick:true, pid: id});
};

renderTableData() {
      return this.state.posts.map((post, index) => {
         const { id, title, userpost } = post //destructuring
         const{user_name} = userpost
         return (
            <tr key={id}>
               <td><a onClick={() => { this.handlepost(id) }}>{title} </a></td>
               <td><a onClick={() => { this.handleuser(id) }}>{user_name} </a></td>
            </tr>
         )
      })
    };

renderTableHeader() {
      return (<tr>
    <th>Title</th>
    <th>Author</th>
    </tr>)
    };

render() {
  if (this.state.isloading) return <h1>Loading.....</h1>
  if(this.state.userclick) return <ShowUser pid = {this.state.pid} />
  if(this.state.postclick) return <ShowPost pid = {this.state.pid} />


  return (
    <div>
    <h1>Social Application</h1>
    <div className="tableone">
        <table id='postuser'>
           <tbody>
           {this.renderTableHeader()}
           {this.renderTableData()}
           </tbody>
        </table>
     </div>
    </div>
  )
  ;}

}
