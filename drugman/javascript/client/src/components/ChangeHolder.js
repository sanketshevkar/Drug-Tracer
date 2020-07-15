import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class ChangeHolder extends Component {
    state={
        id:'',
        holder:''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.changeHolder(this.state);
        this.setState({ id: '',holder:''});
    }

    changeHolder = (state) =>{
        //console.log(id);
        axios.put(`http://127.0.0.1:8080/api/changeholder/${state.id}`,{
            'holder':state.holder
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
<Form.Label>Holder</Form.Label>
<Form.Control type='text' name='holder' placeholder='Holder' value={this.state.holder} onChange={this.onChange} />
</Form.Group>



<Button variant="primary" type="submit" onClick={this.onSubmit}>
Change Holder
</Button>
</Form>

        </div>
        </React.Fragment>
        
    );
  }
}


export default ChangeHolder;