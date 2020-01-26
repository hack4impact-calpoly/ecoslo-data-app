import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';


const sectionStyle ={
  fontWeight: 'bold',
};
class AddEvent extends React.Component {
 

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
            <Form.Group>
              <Form.Label style={sectionStyle}>Most Likely To Find Items</Form.Label>
            {/* <Form.Group> */}
              <Form.Row>
                <Col>
                  <Form.Label>Cigarette Butts</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Plastic Beverage Bottles</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Food Wrappers</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Glass Beverage Bottles</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Plastic Take Out/Away Containers</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Beverage Cans</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Foam Take Out/Away Containers</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Plastic Grocery Bags</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Plastic Bottle Caps</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Other Plastic Bags</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Metal Bottle Caps</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Paper Bags</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Plastic Lids</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Paper Cups and Plates</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Straws/Stirrers</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Plastic Cups and Plates</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Forks, Knives, Spoons</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Foam Cups and Plates</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
                
              
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Col>
                <Form.Label style = {sectionStyle}>Fishing Gear</Form.Label>
                  {/* <h6 style = {sectionStyle}>Fishing Gear</h6> */}
                </Col>
                <Col xs={1}></Col>
                <Col>
                <Form.Label style = {sectionStyle}>Packaging Materials</Form.Label>
                </Col>
              </Form.Row>
            <Form.Row>
                <Col>
                  <Form.Label>Fishing Buoys, Pots, and Traps</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>6-Pack Holders</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Fishing Net and Pieces</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Other Plastic/Foam Packaging</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Fishing Line</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Other Plastic Bottles</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Rope</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Strapping Bands</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col><Form.Label></Form.Label></Col>
                <Col></Col>
                
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Tobacco Packaging and Wrap</Form.Label>
                </Col>
                <Col>
                  <Form.Control></Form.Control>
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group>
            <Form.Row>
                <Col>
                <Form.Label style = {sectionStyle}>Other Trash</Form.Label>
                  {/* <h6 style = {sectionStyle}>Fishing Gear</h6> */}
                </Col>
                <Col xs={1}></Col>
                <Col>
                <Form.Label style = {sectionStyle}>Personal Hygiene</Form.Label>
                </Col>
              </Form.Row>
            <Form.Row>
                <Col>
                  <Form.Label>Appliances</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Condoms</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Balloons</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Diapers</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Cigar Tips</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Syringes</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Cigarette Lighters</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <Form.Label>Tampons</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col><Form.Label>Construction Materials</Form.Label></Col>
                <Col><Form.Control></Form.Control></Col>
                <Col xs ={1}></Col>
                <Col><Form.Label></Form.Label></Col>
                <Col></Col>
              </Form.Row>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}

export default AddEvent;