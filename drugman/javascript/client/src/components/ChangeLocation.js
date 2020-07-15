import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class ChangeLocation extends Component {
    state={
        id:'',
        location:''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.changeLocation(this.state);
        this.setState({ id: '',location:''});
    }

    changeLocation = (state) =>{
        //console.log(id);
        axios.put(`http://127.0.0.1:8080/api/changelocation/${state.id}`,{
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
<Form.Label>Location</Form.Label>
<Form.Control type='text' name='location' placeholder='Location' value={this.state.location} onChange={this.onChange} />
</Form.Group>



<Button variant="primary" type="submit" onClick={this.onSubmit}>
Change Location
</Button>
</Form>

        </div>
        </React.Fragment>
        
    );
  }
}


export default ChangeLocation;