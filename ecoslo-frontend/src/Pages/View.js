import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row, Alert } from "react-bootstrap"; 
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
    try {
      if(this.state.colNames === undefined) {
        let res = await this.props.apiWrapper.getColumns();
        var names = []
        var vals = []
        for (var i = 0; i < res.r.fields.length; i++){
          names.push(res.r.fields[i].name)
          vals.push(false)
        }
        this.setState({colNames: names})
        this.initSelectedValues()
      }
    }
    catch(err){

    }
    
  }

  handleLocationChange (event) {
    let selected = []
    for(var i = 0; i < event.target.options.length; i++){
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

  handleStringInputChange = (field, validationFunction = null) => event => {
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

  setShow(b) {
    this.setState({showAlert: b})
  }

  async handleSubmit(event) {
    event.preventDefault();

    if(this.state.colNames !== undefined) {
      var selected = []
      let data = this.state.columnNames
      var i = 0
      for(var key in data){
        for(var index in data[key]){
          if(data[key][index] !== null && this.state.selectedValues[i] === true){
            selected.push(this.state.colNames[i])
          }
        i += 1
        }
      }

      if(this.state.groupByValues[0] === false && this.state.groupByValues[1] === false && this.state.groupByDate === "None"){
        var d = {
          dateStart: this.state.formData['dateStart'],
          dateEnd: this.state.formData['dateEnd'],
          cols: selected,
          locations: this.state.locations
        }
    
        try{
          let td = await this.props.apiWrapper.getByCols(d);
          if(td.rows !== undefined && td.rows.length !== 0){
            this.setState({tableData: td})
          }
          else{
            //this.setState({showAlert: true})
            alert("No data found. Try entering a different date range and location.")
          }
        }
        catch(e){
          alert("There was an error in your request. Please check your input and try again.")
        }
      }
      else{
        var groupCols = []
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
        var q = {
          dateStart: this.state.formData['dateStart'],
          dateEnd: this.state.formData['dateEnd'],
          cols: selected,
          locations: this.state.locations,
          groupBy: groupCols
        }
        try{
          let td = await this.props.apiWrapper.sumPerCol(q);
          if(td.rows !== undefined && td.rows.length !== 0){
            this.setState({tableData: td})
          }
          else{
            //this.setState({showAlert: true})
            alert("No data found. Try entering a different date range and location.")
          }
        }
        catch(e){
          alert("There was an error in your request. Please check your input and try again. If you checked any boxes in the group by section, you can only view date, location, and event name if you also selected them under group by.")
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
    this.setState({groupByDate: event.target.value})
  }



  handleGroupByCheckbox = (e, col) =>{
    var duplicateVals = this.state.groupByValues
    if (col === "Location"){
      duplicateVals[0] = e.target.checked
      this.setState({groupByValues: duplicateVals})
    }
    if (col === "Event Name"){
      duplicateVals[1] = e.target.checked
      this.setState({groupByValues: duplicateVals})
    }

  }



renderGroupByCheckBoxes = () => {
  if(this.state.colNames !== undefined){
    return(
    <div>
      <Form.Label className="big">Group By</Form.Label>
      <div></div>
      <input type="checkbox"
        name="Location"
        checked={this.state.groupByValues[0]}
        onChange={(e) => this.handleGroupByCheckbox(e, "Location")}/> Location
      <div></div>

      <input type="checkbox"
        name="Event Name"
        checked={this.state.groupByValues[1]}
        onChange={(e) => this.handleGroupByCheckbox(e, "Event Name")}/> Event Name
      <div>
        <Form.Control multiple={false} as="select" onChange={(e) => this.handleGroupByDateChange(e)} >
                    <option>None</option>
                    <option>Date</option>
                    <option>Full Date</option>
                    <option>Month</option>
                    <option>Year</option>
                    <option>Month and Year</option>
                    
        </Form.Control>
      </div>
      <div></div>
      </div>
      );
    }
  }
 
 initSelectedValues = ()  => {
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
    }

  }
  this.setState({selectedValues : values})
  this.setState({columnNames : columns})

 }
}



  

  renderItemCheckboxes = ()  => {
    if(this.state.colNames !== undefined){
      let columns = this.state.columnNames;
      let checkboxGroups = Object.keys(columns).map((group, index)=> {
        let checkboxes = Object.keys(columns[group]).map((col, i)=> {
            if(columns[group][col] !== null){
              return(
                <td id="table">
                  <input type="checkbox"
                    name={col}
                    checked={this.state.selectedValues[columns[group][col]]}
                    onChange={(e) => this.handleInputChange(e, columns[group][col])}/>
                    {" " + col.split("_").join(" ")}
                </td>
              )
            }
            else{
              return null
            }
        })

        let rowGroups = [];
        while(checkboxes.length){
          rowGroups.push(checkboxes.splice(0, 5));
        }
        let rows = rowGroups.map((colArray, index) => {
          return(
            <tr>
              {colArray.map((col, i) => {
                  return(
                    col
                  );
              })}
            </tr>
          );
        })
        return(
          <div>
          <div className="thick">{group}</div>
          <Table bordered hover size="sm">
          <tbody>
            {rows}
          </tbody>
          </Table>
          </div>
        )
      })
     return checkboxGroups;
    }
  else {
    return null
   }
  } 






  render() {
    if(this.state.colNames !== undefined){
    return (
      <div>
      <div style={this.marginstyle}>
        <Container>
          {this.noDataAlert()}
        <Form>
          <div>
            
          <Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label className="big">Start Date</Form.Label>
                  <Form.Control placeholder="Enter Date" onChange={this.handleStringInputChange("dateStart")} />
                </Col>
                <Col>
                  <Form.Label className="big">End Date</Form.Label>
                  <Form.Control placeholder="Enter Date" onChange={this.handleStringInputChange("dateEnd")} />
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

            <Form.Group>
              {this.renderGroupByCheckBoxes()}
            </Form.Group>
            <Form.Label className="big">Select Which Items to View</Form.Label>
            {this.renderItemCheckboxes()}
            <Button type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</Button>
          </div>
        </Form>
        </Container>
        <DataTable data={this.state.tableData}></DataTable>
        
      </div>
</div>
      
    );

            }
            else{
              return null
            }
  }
}

export default withLocations(View);