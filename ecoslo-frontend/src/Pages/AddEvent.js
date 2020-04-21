import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import withLocations from '../Components/withLocations';
import withColumns from '../Components/withColumns';
import Select from 'react-dropdown-select';


const sectionStyle ={
  fontWeight: 'bold',
};

const howToGoThrough = [
  [
    "Summary"
  ],
  [
    "Most Likely To Find Items"
  ],
  [
    "Fishing Gear",
    "Packaging Materials"
  ],
  [
    "Other Trash",
    "Personal Hygiene"
  ],
  [
    "Tiny Trash"  
  ]
];

const columnNames = {
  "Most Likely To Find Items" : {
    "columns" : [[
        "cigarette_butts",
        "food_wrappers",
        "plastic_take_out_containers",
        "foam_take_out_containers",
        "plastic_bottle_caps",
        "metal_bottle_caps",
        "plastic_lids",
        "straws_and_stirrers",
        "forks_knives_and_spoons",
      ],[
        "plastic_beverage_bottles",
        "glass_beverage_bottles",
        "beverage_cans",
        "plastic_grocery_bags",
        "other_plastic_bags",
        "paper_bags",
        "paper_cups_and_plates",
        "plastic_cups_and_plates",
        "foam_cups_and_plates"
      ]
    ],
  },
  "Fishing Gear" : {
    "columns" : [[
      "fishing_buoys_pots_and_traps",
      "fishing_net_and_pieces",
      "fishing_line",
      "rope",
    ]]
  },
  "Packaging Materials" : {
    "columns" : [[
      "six_pack_holders",
      "other_plastic_or_foam_packaging",
      "other_plastic_bottles",
      "strapping_bands",
      "tobacco_packaging_or_wrap",
    ]]
  },
  "Personal Hygiene" : {
    "columns" : [[
      "condoms",
      "diapers",
      "syringes",
      "tampons",
    ]]
  },
  "Other Trash": {
    "columns" : [[
      "appliances",
      "balloons",
      "cigar_tips",
      "cigarette_lighters",
      "construction_materials",
      "fireworks",
      "tires",
    ]]
  },
  "Tiny Trash" : {
    "columns" : [[
      "foam_pieces",
      "glass_pieces",
      "plastic_pieces",
    ]]
  },
  "Summary" : {
    "columns" : [[
      "adult_volunteers",
      "child_volunteers",
      "distance_covered",
      "total_items"
    ], [
      "trash_bags_filled",
      "weight_trash",
      "weight_recycle"
    ]]
  },
  /* "Additional Items" : {
    "columns" : [[
      "Unusual_Items",
      "Dead_Animals"
    ]]
  } */
};

const zip = (array1, array2) => {
  const longerArrLength = array1.length > array2.length ? array1.length : array2.length;
  let zippedArray = [];
  for (let i = 0; i < longerArrLength; i++) {
    let val1 = i < array1.length ? array1[i] : null;
    let val2 = i < array2.length ? array2[i] : null;
    zippedArray.push([val1, val2]);
  }

  return zippedArray;
};

const splitList = (array) => {
  let splitArr = [];
  for (let i = 0; i < array.length; i+=2) {
    let val1 = array[i];
    let val2 = i + 1 < array.length ? array[i + 1] : null;
    splitArr.push([val1, val2]);
  }

  return splitArr;
};


function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

const convertFieldToLabel = (field) => {
  return titleCase(field.replace(/_/g, " "));
};

class AddEvent extends React.Component {

  constructor(props) {
    super(props);
    this.additionalColumns = ["unusual_items", "dead_animals"];
    this.defaultCols = ["location", "date", "event_name"];
    for (const key in columnNames) {
      for (const column of columnNames[key].columns) {
        for (const field of column) {
          this.defaultCols.push(field.toLowerCase());
        }
      }
    }
    

    for (const column of this.props.columns) {
      if (this.defaultCols.indexOf(column) > - 1 && this.additionalColumns.indexOf(column) > -1) {
        this.additionalColumns.push(column);
      }
    }
    console.log("props cols: ", this.props.columns);
    console.log(this.additionalColumns);

    if (this.additionalColumns.length !== 0) {
      howToGoThrough.push(["Additional Items"]);
    }

    this.state = {
      formData : this.getDefaultFormData(),

    }
  }

  marginstyle={
    marginTop: '1.2em',
    marginBottom: '2em'
  }

  updateColumns(){
    this.additionalColumns = ["unusual_items", "dead_animals"];
    console.log(this.props.columns)
    for (const column of this.props.columns) {
      if (this.defaultCols.indexOf(column) === - 1 && this.additionalColumns.indexOf(column) === -1) {
        this.additionalColumns.push(column);
      }
    }
    console.log("props cols: ", this.props.columns);
    console.log(this.additionalColumns);

    if (this.additionalColumns.length !== 0 && howToGoThrough[howToGoThrough.length -1][0] !== "Additional Items") {
      howToGoThrough.push(["Additional Items"]);
    }

    this.state = {
      formData : this.getDefaultFormData(),

    }
  }

  componentDidUpdate(prevProps){
    if(this.props.columns !== prevProps.columns){
      console.log("hello!")
      this.updateColumns();
    }
  }

