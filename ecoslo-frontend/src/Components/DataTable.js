import React from "react";
import "../styles/index.css";
import { Table, Container, Row, Col } from "react-bootstrap";

class DataTable extends React.Component {

    constructor(props) {
        super(props);

    }

    marginstyle={
        marginTop: '1.5em',
        marginBottom: '1.2em'
    }
   

    formatColNames(colName) {
        let split = colName.split("_");
        let res = split.join(" ");
        return res
    }

    createTableHeader() {
        if(this.props.data !== undefined && this.props.data.rows !== undefined) {
            let res = Object.entries(this.props.data.rows[0]).map(([key, value]) => {
                return <th>{this.formatColNames(key)}</th>
            });
            return <tr>{res}</tr>;
        }
        else{
            return <div></div>
        }
    }

    createRow (index) {
        let res = Object.entries(index).map(([key, value]) => {
            return <td>{value}</td>
        });
        return res;
    }

    createTableBody() {
        let res = this.props.data.rows.map((index)=>{
            return (<tr>
                {this.createRow(index)}
            </tr>)
        });
        return res;
    }
      


    render() {
        console.log(this.props.data);
        if (this.props.data !== undefined && (this.props.data.rows !== undefined && this.props.data.rows !== [])){

        return (
            <Container style={this.marginstyle}>
                <Row>
                    <Col xxs={2}></Col>
                    <Col md={{ span: 12}}>
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    {this.createTableHeader()}
                </thead>
                <tbody>
                    {this.createTableBody()}
                </tbody>
            </Table>
            </Col>
            <Col xxs={2}></Col>
            </Row>
            </Container>
        );
    }
    else {
        console.log("HERE3")
        return <div></div>
    }
}
}

export default DataTable;