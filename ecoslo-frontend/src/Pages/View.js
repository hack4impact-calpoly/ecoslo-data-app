import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row, Alert } from "react-bootstrap"; 
import Table from "react-bootstrap/Table";
import { ExportCSV } from '../Components/exportExcel.js'
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
      locations: [],
      showAlert: false


    };

  }

  marginstyle={
    marginTop: '1.2em',
    marginBottom: '2em'
  }


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

  handleLocationChange (event) {
    let selected = []
    for(var i = 0; i < event.target.options.length; i++){
      console.log(event.target.options[i].value)
      console.log(event.target.options[i].selected)
      if(event.target.options[i].value === 'Select All' && event.target.options[i].selected){
        selected=[]
        break;
      }
      else if (event.target.options[i].selected){
        selected.push(event.target.options[i].value)
      }
    }
    this.setState({locations: selected})
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

  setShow(b) {
    this.setState({showAlert: b})
  }

  async handleSubmit(event) {
    event.preventDefault();
    if(this.state.colNames !== undefined) {
      var selected = []
      for(var i = 0; i < this.state.selectedValues.length; i++){
        if (this.state.selectedValues[i] === true){
          selected.push(this.state.colNames[i])
        }
      }

      console.log('LOCATIONS SATE')
      console.log(this.state.locations)
    var d = {
      dateStart: this.state.formData['dateStart'],
      dateEnd: this.state.formData['dateEnd'],
      cols: selected,
      locations: this.state.locations
    }

    let td = await this.props.apiWrapper.getByCols(d);
    if(td.rows !== undefined && td.rows.length !== 0){
      this.setState({tableData: td})
    }
    else{
      this.setState({showAlert: true})
    }
    
    
  }
  }

   noDataAlert() {
    if(this.state.showAlert){
      return(
      <Alert variant="danger" onClose={() => this.setShow(false)} dismissible>
          <p>
            No data exists for these values. Try a different set of dates and locations.
          </p>
        </Alert>
      )
    }
    else {
      return null
    }
  }


  

  renderForm = ()  => {
    if(this.state.colNames !== undefined && this.state.selectedValues !== undefined){
      let data = this.state.colNames;
      let formUI = data.map((col, index) => {
        return (
            <td id="table">
              <label>
              <input type="checkbox"
              name={col}
              checked={this.state.selectedValues[index]}
              onChange={(e) => this.handleInputChange(e, index)}/> {col.split("_").join(" ")}
              
              </label> 
            </td>
            
        )})

       let tableboxes = []
      for(var i = 0; i < formUI.length; i=(i+5)){

        tableboxes.push(
          <tr>
            {formUI[i]}
            {formUI[i+1]}
            {formUI[i+2]}
            {formUI[i+3]}
          </tr>
          
        )
      }

      let finalFormat = tableboxes.map((content, index)=>{
        return(
          content
        )
      })

        return <Table id = "checktable" size='med' bordered>{finalFormat}</Table>;
      }
      else {
        return null
      }
  }


  render() {
    if(this.state.colNames !== undefined){
      console.log(this.state.locations)
    return (
      <div style={this.marginstyle}>
        <Container>
          {this.noDataAlert()}
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
              <Form.Control multiple={true} as="select" onChange={(e) => this.handleLocationChange(e)} >
                  <option>Select All</option>
                  { this.props.locations.map((value) => {
                    return <option>{value}</option>
                  }) }
              </Form.Control>
            </Form.Group>
            <Form.Label>Select Which Items to View</Form.Label>
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