import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'
window.$field_count = 1;


class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputs: ['1'],
     cols: {Cigarette_Butts: '', Food_Wrappers: '', Plastic_Take_Out_Containers: '', Plastic_Bottle_Caps: '', Metal_Bottle_Caps: '',Plastic_Lids: '', Straws_And_Stirrers: '', 
     Forks_Knives_And_Spoons: '', Plastic_Beverage_Bottles: '', Glass_Beverage_Bottles: '', Beverage_Cans: '', Plastic_Grocery_Bags: '', Other_Plastic_Bags: '', Paper_Bags: '', 
     Paper_Cups_And_Plates: '', Plastic_Cups_And_Plates: '', Foam_Cups_And_Plates: '', Fishing_Buoys_Pots_And_Traps: '', Fishing_Net_And_Pieces: '', Fishing_Line: '', Rope: '', 
     Six_Pack_Holders: '', Other_Plastic_Or_Foam_Packaging: '', Other_Plastic_Bottles: '', Strapping_Bands: '', Tobacco_Packaging_Or_Wrap: '', Appliances: '', Balloons: '', Cigar_Tips: '', 
     Cigarette_Lighters: '', Construction_Materials: '', Fireworks: '', Tires: '', Condoms: '', Diapers: '', Syringes: '', Tampons: '', Foam_Pieces: '', Glass_Pieces: '', Plastic_Pieces: ''},
     input_vals: [['', '']]
    
  };
    
    this.handleChangeTextBox = this.handleChangeTextBox.bind(this);
    this.handleChangeDropDown = this.handleChangeDropDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChangeTextBox(event, type) {
    console.log(type - 1)
    var new_list_input = this.state.input_vals;
    new_list_input[type-1][1] = event.target.value
    console.log(type)
    this.setState({input_vals: new_list_input});
  }

  handleChangeDropDown(event, type) {
    var new_list_input = this.state.input_vals;
    new_list_input[type-1][0] = event.target.value
    this.setState({input_vals: new_list_input});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

   handleAddItem(event) {
       window.$field_count += 1
       var curr_inputs = this.state.inputs
       var in_length = curr_inputs.length
       curr_inputs.push((in_length + 1).toString())
       {this.setState({inputs: curr_inputs})}
       var curr_input_vals = this.state.input_vals
       curr_input_vals.push(['', ''])
       {this.setState({input_vals: curr_input_vals})}
      }

  render() {
    return (
      <div>
        

        <Container>
        <Form>
        <Form.Group controlId="formBasicEmail">

        <Form.Label>Date</Form.Label>
        <Form.Control placeholder="Enter Date" />

        <Form.Label>Location</Form.Label>
        <Form.Control as="select">
        <option>Choose...</option>
        </Form.Control>
      {
        this.state.inputs.map((in_name) => {
          var curr_field_count = window.$field_count
          console.log('cfc: ', curr_field_count)
          return (
            <div>
        <Form.Label>Item</Form.Label>
        <Form.Control as="select"  onChange={() => this.handleChangeDropDown(this, curr_field_count)}>
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

            <Form.Label>Number</Form.Label>
            <Form.Control placeholder="Enter number" value={this.state.input_vals[curr_field_count - 1][1]} onChange={() => this.handleChangeTextBox(this, curr_field_count)}/>
            </div>
          )
        })
      }


        <Button onClick={() => {this.handleAddItem()}}>Update Another Item</Button> 


        </Form.Group>
        </Form>
        </Container>
      </div>
    );
  }
}

export default Update;