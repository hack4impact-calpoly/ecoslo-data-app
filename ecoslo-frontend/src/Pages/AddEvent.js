import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import withLocations from '../Components/withLocations';
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
    "Tiny Trash",
    "Additional Items"
  ]
];

const columnNames = {
  "Most Likely To Find Items" : {
    "columns" : [[
        "Cigarette_Butts",
        "Food_Wrappers",
        "Plastic_Take_Out_Containers",
        "Foam_Take_Out_Containers",
        "Plastic_Bottle_Caps",
        "Metal_Bottle_Caps",
        "Plastic_Lids",
        "Straws_And_Stirrers",
        "Forks_Knives_And_Spoons",
      ],[
        "Plastic_Beverage_Bottles",
        "Glass_Beverage_Bottles",
        "Beverage_Cans",
        "Plastic_Grocery_Bags",
        "Other_Plastic_Bags",
        "Paper_Bags",
        "Paper_Cups_And_Plates",
        "Plastic_Cups_And_Plates",
        "Foam_Cups_And_Plates"
      ]
    ],
  },
  "Fishing Gear" : {
    "columns" : [[
      "Fishing_Buoys_Pots_And_Traps",
      "Fishing_Net_And_Pieces",
      "Fishing_Line",
      "Rope",
    ]]
  },
  "Packaging Materials" : {
    "columns" : [[
      "Six_Pack_Holders",
      "Other_Plastic_Or_Foam_Packaging",
      "Other_Plastic_Bottles",
      "Strapping_Bands",
      "Tobacco_Packaging_Or_Wrap",
    ]]
  },
  "Personal Hygiene" : {
    "columns" : [[
      "Condoms",
      "Diapers",
      "Syringes",
      "Tampons",
    ]]
  },
  "Other Trash": {
    "columns" : [[
      "Appliances",
      "Balloons",
      "Cigar_Tips",
      "Cigarette_Lighters",
      "Construction_Materials",
      "Fireworks",
      "Tires",
    ]]
  },
  "Tiny Trash" : {
    "columns" : [[
      "Foam_Pieces",
      "Glass_Pieces",
      "Plastic_Pieces",
    ]]
  },
  "Summary" : {
    "columns" : [[
      "Adult Volunteers",
      "Child Volunteers",
      "Distance Covered",
      "Total Items"
    ], [
      "Trash Bags Filled",
      "Weight Trash",
      "Weight Recycle"
    ]]
  },
  "Additional Items" : {
    "columns" : [[
      "Unusual Items",
      "Dead Animals"
    ]]
  }
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

const convertFieldToLabel = (field) => {
  return field.replace(/_/g, " ");
};

class AddEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formData : this.getDefaultFormData(),
    }
  }

  marginstyle={
    marginTop: '1.2em',
    marginBottom: '2em'
  }

  getDefaultFormData() {
    let formData = {};
    for (const key in columnNames) {
      for (const column of columnNames[key].columns) {
        for (const field of column) {
          formData[field] = "0";
        }
      }
    }

    formData["location"] = null;
    formData["date"] = null;

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
    let success = this.props.apiWrapper.addData(toSendFormData);
    if (success) {
      alert("Cleanup successfully added to database.")
    }
    else {
      alert("An error occurred. Cleanup not added to the database.")
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

export default withLocations(AddEvent);