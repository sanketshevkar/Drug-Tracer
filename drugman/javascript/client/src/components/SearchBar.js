import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form,Button } from 'react-bootstrap';

export class SearchBar extends Component {
    state = {
        id: '',
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.props.search(this.state.id);
        this.setState({ id: ''});
    }

    

    render() {
        return (
            <React.Fragment>

<Form>
<Form.Group controlId="formBasicEmail">
<Form.Label>DrugID</Form.Label>
<Form.Control type='text' name='id' placeholder='Add Drug ID' value={this.state.id} onChange={this.onChange} />
</Form.Group>


<Button variant="primary" type="submit" onClick={this.onSubmit}>
Search Drug
</Button>
</Form>
</React.Fragment>
        )
    }
}

//Proptypes
SearchBar.propTypes = {
    search: PropTypes.func.isRequired
}

export default SearchBar