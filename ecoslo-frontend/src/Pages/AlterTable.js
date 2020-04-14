import React from "react"; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap"; 
import "../styles/page.css";

class AlterTable extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            formData : {
                addColumn: false,
                addName: null,
                addType: null, 
                deleteColumn: false, 
                deleteName: null
            }
        };
    }

    marginstyle={
        marginTop: '1.2em',
        marginBottom: '2em'
    }

    async componentDidMount(){
        let res = await this.props.apiWrapper.getColumns();
        let options = res.r.fields.map((content, index) =>{
          return <option>{content.name}</option>
        })
        this.setState({colNames: options})
    }

    validateEntry(formEntry) {}

    handleOnChange() {}

    handleSubmit() {}

    render() {
        return (
            <div style={this.marginstyle}>
            <Container>
            <Form>
                <div>
                <div><h4>Add a Column</h4></div>
                <div><strong>Note:</strong> Only add a column if it's absolutely necessary (not just an unusual item). The name of the new column must only include letters and spaces; no numbers or special characters.</div>
                <Form.Group controlId="formBasicEmail">
                    <Row></Row>
                    <Row>
                        <Col>
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter Column Name" /> {/*onChange={this.handleOnChange("dateStart")}*/}
                        </Col>
                        <Col>
                        <Form.Label>Type of Data</Form.Label>
                        <Form.Control as="select"> {/*onChange={(e) => this.handleLocationChange(e)} >*/}
                            <option>Numeric</option>
                            <option>Text</option>
                            <option>True/False</option>
                        </Form.Control>
                        </Col>
                    </Row>
                    <Button type="submit">Submit</Button>
                </Form.Group>
                <div><h4>Delete a Column</h4></div>
                <div><strong>Note:</strong> Only delete a column if you are certain it is no longer needed.</div>
                <Form.Group controlId="formBasicEmail">
                    <Row>
                        <Col>
                        <Form.Label>Name</Form.Label>
                        <Form.Control as="select"> {/*onChange={this.handleOnChange("dateStart")}*/}
                        <option>Choose...</option>
                        {this.state.colNames}
                        </Form.Control>
                        </Col>
                    </Row>
                    <Button type="submit">Submit</Button>
                </Form.Group>
            {/*onClick={(e) => this.handleSubmit(e)}>Submit</Button>*/}
          </div>
        </Form>
        </Container>
      </div>
    );
    }
}

export default AlterTable; 