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
      showAlert: false,
      groupByCols: [],
      groupByValues: [false, false],
      groupByDate: "None",

      columnNames : {
        "Key Information" : {
          "date" : null,
          "event_name" : null,
          "location": null,
        },
        "Most Likely To Find Items" : {
          "cigarette_butts" : null,
          "food_wrappers" : null,
          "plastic_take_out_containers" : null,
          "foam_take_out_containers" : null,
          "plastic_bottle_caps" : null,
          "metal_bottle_caps" : null,
          "plastic_lids" : null,
          "straws_and_stirrers" : null,
          "forks_knives_and_spoons" : null,
          "plastic_beverage_bottles" : null,
          "glass_beverage_bottles" : null,
          "beverage_cans" : null,
          "plastic_grocery_bags" : null,
          "other_plastic_bags" : null,
          "paper_bags" : null,
          "paper_cups_and_plates" : null,
          "plastic_cups_and_plates" : null,
          "foam_cups_and_plates" : null
        },
        "Fishing Gear" : {
          "fishing_buoys_pots_and_traps" : null,
          "fishing_net_and_pieces" : null,
          "fishing_line" : null,
          "rope" : null
        },
        "Packaging Materials" : {
          "six_pack_holders" : null,
          "other_plastic_or_foam_packaging" : null,
          "other_plastic_bottles" : null,
          "strapping_bands" : null,
          "tobacco_packaging_or_wrap" : null
        },
        "Personal Hygiene" : {
          "condoms" : null,
          "diapers" : null,
          "syringes" : null,
          "tampons" : null
        },
        "Other Trash": {
          "appliances" : null,
          "balloons" : null,
          "cigar_tips" : null,
          "cigarette_lighters" : null,
          "construction_materials" : null,
          "fireworks" : null,
          "tires" : null
        },
        "Tiny Trash" : {
          "foam_pieces" : null,
          "glass_pieces" : null,
          "plastic_pieces" : null
        },
        "Summary" : {
          "adult_volunteers" : null,
          "child_volunteers" : null,
          "distance_covered" : null,
          "total_items" : null,
          "trash_bags_filled" : null,
          "weight_trash" : null,
          "weight_recycle" : null
        },
        "Additional Items" : {
          "unusual_items" : null,
          "dead_animals" : null
        }
      }
    };
  }

  marginstyle={
    marginTop: '1.2em',
    marginBottom: '2em'
  }

  async componentDidMount(){
    console.log("colnames", this.state.colNames);
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
  }


  handleCheckBoxChange = (event, index) => {
    
    const target = event.target;
    const value = target.checked;
    let cb = this.state.checkboxes
    cb[index] = value
    this.setState({checkboxes: cb})
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
      if(this.state.groupByValues[0] === false && this.state.groupByValues[1] === false && this.state.groupByDate === "None"){
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
      else{
        var groupCols = []
        console.log("groupby", this.state.groupByValues[0])
        if(this.state.groupByValues[0] === true){
          
          groupCols.push("location")
        
        }
        if(this.state.groupByValues[1] === true){
          groupCols.push("event_name")
        }
        if(this.state.groupByDate !== "None"){
          if(this.state.groupByDate === "Month and Year"){
            groupCols.push("monYear")
          }
          if(this.state.groupByDate === "Full Date"){
            groupCols.push("date")
          }
          else{
            groupCols.push(this.state.groupByDate.toLowerCase())
          }
          
        }
        console.log("groupcols", groupCols)
        var q = {
          dateStart: this.state.formData['dateStart'],
          dateEnd: this.state.formData['dateEnd'],
          cols: selected,
          locations: this.state.locations,
          groupBy: groupCols
        }
        let td = await this.props.apiWrapper.sumPerCol(q);
        if(td.rows !== undefined && td.rows.length !== 0){
          this.setState({tableData: td})
        }
        else{
          this.setState({showAlert: true})
        }

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

  handleGroupByDateChange (event) {
    console.log("target", event.target.value)
    this.setState({groupByDate: event.target.value})
  }



  handleGroupByCheckbox = (e, col) =>{
    var duplicateVals = this.state.groupByValues
    if (col == "Location"){
      duplicateVals[0] = e.target.checked
      this.setState({groupByValues: duplicateVals})
    }
    if (col == "Event Name"){
      duplicateVals[1] = e.target.checked
      this.setState({groupByValues: duplicateVals})
    }

  }



renderCheckBoxes = () => {
  if(this.state.colNames !== undefined && this.state.selectedValues !== undefined){
    let data = ["Location", "Event Name"];
    return(
    <div>
      <Form.Label className="big">Group By</Form.Label>
      <Table bordered hover size="med">
        <tbody>
        <tr>
    <td><label>
    <input type="checkbox"
    name="Location"
    checked={this.state.groupByValues[0]}
    onChange={(e) => this.handleGroupByCheckbox(e, "Location")}/> Location
  </label>
  </td>
  <td><label>
      <input type="checkbox"
      name="Event Name"
      checked={this.state.groupByValues[1]}
      onChange={(e) => this.handleGroupByCheckbox(e, "Event Name")}/> Event Name
      </label> 
      </td>
      <div>
      
      <Form.Control multiple={false} as="select" onChange={(e) => this.handleGroupByDateChange(e)} >
                  <option>Date</option>
                  <option>Full Date</option>
                  <option>Month</option>
                  <option>Year</option>
                  <option>Month and Year</option>
                  
      </Form.Control>
      
      </div>
      </tr>
      </tbody>
      </Table>
      </div>
      );
    }
  }
 
 renderCols = ()  => {
  if(this.state.colNames !== undefined){
  var counter = -1
  let data = this.state.colNames;
  var columns = this.state.columnNames;
  var values = []
  for(var i = 0; i < data.length; i=(i+1)){
    var added = false
    for(var key in columns){
      if(columns[key][data[i]] !== undefined){
        counter += 1
        columns[key][data[i]] = counter
        values.push(false)
        added = true
      }
    }
    if(added === false){
      counter += 1;
      columns["Additional Items"][data[i]] = counter
      values.push(false)
      console.log(columns["Additional Items"][data[i]])
    }

  }
  this.setState({columnNames : columns})
  this.setState({selectedValues : values})
 }
}



  

  renderForm = ()  => {
    if(this.state.colNames !== undefined){
      let columns = this.state.columnNames;
      let checkboxGroups = Object.keys(columns).map((group, index)=> {
        let checkboxes = Object.keys(columns[group]).map((col, i)=> {
          return(
            <td id="table">
            <label>
            <input type="checkbox"
            name={col}
            checked={this.state.selectedValues[columns[group][col]]}
            onChange={(e) => this.handleInputChange(e, columns[group][col])}/> {col.split("_").join(" ")}
            </label> 
          </td>
          )
        })
        return(
          <div>
          <div className="thick">{group}</div>
          <Table bordered hover size="sm">
          <tbody>
          <tr>
            {checkboxes}
          </tr>
          </tbody>
          </Table>
          </div>
        )
      })






      // let formUI = data.map((col, index) => {
      //   return (
      //       <td id="table">
      //         <label>
      //         <input type="checkbox"
      //         name={col}
      //         checked={this.state.selectedValues[index]}
      //         onChange={(e) => this.handleInputChange(e, index)}/> {col.split("_").join(" ")}
      //         </label> 
      //       </td>
            
      //   )})

      //  let tableboxes = []
      // for(var i = 0; i < formUI.length; i=(i+55)){
      //   tableboxes.push(
      //     <div>
      //       <div className="thick">Key Information</div>
      //     <Table bordered hover size="sm">
      //     <tbody>
      //     <tr>
      //       {formUI[i]}
      //       {formUI[i+1]}
      //       {formUI[i+2]}
      //     </tr>
      //     </tbody>
      //     </Table>
      //     <div className="thick">Summary</div>
      //     <Table bordered hover size="sm">
      //     <tbody>
      //     <tr>
      //       {formUI[i+3]}
      //       {formUI[i+4]}            
      //       {formUI[i+5]}
      //       {formUI[i+6]}
      //       </tr>
      //       <tr>
      //       {formUI[i+7]}
      //       {formUI[i+8]}
      //       {formUI[i+9]}
      //       </tr>
      //       </tbody>
      //       </Table>
      //       <div className="thick">Most Likely to Find Items</div>
      //       <Table bordered hover size="sm">
      //       <tbody>
      //       <tr>
      //       {formUI[i+10]}
      //       {formUI[i+11]}
      //       {formUI[i+12]}
      //       {formUI[i+13]}
      //       </tr>
      //       <tr>
      //       {formUI[i+14]}
      //       {formUI[i+15]}
      //       {formUI[i+16]}
      //       {formUI[i+17]}
      //       </tr>
      //       <tr>
      //       {formUI[i+18]}
      //       {formUI[i+19]}
      //       {formUI[i+20]}
      //       {formUI[i+21]}
      //       </tr>
      //       <tr>
      //       {formUI[i+22]}
      //       {formUI[i+23]}
      //       {formUI[i+24]}
      //       {formUI[i+25]}
      //       </tr>
      //       <tr>
      //       {formUI[i+26]}
      //       {formUI[i+27]}
      //       </tr>
      //       </tbody>
      //       </Table>
      //       <div className="thick">Fishing Gear</div>
      //       <Table bordered hover size="sm">
      //       <tbody>
      //       <tr>
      //       {formUI[i+28]}
      //       {formUI[i+29]}
      //       {formUI[i+30]}
      //       {formUI[i+31]}
      //       </tr>
      //       </tbody>
      //       </Table>
      //       <div className="thick">Packaging Materials</div>
      //       <Table bordered hover size="sm">
      //       <tbody>
      //       <tr>
      //       {formUI[i+32]}
      //       {formUI[i+33]}
      //       {formUI[i+34]}
      //       {formUI[i+35]}
      //       </tr>
      //       <tr>
      //       {formUI[i+36]}
      //       </tr>
      //       </tbody>
      //       </Table>
      //       <div className="thick">Other Trash</div>
      //       <Table bordered hover size="sm">
      //       <tbody>
      //       <tr>
      //       {formUI[i+37]}
      //       {formUI[i+38]}
      //       {formUI[i+39]}
      //       {formUI[i+40]}
      //       </tr>            
      //       <tr>
      //       {formUI[i+41]}
      //       {formUI[i+42]}
      //       {formUI[i+43]}
      //       </tr>
      //       </tbody>
      //       </Table>
      //       <div className="thick">Personal Hygine</div>
      //       <Table bordered hover size="sm">
      //       <tbody>
      //       <tr>
      //       {formUI[i+44]}
      //       {formUI[i+45]}
      //       {formUI[i+46]}
      //       {formUI[i+47]}
      //       </tr> 
      //       </tbody>    
      //       </Table>
      //       <div className="thick">Tiny Trash</div>
      //       <Table bordered hover size="sm">
      //       <tbody>
      //       <tr>

      //       {formUI[i+50]}
      //       {formUI[i+51]}
      //       {formUI[i+52]}
      //       </tr>  
      //       </tbody>   
      //       </Table>
      //       <div className="thick">Additonal Items</div>
      //       <Table bordered hover size="sm">
      //       <tbody>
      //       <tr>
      //       {formUI[i+48]}
      //       {formUI[i+49]}
      //       {formUI[i+53]}
      //       {formUI[i+54]}
      //       </tr>   
      //       <tr>
      //       {formUI[i+55]}
      //       {formUI[i+56]}
      //       {formUI[i+57]}
      //       {formUI[i+58]}
      //       </tr>  
      //       <tr>
      //       {formUI[i+59]}
      //       {formUI[i+60]}
      //       {formUI[i+61]}
      //       {formUI[i+62]}
      //       </tr> 
      //       <tr>
      //       {formUI[i+63]}
      //       {formUI[i+64]}
      //       {formUI[i+65]}
      //       {formUI[i+66]}
      //       </tr>  
      //       <tr>
      //       {formUI[i+67]}
      //       {formUI[i+68]}
      //       {formUI[i+69]}
      //       {formUI[i+70]}
      //       </tr> 
      //       <tr>
      //       {formUI[i+71]}
      //       {formUI[i+72]}
      //       {formUI[i+73]}
      //       {formUI[i+74]}
      //       </tr> 
      //       </tbody>
          
      //     </Table>
      //     </div>
          
      //   )
      // }
         return checkboxGroups;
       }
      else {
        console.log("happened")
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
              <Form.Label className="big">Start Date</Form.Label>
              <Form.Control placeholder="Enter Date" onChange={this.handleOnChange("dateStart")} />
              </Col>
              <Col>
              <Form.Label className="big">End Date</Form.Label>
              <Form.Control placeholder="Enter Date" onChange={this.handleOnChange("dateEnd")} />
              </Col>
              
              </Row>
              </Form.Group>
              
              <Form.Label className="big">Location</Form.Label>
              <Form.Control multiple={true} as="select" onChange={(e) => this.handleLocationChange(e)} >
                  <option>Select All</option>
                  { this.props.locations.map((value) => {
                    return <option>{value}</option>
                  }) }
              </Form.Control>



            </Form.Group>
                  <div>
                    {this.renderCheckBoxes()}
                  </div>
            <Form.Label className="big">Select Which Items to View</Form.Label>
            {this.renderCols()}
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