  getDefaultFormData() {
    let formData = {};
    for (const field of this.defaultCols) {
      formData[field] = "0";
    }

    formData["location"] = null;
    formData["date"] = null;
    formData["event_name"] = null;

    return formData;
  }

  handleLocationChange (item) {
    console.log(item)
    console.log(item[0].text)
    let old = this.state.formData;
    old['location'] = item[0].text
    this.setState({formData: old})
    console.log(this.state.formData)
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

  validateEntry(formEntry) {
    if (formEntry.length === 0) {
      return true;
    }

    let regex;
    if (formEntry.indexOf(".") > -1) {
      regex = /^[0-9]+\.[0-9]+$/g;
    } else {
      regex = /^[0-9]+$/g;
    }

    return regex.test(formEntry);
  }

  handleSubmit = () => {
    let toSendFormData = {};
    for (const pair of Object.entries(this.state.formData)) {
      const key = pair[0], value = pair[1] === null ? null : pair[1].trim();

      if (key === "location" || key === "date") {
        if (value === null) {
          alert("Please input an acceptable value for " + key);
          return false;
        }
        toSendFormData[key] = value;
      } else {
        if (!this.validateEntry(value)) {
          alert("Value " + value + " for " + key + "is not an acceptable value.");
          return false;
        }
        toSendFormData[key] = (+value) || 0;
      }
    }
    
    try {
      let success = this.props.apiWrapper.addData(toSendFormData);
      console.log(success)
      alert("Cleanup successfully added to database.")
    }
    catch (error) {
      alert(error)
    }
  }

  renderRowTitling(titles) {
    return titles.map((title, index) => {
      return (
        <Col key={title}>
          <Form.Label
            style={sectionStyle}
          >
            {title}
          </Form.Label>
          {
            index < title.length - 1 ? <Col xs={1}></Col> : null 
          }
        </Col>
      );
    });
  }

  renderColumnsForSections(titles) {
    let zippedArray;
    if (titles[0] !== "Additional Items") {
      const firstColumnNames = columnNames[titles[0]].columns;
      if (titles.length === 1) {
        if (firstColumnNames.length > 1) {
          zippedArray = zip(firstColumnNames[0], firstColumnNames[1]);
        } else {
          zippedArray = zip(firstColumnNames[0], []);
        }
      } else {
        const secondColumnNames = columnNames[titles[1]].columns;
        zippedArray = zip(firstColumnNames[0], secondColumnNames[0]);
      }
    } else if (titles[0] === "Additional Items") {
      if (this.additionalColumns.length !== 0) {
        const splitAdditionalColumns = splitList(this.additionalColumns);
        zippedArray = splitAdditionalColumns;
      }
    }
    return zippedArray.map((rowNames, rowIndex) => {
      return (
        <Form.Row key={rowIndex}>
          {
            rowNames.map((name, nameIndex) => {
              const labelName = name !== null ? convertFieldToLabel(name) : "";
              return (
                <React.Fragment key={name}>
                  {name !== null ? (
                    <React.Fragment>
                      <Col>
                        <Form.Label>{labelName}</Form.Label>
                      </Col>
                      <Col>
                        <Form.Control 
                          value={this.state.formData[name]}
                          onChange={this.handleOnChange(name)}
                          type="text"
                        />
                        <Form.Control.Feedback type="invalid">
                          { `Please provide a valid ${labelName}` } 
                        </Form.Control.Feedback>
                      </Col>
                    </React.Fragment>
                  ) :
                    <React.Fragment>
                      <Col>
                        <Form.Label/>
                      </Col>
                      <Col/>
                    </React.Fragment>
                  }
                  { nameIndex === 1 ? <Col xs={1} /> : null }
                </React.Fragment>
              );
            })
          }
        </Form.Row>
      );
    });
  }

  renderFormAfterFirstPart() {
    return howToGoThrough.map((sections) => {
      return (
        <Form.Group key={sections[0]}>
          <Form.Row>
            { this.renderRowTitling(sections) }
          </Form.Row>
          { this.renderColumnsForSections(sections) }
        </Form.Group>
      );
    });
  }
  

  render() {
     let locOptions = []
     for (var i = 0; i < this.props.locations.length; i++){
      locOptions.push({text: this.props.locations[i]})
    }
    return (
      <div style={this.marginstyle}>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Date</Form.Label>
              <Form.Control placeholder="Enter Date" onChange={this.handleOnChange("date")} />
              <Form.Label>Location</Form.Label>
              <Select multiple={false} create={true} searchable={true} labelField="text" valueField="text" options={locOptions} values={[]}
              //onCreateNew={(item) => locOptions.push(item)}
              onChange={(value) => this.handleLocationChange(value)}
              >
              </Select>
              <Form.Label>Event Name</Form.Label>
              <Form.Control placeholder="Enter Event Name" onChange={this.handleOnChange("name")} />
              {/* <Form.Control as="select" onChange={this.handleOnChange("location")} >
              <option>Select a Location</option>
              {/* { this.renderLocations() } */}
              {/* { this.props.locations.map((value) => {
                return <option>{value}</option>
              }) } */}
              {/* </Form.Control>  */}
            </Form.Group>
            { this.renderFormAfterFirstPart() }
            <Button onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withColumns(withLocations(AddEvent));