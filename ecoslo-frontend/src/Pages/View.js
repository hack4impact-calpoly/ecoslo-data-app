import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap"; 
import Table from "react-bootstrap/Table";
import DataTable from '../Components/DataTable.js';
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

        colChecks :[["cigarette_butts", false], ["food_wrappers", true]],

      displayReady: false,
      formData : {
        "location": null, 
        "date" : null
      }
    };

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

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    let stateCopy = Object.assign({}, this.state); 
    stateCopy.selected[name] = value; 

    this.setState(stateCopy); 
  }

  handleSubmit = (event) => {
    alert('Columns submitted');
    event.preventDefault(); 
    this.setState({displayReady : true}); 
  }

  renderForm = ()  => {
    let data = this.state.columns; 

    let formUI = data.map((col, index) => {
      // return (
      //       <div key={col}><label>
      //         <input type="checkbox" 
      //         name={col}
      //         checked={this.state.colChecks[index][1]}
      //         onChange={this.handleInputChange}/> {col}
      //         </label>    
      //       </div>
      // )

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
        if (this.state.selected[col]) {
          return (
            <td>{col}</td>
            // <div key={col}>
            //   <Form.Label>{col}</Form.Label>
            //   <Form.Control></Form.Control>
            // </div>
          )
        } 
    })
    console.log(this.state.selected); 
    return selectedUI;
  }

  renderRows = () => {
    let result =
      {
        location: "Avila",
        cigaretteButts: 3,
        foodWrappers: 6
      }
    
    let rowVals = Object.keys(result);
    let rowData = rowVals.map((val) => {
      return (
        <td>{result[val]}</td>
      )
    })

    return rowData; 
  }

  renderTable = () => {
    return (
      <table id='cleanups'>
        <tbody>
        <tr key={this.state.formData["date"]}>
          <td>Location</td>
          {this.renderColumns()}
        </tr>    
        <tr key={this.state.formData["location"]}>
          {this.renderRows()}
        </tr>
        </tbody> 
      </table>    
    )            
  }

  getDisplay = () => {
    if (this.state.displayReady) {
      return this.renderTable(); 
    }
  } 

  render() {
    return (
      <div>
        <Container>
        <Form>
          <div>
          <Form.Group controlId="formBasicEmail">
              <Form.Label>Date</Form.Label>
              <Form.Control placeholder="Enter Date" onChange={this.handleOnChange("date")} />
              <Form.Label>Location</Form.Label>
              <Form.Control as="select" onChange={this.handleOnChange("location")} >
              <option>Select a Location</option>
              <option>Elephant Seal Viewing Point</option>
              <option>San Simeon Cove / Hearst State Beach</option>
              <option>San Simeon, Pico Beach and Creek</option>
              <option>San Simeon Campground</option>
              <option>Moonstine Beach / Santa Rosa Creek</option>
              <option>Fiscalini Ranch Preservce / Santa Rose Creek</option>
              <option>Paso Robles Wastewater Treatment Plant</option>
              <option>Paso Robles Centennial Creek Park</option>
              <option>Paso Robles Larry Moore Park</option>
              <option>Templeton Community Services District</option>
              <option>Atascadero Mutual Water Co. Corporation Yard</option>
              <option>Estero Bluffs State Beach</option>
              <option>Cayucos Pier</option>
              <option>Cayucos at 24th St. / Morro Strand State Beach Park</option>
              <option>Morro Strand Dog Beach / Toro Creek</option>
              <option>Morro Strand North / State Beach Campground</option>
              <option>Morro Strand South at Highway 41</option>
              <option>Morro Creek</option>
              <option>Morro Rock</option>
              <option>Morro Bay Landing / Sandspit</option>
              <option>Morro Bay Embarcadero</option>
              <option>Los Osos Baywood Pier / Paradise Point</option>
              <option>Montana de Oro Sandspit</option>
              <option>Montana de Oro Spooners Cove</option>
              <option>Santa Margarita West Cuesta Ridge Trailhead</option>
              <option>Santa Margarita Lake</option>
              <option>El Chorro Regional Park / SLO Botanical Gardens</option>
              <option>Cal Poly Campus Market</option>
              <option>Cuesta Park SLO</option>
              <option>Mission Plaza SLO</option>
              <option>Sinsheimer Park SLO</option>
              <option>Laguna Lake SLO</option>
              <option>SLO Creek Pepper / Pacific Streets</option>
              <option>Lower SLO Creek Floodplain Preserve</option>
              <option>Avila Beach</option>
              <option>Fisherman's Beach and Olde Port Beach</option>
              <option>Pirates' Cove and Cave Landing</option>
              <option>Shell Beach</option>
              <option>Downtown Pismo Beach</option>
              <option>Pismo Pier</option>
              <option>Pismo at Ocean View Ave</option>
              <option>Grover Beach</option>
              <option>Lopez Lake</option>
              <option>Oak Park Shopping Center Arroyo Grande</option>
              <option>Kiwanis Park Arroyo Grande Creek</option>
              <option>Arroyo Grande High School</option>
              <option>Oceano Lagoon</option>
              <option>Oso Flaco Lake</option>
              </Form.Control>
            </Form.Group>
            {this.renderForm()}
            <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
            {this.getDisplay()}
          </div>
        </Form>
        </Container>
        <DataTable></DataTable>
      </div>
    );
  }
}

export default View;