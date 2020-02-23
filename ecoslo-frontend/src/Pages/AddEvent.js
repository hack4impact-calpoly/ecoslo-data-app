import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';


const sectionStyle ={
  fontWeight: 'bold',
};

const howToGoThrough = [
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
    this.props.apiWrapper.addData(toSendFormData);
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
    return (
      <div>
        <Container>
          <Form onSubmit={this.handleSubmit}>
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

export default AddEvent;