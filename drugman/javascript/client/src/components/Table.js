import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap'

export class Tab extends Component {
    render() {
        return(
            <Table striped bordered hover variant="dark">
        <thead>
        <tr>
      <th className="obj">Drug Name</th>
      <th className="com">Timestamp</th>
      <th className="com">Holder</th>
      <th className="date">Location</th>
      </tr>
      </thead>
      <tbody>
      {this.props.drugs.map((res) => (
          <tr key={res.Key}>
                <td className="obj">{res.Record.drug}</td>
                <td className="com">{res.Record.timestamp}</td>
                <td className="com">{res.Record.holder}</td>
                <td className="date">{res.Record.location}</td>

                </tr>
        ))}
      
    
    
      </tbody>
      </Table>
                ) 
          
          
}
}

Table.propTypes = {
    drugs: PropTypes.array
}

export default Tab