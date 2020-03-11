import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap"; 
import Table from "react-bootstrap/Table";
import DataTable from '../Components/DataTable.js';
import withLocations from '../Components/withLocations';
import "../styles/page.css";

class View extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      displayReady: false,
      formData : {
        "location": null, 
        "dateStart" : null,
        "dateEnd": null
      },
      // colNames: [],
      // selectedValues: []

    };

  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if(this.state.colNames.length > this.nextState.colNames.length){
  //     false
  //   }
  // }


  async componentDidMount(){
    console.log(this.state.colNames);
    try {
      if(this.state.colNames === undefined || this.state.selectedValues === undefined) {
        let res = await this.props.apiWrapper.getColumns();
        var names = []
        var vals = []
        console.log(res.r.fields)
        for (var i = 0; i < res.r.fields.length; i++){
          names.push(res.r.fields[i].name)
          vals.push(false)
        }
        this.setState({colNames: names})
        this.setState({selectedValues: vals})
      }
      
    }
    catch(err){

    }
    
  }

  handleOnChange = (field, validationFunction = null) => event => {
    let curFormData = Object.assign({}, this.state.formData);
    const value = event.target.value;
    if (this.state.formData && (curFormData[field] !== value)) {
      if (validationFunction !== null) {
        if (validationFunction(value)) {
          alert("Invalid value: " + value);
          return false;
        }
      }
      curFormData[field] = value;
      this.setState({
        formData: curFormData
      });
    }
  }

  handleInputChange = (event, index) => {
    const target = event.target;
    const value = target.checked;

    let sv = this.state.selectedValues
    sv[index] = value
    this.setState({selectedValues: sv})
    console.log(this.state.selectedValues);
  }

  async handleSubmit(event) {
    event.preventDefault();
    if(this.state.colNames !== undefined) {
      var selected = []
      //let cols = this.state.colNames
      //let v = this.state.selectedValues
      for(var i = 0; i < this.state.selectedValues.length; i++){
        if (this.state.selectedValues[i] === true){
          selected.push(this.state.colNames[i])
        }
      }
    

    var d = {
      dateStart: this.state.formData['dateStart'],
      dateEnd: this.state.formData['dateEnd'],
      cols: selected,
      locations: [this.state.formData['location']]
    }

    let td = await this.props.apiWrapper.getByCols(d);
    console.log("HERE!!!!!!")
    // let r = {
    //   td
    // }

    this.setState({tableData: td
    })
  }
  }

  renderForm = ()  => {
    if(this.state.colNames !== undefined && this.state.selectedValues !== undefined){
      let data = this.state.colNames; 

      let formUI = data.map((col, index) => {
        return (
            <div>
              <label>
              <input type="checkbox" 
              name={col}
              checked={this.state.selectedValues[index]}
              onChange={(e) => this.handleInputChange(e, index)}/> {col}
              </label>    
            </div>
        )})

      return formUI;
      }
      else {
        return null
      }
  }


  render() {
    if(this.state.colNames !== undefined){
    return (
      <div>
        <Container>
        <Form>
          <div>
          <Form.Group controlId="formBasicEmail">
            <Form.Group>
            <Row>
              <Col>
              <Form.Label>Start Date</Form.Label>
              <Form.Control placeholder="Enter Date" onChange={this.handleOnChange("dateStart")} />
              </Col>
              <Col>
              <Form.Label>End Date</Form.Label>
              <Form.Control placeholder="Enter Date" onChange={this.handleOnChange("dateEnd")} />
              </Col>
              
              </Row>
              </Form.Group>
              
              <Form.Label>Location</Form.Label>
              <Form.Control as="select" onChange={this.handleOnChange("location")} >
              <option>Select a Location...</option>
              {/* <option>Avila</option> */}
              { this.props.locations.map((value) => {
                return <option>{value}</option>
              }) }
              </Form.Control>
            </Form.Group>
            {this.renderForm()}
            <Button type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</Button>
          </div>
        </Form>
        </Container>
        <DataTable data={this.state.tableData}></DataTable>
      </div>
    );
            }
            else{
              return null
            }
  }
}

export default withLocations(View);