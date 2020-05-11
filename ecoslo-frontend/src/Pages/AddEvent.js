import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Col} from 'react-bootstrap';
import withLocations from '../Components/withLocations';
import withColumns from '../Components/withColumns';
import Select from 'react-dropdown-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
    let defaultCols = new Set(["location", "date", "event_name"]);
    this.defaultColTypes = { "location" : "string", "date" : "string", "event_name" : "string" };
    for (const key in columnNames) {
      for (const column of columnNames[key].columns) {
        for (const field of column) {
          defaultCols.add(field.toLowerCase());
          this.defaultColTypes[field.toLowerCase()] = "numeric";
        }
      }
    }
    
    for (const column of this.props.columns) {
      if (!defaultCols.has(column) && this.additionalColumns.indexOf(column) > -1) {
        this.additionalColumns.push(column);
      }
    }

    if (this.additionalColumns.length !== 0) {
      howToGoThrough.push(["Additional Items"]);
    }

    this.state = {
      formData: this.getDefaultFormData(defaultCols),
      defaultCols: defaultCols,
      date: new Date()
    }
    
  }

  marginstyle={
    marginTop: '1.2em',
    marginBottom: '2em'
  }

  updateColumns(){
    this.additionalColumns = [];
    let newSet = new Set(this.state.defaultCols);
    //let newFormData = {...this.state.formData};
    const columnSet = new Set(this.props.columns);
    for (const column of this.props.columns) {
      const defaultHasColumn = this.state.defaultCols.has(column);
      if (defaultHasColumn === false && this.additionalColumns.indexOf(column) === -1) {
        this.additionalColumns.push(column);
      }
    }
    for (const val of this.state.defaultCols.keys()) {
      if (!columnSet.has(val)) {
        newSet.delete(val);
        //delete newFormData.column;
      }
    }

    if (this.additionalColumns.length !== 0 && howToGoThrough[howToGoThrough.length -1][0] !== "Additional Items") {
      howToGoThrough.push(["Additional Items"]);
    }
    //this.setState({formData : Object.assign(newFormData, this.getDefaultAdditionalData()), defaultCols : newSet});
    this.setState({formData: Object.assign(this.state.formData, this.getDefaultAdditionalData()), defaultCols : newSet})
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
          formData[field] = 'false';
        } else {
          console.log("error in type");
        }
      } else {
        console.log("Col " + field + " has no col type reported!");
      }
    }
    return formData;
  }

  getDefaultFormData(defaultCols) {
    let formData = {};
    for (const field of defaultCols) {
      if(field == 'date'){
        formData[field] = this.formatDate(new Date());
      }
      else if (this.defaultColTypes[field] === "numeric") {
        formData[field] = "0";
      } else if (this.defaultColTypes[field] === "boolean") {
        formData[field] = 'false';
      } else if (this.defaultColTypes[field] === "string") {
        formData[field] = null;
      }
    }
    Object.assign(formData, this.getDefaultAdditionalData());
    return formData;
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
    this.setState({date: dateInput});
    let full = this.state.formData;
    console.log("formData: ", this.state.formData)
    full['date'] = this.formatDate(dateInput)
    this.setState({formData: full})
  };

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
    console.log(formEntry)
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

  async handleSubmit(event) {
    let toSendFormData = {};
    for (const pair of Object.entries(this.state.formData)) {
      const key = pair[0], value = pair[1] === null ? null : pair[1].trim();
      if (this.props.colTypes[key] === "string") {
        if (value === null || value.length === 0) {
          console.log("format in submit of date: ", key)
          alert("Please input an acceptable value for " + convertFieldToLabel(key) + " at least one character in length.");
          return false;
        }
        toSendFormData[key] = value;
      } else if (this.props.colTypes[key] === "numeric") {
        if (!this.validateNumericEntry(value)) {
          alert("Value " + value + " for " + convertFieldToLabel(key) + " is not an acceptable value.");
          return false;
        }
        toSendFormData[key] = (+value) || 0;
      } else if (this.props.colTypes[key] === "boolean") {
        if (value.toLowerCase() !== "true" && value.toLowerCase() !== "false") {
          alert("Value for " + convertFieldToLabel(key) + " must be true or false!");
          return false;
        }
      } else {
        console.log("Unknown column type for", convertFieldToLabel(key));
      }

    }
    
    try {
      let success = await this.props.apiWrapper.addData(toSendFormData);
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
      let firstColumnNames0 = columnNames[titles[0]].columns[0];
      for (let i = 0; i < firstColumnNames0.length; i++) {
        if (!this.state.defaultCols.has(firstColumnNames0[i])) {
          firstColumnNames0.splice(i, 1);
          i--;
        }
      }
      if (titles.length === 1) {
        if (columnNames[titles[0]].columns.length > 1) {
          let firstColumnNames1 = columnNames[titles[0]].columns[1];
          for (let i = 0; i < firstColumnNames1.length; i++) {
            if (!this.state.defaultCols.has(firstColumnNames1[i])) {
              firstColumnNames1.splice(i, 1);
              i--;
            }
          }
          zippedArray = zip(firstColumnNames0, firstColumnNames1);
        } else {
          zippedArray = zip(firstColumnNames0, []);
        }
      } else {
        let secondColumnNames = columnNames[titles[1]].columns[0];
        for (let i = 0; i < secondColumnNames.length; i++) {
          if (!this.state.defaultCols.has(secondColumnNames[i])) {
            secondColumnNames.splice(i, 1);
            i--;
          }
        }
        zippedArray = zip(firstColumnNames0, secondColumnNames);
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
                              <option>true</option>
                              <option>false</option>
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
              <Form.Label>Date (Click to Change)</Form.Label>
              <br></br>
                <DatePicker selected={this.state.date} onChange={(e) => this.handleDateChange(e)} dateFormat={'yyyy/MM/dd'} />
              <br></br>
              <Form.Label>Location</Form.Label>
              <Select multiple={false} create={true} searchable={true} labelField="text" valueField="text" options={locOptions} values={[]}
              onChange={(value) => this.handleLocationChange(value)}
              >
              </Select>
              <Form.Label>Event Name</Form.Label>
              <Form.Control placeholder="Enter Event Name" onChange={this.handleOnChange("event_name")} />
            </Form.Group>
            { this.renderFormAfterFirstPart() }
            <Button onClick={(e) => this.handleSubmit(e)}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withColumns(withLocations(AddEvent));