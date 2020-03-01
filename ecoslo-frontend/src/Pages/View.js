import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap"; 
import Table from "react-bootstrap/Table";
import "../styles/page.css";

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: ['cigarette_butts', 'food_wrappers', 'plastic_take_out_containers',
        'foam_take_out_containers','plastic_bottle_caps','metal_bottle_caps',
        'plastic_lids','straws_and_stirrers','forks_knives_and_spoons',
        'plastic_beverage_bottles','glass_beverage_bottles','beverage_cans',
        'plastic_grocery_bags','other_plastic_bags','paper_bags',
        'paper_cups_and_plates','plastic_cups_and_plates','foam_cups_and_plates',
        'fishing_buoys_pots_and_traps','fishing_net_and_pieces','fishing_line',
        'rope','six_pack_holders','other_plastic_or_foam_packaging',
        'other_plastic_bottles','strapping_bands','tobacco_packaging_or_wrap',
        'appliances','balloons','cigar_tips','cigarette_lighters','construction_materials',
        'fireworks','tires','condoms','diapers','syringes','tampons',
        'foam_pieces','glass_pieces','plastic_pieces'],
      
      selected: {
        cigaretteButts: false, foodWrappers: false, plasticTakeOutContainers: false,
        foamTakeOutContainers: false, plasticBottleCaps: false, metalBottleCaps: false,
        plasticLids: false, strawsAndStirrers: false, forksKnivesAndSpoons: false,
        plasticBeverageBottles: false, glassBeverageBottles: false, beverageCans: false,
        plasticGroceryBags: false, otherPlasticBags: false, paperBags: false,
        paperCupsAndPlates: false, plasticCupsAndPlates: false, foamCupsAndPlates: false,
        fishingBuoysPotsAndTraps: false, fishingNetAndPieces: false, fishingLine: false,
        rope: false, sixPackHolders: false, otherPlasticOrFoamPackaging: false,
        otherPlasticBottles: false, strappingBands: false, tobaccoPackagingOrWrap: false,
        appliances: false, balloons: false, cigarTips: false, cigaretteLighters: false, 
        constructionMaterials: false,fireworks: false, tires: false, condoms: false,
        diapers: false, syringes: false, tampons: false,foamPieces: false, 
        glassPieces: false, plasticPieces: false},

      displayReady: false
    };

  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    let stateCopy = Object.assign({}, this.state); 
    stateCopy.selected[name] = value; 

    this.setState(stateCopy); 

    //this.setState({
    //  [name] : value
    //});
  }

  handleSubmit = (event) => {
    alert('Columns submitted');
    event.preventDefault(); 
    this.setState({displayReady : true}); 
  }

  renderForm = ()  => {
    let data = this.state.columns; 

    let formUI = data.map((col) => {
      if (col == 'cigarette_butts') {
        return (
          <div key={col}><label>
            <input type="checkbox" 
            name="cigaretteButts"
            checked={this.state.cigaretteButts}
            onChange={this.handleInputChange}/> Cigarette Butts
            </label>    
          </div>
        )
      }

      if (col == 'food_wrappers') {
        return (
          <div key={col}><label>
            <input type="checkbox" 
            name="foodWrappers"
            checked={this.state.foodWrappers}
            onChange={this.handleInputChange}/> Food Wrappers
            </label>    
          </div>
        )
      }
      
      if (col == 'plastic_take_out_containers') {
        return (
          <div key={col}><label>
            <input type="checkbox" 
            name="plasticTakeOutContainers"
            checked={this.state.plasticTakeOutContainers}
            onChange={this.handleInputChange}/> Plastic Take Out Containers
            </label>    
          </div>
        )
      }

      if (col == 'foam_take_out_containers') {
        return (
          <div key={col}><label>
            <input type="checkbox" 
            name="distanceCovered"
            checked={this.state.distanceCovered}
            onChange={this.handleInputChange}/> Distance Covered
            </label>    
          </div>
        )
      }

      if (col == '# of Volunteers - Adult') {
        return (
          <div key={col}><label>
            <input type="checkbox" 
            name="volunteersAdult"
            checked={this.state.volunteersAdult}
            onChange={this.handleInputChange}/> # of Volunteers - Adult
            </label>    
          </div>
        )
      }

      if (col == '# of Volunteers - Child') {
        return (
          <div key={col}><label>
            <input type="checkbox" 
            name="volunteersChild"
            checked={this.state.volunteersChild}
            onChange={this.handleInputChange}/> # of Volunteers - Child
            </label>    
          </div>
        )
      }

      if (col == 'Unusual Items') {
        return (
          <div key={col}><label>
            <input type="checkbox" 
            name="unusualItems"
            checked={this.state.unusualItems}
            onChange={this.handleInputChange}/> Unusual Items
            </label>    
          </div>
        )
      }

    })

    return formUI;
  }

  renderColumns = () => {
    let columns = Object.keys(this.state.selected); 
    let selectedUI = columns.map((col) => {
      // console.log(columns); 
      // for (let col of columns) {
      //   console.log(this.state.selected[col]);
        if (this.state.selected[col]) {
          return (
            <div key={col}>
              <Form.Label>{col}</Form.Label>
              <Form.Control></Form.Control>
            </div>
          )
        } 
      //}
    })
    console.log(this.state.selected); 
    return selectedUI;
  }

  getDisplay = () => {
    if (this.state.displayReady) {
      return this.renderColumns(); 
    }
  } 

  render() {
    return (
      <div>
        <Container>
        <Form>
          <div>
            {this.renderForm()}
            <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
            {/* {this.renderColumns()}  */}
            {this.getDisplay()}
          </div>
        </Form>
        </Container>
      </div>
    );
  }
}

export default View;