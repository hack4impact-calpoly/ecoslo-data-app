import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Col} from 'react-bootstrap';
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
    this.additionalColumns = [];
    this.defaultCols = ["location", "date", "event_name"];
    this.defaultColTypes = { "location" : "string", "date" : "string", "event_name" : "string" };
    for (const key in columnNames) {
      for (const column of columnNames[key].columns) {
        for (const field of column) {
          this.defaultCols.push(field.toLowerCase());
          this.defaultColTypes[field.toLowerCase()] = "numeric";
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
      publicState: "None",
    }
  }

  marginstyle={
    marginTop: '1.2em',
    marginBottom: '2em'
  }

  updateColumns(){
    this.additionalColumns = [];
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
    this.setState({formData : Object.assign(this.state.formData, this.getDefaultAdditionalData())})
  }

  componentDidUpdate(prevProps){
    if(this.props.columns !== prevProps.columns){
      this.updateColumns();
    }
  }

  getDefaultAdditionalData() {
    let formData = {};
    for (const field of this.additionalColumns) {
      if (this.props.colTypes && this.props.colTypes.hasOwnProperty(field)) {
        const colType = this.props.colTypes[field];
        if (colType === "string") {
          formData[field] = "";
        } else if (colType === "numeric") {
          formData[field] = "0";
        } else if (colType === "boolean") {
          formData[field] = 'False';
        } else {
          console.log("error in type");
        }
      } else {
        console.log("Col " + field + " has no col type reported!");
      }
    }

    return formData;
  }

  getDefaultFormData() {
    let formData = {};
    for (const field of this.defaultCols) {
      if (this.defaultColTypes[field] === "numeric") {
        formData[field] = "0";
      } else if (this.defaultColTypes[field] === "boolean") {
        formData[field] = 'False';
      } else if (this.defaultColTypes[field] === "string") {
        formData[field] = null;
      }
    }

    return Object.assign(formData, this.getDefaultAdditionalData());
  }

  handlePublicChange (event) {
    this.setState({publicState: event.target.value})
  }


  handleLocationChange (item) {
    let old = this.state.formData;
    old['location'] = item[0].text
    this.setState({formData: old})
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

  validateNumericEntry(formEntry) {
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
      console.log(key, value)
      if (this.defaultColTypes[key] === "string") {
        if (value === null || value.length === 0) {
          alert("Please input an acceptable value for " + convertFieldToLabel(key) + " at least one character in length.");
          return false;
        }
        toSendFormData[key] = value;
      } else if (this.defaultColTypes[key] === "numeric") {
        if (!this.validateNumericEntry(value)) {
          alert("Value " + value + " for " + convertFieldToLabel(key) + " is not an acceptable value.");
          return false;
        }
        toSendFormData[key] = (+value) || 0;
      } else if (this.defaultColTypes[key] === "boolean") {
        if (!this.validateBooleanEntry(value)) {
          alert("Value for " + convertFieldToLabel(key) + " must be true or false!");
          return false;
        }
      } else {
        console.log("Unknown column type for", convertFieldToLabel(key));
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
    } else {
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
                        { titles[0] === "Additional Items" && this.props.colTypes[name] === "boolean" ?
                          <Form.Control
                            value={this.state.formData[name]}
                            as="select"
                            onChange={this.handleOnChange(name)}
                          >
                              <option>True</option>
                              <option>False</option>
                          </Form.Control>
                        :
                          <Form.Control 
                            value={this.state.formData[name]}
                            onChange={this.handleOnChange(name)}
                            type="text"
                          />
                        }
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
    };
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
              <Form.Control placeholder="Enter Event Name" onChange={this.handleOnChange("event_name")} />
              <Form.Label>Public or Private Event</Form.Label>
              <Form.Control multiple={false} as="select" onChange={(e) => this.handlePublicChange(e)} >
                    <option>Public</option>
                    <option>Private</option>
              </Form.Control>
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