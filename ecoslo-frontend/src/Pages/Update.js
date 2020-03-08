  
import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputs: ["1"],
     cols: {Cigarette_Butts: '', Food_Wrappers: '', Plastic_Take_Out_Containers: '', Plastic_Bottle_Caps: '', Metal_Bottle_Caps: '',Plastic_Lids: '', Straws_And_Stirrers: '', 
     Forks_Knives_And_Spoons: '', Plastic_Beverage_Bottles: '', Glass_Beverage_Bottles: '', Beverage_Cans: '', Plastic_Grocery_Bags: '', Other_Plastic_Bags: '', Paper_Bags: '', 
     Paper_Cups_And_Plates: '', Plastic_Cups_And_Plates: '', Foam_Cups_And_Plates: '', Fishing_Buoys_Pots_And_Traps: '', Fishing_Net_And_Pieces: '', Fishing_Line: '', Rope: '', 
     Six_Pack_Holders: '', Other_Plastic_Or_Foam_Packaging: '', Other_Plastic_Bottles: '', Strapping_Bands: '', Tobacco_Packaging_Or_Wrap: '', Appliances: '', Balloons: '', Cigar_Tips: '', 
     Cigarette_Lighters: '', Construction_Materials: '', Fireworks: '', Tires: '', Condoms: '', Diapers: '', Syringes: '', Tampons: '', Foam_Pieces: '', Glass_Pieces: '', Plastic_Pieces: ''},
     input_vals: [['', '']],
     date: "",
     location: "",
    
  };
    
    //this.handleChangeTextBox = this.handleChangeTextBox.bind(this);
    //this.handleChangeDropDown = this.handleChangeDropDown.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleRemove(event, index) {
    var list_remove = this.state.inputs;
    var list_remove_vals = this.state.input_vals;
    console.log(list_remove);
    console.log(index);
    list_remove.splice(index, 1)
    list_remove_vals.splice(index, 1)
    console.log(list_remove);
    this.setState({inputs: list_remove});
    this.setState({input_vals: list_remove_vals});

  }

  
  handleChangeTextBox(event, index) {
    var new_list_input = this.state.input_vals;
    new_list_input[index][1] = event.target.value
    this.setState({input_vals: new_list_input});
  }

  handleChangeDropDown(event, index) {
    var new_list_input = this.state.input_vals;
    new_list_input[index][0] = event.target.value
    this.setState({input_vals: new_list_input});
  }

  async handleSubmit(event) {
    let cols=[]
    let vals=[]
    for (let i = 0; i < this.state.input_vals.length; i++){
      cols.push(this.state.input_vals[i][0]);
      vals.push(this.state.input_vals[i][1])
    }

    let data = {
      cols: cols,
      vals: vals,
      date: this.state.date,
      location: this.state.location
    }



    alert('A name was submitted: ' + data);
    event.preventDefault();

    const res = await this.props.apiWrapper.updateData(data);
    console.log(res);
  }

   handleAddItem(event) {
       var curr_inputs = this.state.inputs
       var in_length = curr_inputs.length
       curr_inputs.push((in_length + 1).toString())
       {this.setState({inputs: curr_inputs})}
       let curr_input_vals = this.state.input_vals
       curr_input_vals.push(['', ''])
       {this.setState({input_vals: curr_input_vals})}
      }

  async handleDateChange(event) {
    this.setState({date: event.target.value});
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
    const res = await this.props.apiWrapper.getByCols(data);
    console.log(res)
  }

  render() {
    return (
      <div>

        <Container>
        <Form>
        <Form.Group controlId="formBasicEmail">

        <Form.Label>Date</Form.Label>
        <Form.Control placeholder="Enter Date" value={this.state.date} onChange={(e) => this.handleDateChange(e)}/>

        <Form.Label>Location</Form.Label>
        <Form.Control as="select" value={this.state.location} onChange={(e) => this.handleLocationChange(e)}>
        <option>Choose...</option>
        <option>Avila</option>
        </Form.Control>
        <Button onClick={(e) => {this.handleUpdateTable(e)}}>Refresh Table</Button>

      {
        this.state.inputs.map((value, index) => {
          return (
            <div>
        <Form.Label>Item</Form.Label>
        <Form.Row>
          <Col xs={11}>
        <Form.Control name={index.toString()} as="select" onChange={(e) => this.handleChangeDropDown(e, index)}>
            <option>Choose...</option>
            <option>Cigarette_Butts</option>
            <option>Food_Wrappers</option>
            <option>Plastic_Take_Out_Containers</option>
            <option>Plastic_Bottle_Caps</option>
            <option>Metal_Bottle_Caps</option>
            <option>Plastic_Lids</option>
            <option>Straws_And_Stirrers</option>
            <option>Forks_Knives_And_Spoons</option>
            <option>Plastic_Beverage_Bottles</option>
            <option>Glass_Beverage_Bottles</option>
            <option>Beverage_Cans</option>
            <option>Plastic_Grocery_Bags</option>
            <option>Other_Plastic_Bags</option>
            <option>Paper_Bags</option>
            <option>Paper_Cups_And_Plates</option>
            <option>Plastic_Cups_And_Plates</option>
            <option>Foam_Cups_And_Plates</option>
            <option>Fishing_Buoys_Pots_And_Traps</option>
            <option>Fishing_Net_And_Pieces</option>
            <option>Fishing_Line</option>
            <option>Rope</option>
            <option>Six_Pack_Holders</option>
            <option>Other_Plastic_Or_Foam_Packaging</option>
            <option>Other_Plastic_Bottles</option>
            <option>Strapping_Bands</option>
            <option>Tobacco_Packaging_Or_Wrap</option>
            <option>Appliances</option>
            <option>Balloons</option>
            <option>Cigar_Tips</option>
            <option>Cigarette_Lighters</option>
            <option>Construction_Materials</option>
            <option>Fireworks</option>
            <option>Tires</option>
            <option>Condoms</option>
            <option>Diapers</option>
            <option>Syringes</option>
            <option>Tampons</option>
            <option>Foam_Pieces</option>
            <option>Glass_Pieces</option>
            <option>Plastic_Pieces</option>
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
            <Form.Label>Number</Form.Label>
            <Form.Control placeholder="Enter number" name={index.toString()} value={this.state.input_vals[index][1]} onChange={(e) => this.handleChangeTextBox(e, index)}/>
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
}

export default Update;