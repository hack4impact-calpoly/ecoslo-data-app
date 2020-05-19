  
import "../styles/update.css";
import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Col} from 'react-bootstrap';
import DataTable from '../Components/DataTable.js';
import withLocations from '../Components/withLocations';
<<<<<<< HEAD
import ReactTooltip from "react-tooltip";
=======
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
>>>>>>> 2e4696ab6fca3a1581cb7d7a2673151f5975a945

class Update extends React.Component {
  constructor(props) {
    super(props);

    this.state = {inputs: ["1"],
     input_vals: [['', '']],
     date: this.formatDate(new Date()),
     location: "",
     tableResult: [],
     dateValue: new Date()
    };
  }

  marginstyle={
    marginTop: '1.2em',
    marginBottom: '2em'
  }

  async componentDidMount(){
    let res = await this.props.apiWrapper.getColumns();
    console.log("res: ", res)
    let options = res.r.fields.map((content, index) =>{
      return <option>{content.name}</option>
    })
    let optionTypes = res.r.fields.map((content, index) =>{
      return <option>{content.format}</option>
    })
    this.setState({colTypes: optionTypes})
    this.setState({colNames: options})
  }

  handleRemove(event, index) {
    var list_remove = this.state.inputs;
    var list_remove_vals = this.state.input_vals;
    list_remove.splice(index, 1)
    list_remove_vals.splice(index, 1)
    this.setState({inputs: list_remove});
    this.setState({input_vals: list_remove_vals});

  }

  
  handleChangeTextBox(event, index) {
    var new_list_input = this.state.input_vals;
    new_list_input[index][1] = event.target.value;
    this.setState({input_vals: new_list_input});
  }

  handleChangeDropDown(event, index) {
    var new_list_input = this.state.input_vals;
    new_list_input[index][0] = event.target.value
    this.setState({input_vals: new_list_input});
  }



  formatDate(d) {
    var month = '' + (d.getMonth() + 1)
    var day = '' + d.getDate()
    var year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  };

  handleDateChange(dateInput) {
    this.setState({
      dateValue: dateInput,
      date: this.formatDate(dateInput)})
  };

  async handleSubmit(event) {
    let cols=[]
    let vals=[]
    for (let i = 0; i < this.state.input_vals.length; i++){
      cols.push(this.state.input_vals[i][0]);
      var val = this.state.input_vals[i][1]; 
      if (isNaN(val)) {
        val = "'" + val + "'";  
      }
      vals.push(val); 
    }

    let data = {
      cols: cols,
      vals: vals,
      date: this.state.date,
      location: this.state.location
    }

    event.preventDefault();

    try {
      const res = await this.props.apiWrapper.updateData(data);
      alert("Value successfully updated in database.");
    }
    catch (error) {
      alert(error);
    }
  }

   handleAddItem(event) {
       var curr_inputs = this.state.inputs
       var in_length = curr_inputs.length
       curr_inputs.push((in_length + 1).toString())
       this.setState({inputs: curr_inputs})
       let curr_input_vals = this.state.input_vals
       curr_input_vals.push(['', ''])
       this.setState({input_vals: curr_input_vals})
      }

  async handleLocationChange(event) {
    this.setState({location: event.target.value});
  }

  async handleUpdateTable(event) {
    let data = {
      cols: ['*'],
      dateStart: this.state.date,
      dateEnd: this.state.date,
      locations: [this.state.location]
    }
    try{
      let res = await this.props.apiWrapper.getByCols(data);
      if(res.rows.length != 0){
        this.setState({tableResult: res})
      }
      else{
        throw "No data found."
      }
    }
    catch(e)
    {
      alert("No data found for this date and location.")
    }
  }

  render() {
    if(this.state.colNames !== undefined) {
    return (
      <div style={this.marginstyle}>

        <Container>
              <a data-tip data-for='global'> ? </a>
              <ReactTooltip place="right" type="dark" effect="float" id='global' >
              <p>Use this page to update a preexisting data entry.</p>
              <div> You can update one or multiple items in the table, and you </div>
              <div>select which item to update based on the event’s date and location.</div>
              </ReactTooltip>
        <Form>
          
        <Form.Group controlId="formBasicEmail">
<<<<<<< HEAD


        <Form.Label><div className="date_spacing">Date</div></Form.Label>
        <Form.Control placeholder="Enter Date" value={this.state.date} onChange={(e) => this.handleDateChange(e)}/>

=======
          <Form.Label>Date (Click to Change)</Form.Label>
              <br></br>
                <DatePicker selected={this.state.dateValue} onChange={(e) => this.handleDateChange(e)} dateFormat={'yyyy/MM/dd'} />
              <br></br>
>>>>>>> 2e4696ab6fca3a1581cb7d7a2673151f5975a945
        <Form.Label><div className="loc_spacing">Location</div></Form.Label>
        <Form.Control as="select" value={this.state.location} onChange={(e) => this.handleLocationChange(e)}>
        <option>Choose...</option>
        { this.props.locations.map((value) => {
                return <option>{value}</option>
              }) }
        </Form.Control>
        <Button onClick={(e) => {this.handleUpdateTable(e)}}>Refresh Table</Button>
        <DataTable data={this.state.tableResult}></DataTable>

      {
        this.state.inputs.map((value, index) => {
          return (
            <div >
        <Form.Label>Item</Form.Label>
        <Form.Row>
          <Col xs={11}>
        <Form.Control name={index.toString()} as="select" onChange={(e) => this.handleChangeDropDown(e, index)}>
            <option>Choose...</option>
            {this.state.colNames}
        </Form.Control>
          </Col>
          <Col>
            <button type="button" className="close" aria-label="Close" onClick={(e) => {this.handleRemove(e, index)}}>
            <span aria-hidden="true">&times;</span>
            </button>
          </Col>
        </Form.Row>


        <Form.Row>
          <Col xs={11}>
            <Form.Label><div className="loc_spacing">Value</div></Form.Label>
            <Form.Control placeholder="Enter value" name={index.toString()} value={this.state.input_vals[index][1]} onChange={(e) => this.handleChangeTextBox(e, index)}/>
          </Col>
        </Form.Row>
            </div>
          )
        })
      }
      <Button onClick={(e) => {this.handleAddItem(e)}}>Update Another Item</Button> 



        <Button onClick={(e) => {this.handleSubmit(e)}}>Submit</Button>

        </Form.Group>
        </Form>
        </Container>
      </div>
    );
    }
    else{
      return null
    }
  }
}

export default withLocations(Update);