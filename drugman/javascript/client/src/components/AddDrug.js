import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class AddDrug extends Component {
    state={
        id:'',
        drugname:'',
        timestamp:'',
        holder:'',
        location:''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.addDrug(this.state);
        this.setState({
        id:'', 
        drugname:'',
        timestamp:'',
        holder:'',
        location:''});
    }

    addDrug = (state) =>{
        //console.log(id);
        axios.post(`http://127.0.0.1:8080/api/adddrug`,{
            'drugid':state.id,
            'drugname':state.drugname,
            'timestamp':state.timestamp,
            'holder':state.holder,
            'location':state.location
        })
      }

  render() {
    return (
        <React.Fragment>
            <div className='search'>

    <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>DrugID</Form.Label>
    <Form.Control type='text' name='id' placeholder='Add Drug ID' value={this.state.id} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Drug Name</Form.Label>
    <Form.Control type='text' name='drugname' placeholder='Drug Name' value={this.state.drugname} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Timestamp</Form.Label>
    <Form.Control type='text' name='timestamp' placeholder='Timestamp' value={this.state.timestamp} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Holder</Form.Label>
    <Form.Control type='text' name='holder' placeholder='Holder' value={this.state.holder} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Location</Form.Label>
    <Form.Control type='text' name='location' placeholder='Location' value={this.state.location} onChange={this.onChange} />
  </Form.Group>

  <Button variant="primary" type="submit" onClick={this.onSubmit}>
    Add Drug
  </Button>
</Form>

            </div>
        </React.Fragment>
        
    );
  }
}


export default AddDrug;