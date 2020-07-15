import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Tab from './components/Table';
import Result from './components/Result';
import AddDrug from './components/AddDrug';
import ChangeHolder from './components/ChangeHolder';
import ChangeLocation from './components/ChangeLocation';
import Navi from './components/Navi';
import './App.css';


class App extends Component {

  state={
    drugs:[{"Key":"","Record":{"drugname":"","timestamp":"","holder":"","location":""}}]
  }



  componentDidMount(){
    axios.get('http://127.0.0.1:8080/api/queryalldrugs') 
    .then(res => this.setState({drugs: JSON.parse(res.data.response)}))
  }

 
  




  render(){
    return (
      <div className='container'>
        <Navi />
      <Router>
        <Route exact path='/' render={props=>(
        <React.Fragment>
          <div className='table'>
          <Tab  drugs={this.state.drugs}  />
          
            {console.log(this.state.drugs)}
          </div>
        </React.Fragment>
        )}/>

<Route exact path='/search' render={props=>(
        <React.Fragment>
          
         <Result/>
          <div>
            {console.log(this.state.drugs)}
          </div>
        </React.Fragment>
        )}/>

<Route exact path='/addDrug' render={props=>(
        <React.Fragment>
          
         <AddDrug />
          <div>
            {console.log(this.state.drugs)}
          </div>
        </React.Fragment>
        )}/>

<Route exact path='/changeHolder' render={props=>(
        <React.Fragment>
          
         <ChangeHolder />
          <div>
            {console.log(this.state.drugs)}
          </div>
        </React.Fragment>
        )}/>
<Route exact path='/changeLocation' render={props=>(
        <React.Fragment>
          
         <ChangeLocation />
          <div>
            {console.log(this.state.drugs)}
          </div>
        </React.Fragment>
        )}/>

      </Router>
      </div>
    );
  }
  
}

export default App;
