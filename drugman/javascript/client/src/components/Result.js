import React, { Component } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import '../App.css'
import {Table} from 'react-bootstrap'

export class Result extends Component {
    state={
        drugs:{drugname:'',timestamp:'',holder:'',location:''}
    }

    search = (id) =>{
        console.log(id);
        axios.get(`http://127.0.0.1:8080/api/query/${id}`)
        .then(res=> this.setState({drugs: JSON.parse(res.data.response)}));
      }

  render() {
    return (
        <React.Fragment>
            <div className='search'>
        <SearchBar search={this.search}/>
        </div>
     
        <div className="container row">
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
      <th>Drug Name</th>
      <th>Timestamp</th>
      <th>Holder</th>
      <th>Location</th>
      </tr>
      </thead>
        <tbody>
        <tr>
      <td>{this.state.drugs.drug}</td>
      <td>{this.state.drugs.timestamp}</td>
      <td>{this.state.drugs.holder}</td>
      <td>{this.state.drugs.location}</td>
      </tr>
      </tbody>
      </Table>
</div>
        </React.Fragment>
        
    );
  }
}


export default Result;