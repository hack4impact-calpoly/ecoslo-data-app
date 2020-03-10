import React from "react";
import "../styles/index.css";
import { Table, Container, Row, Col } from "react-bootstrap";

class DataTable extends React.Component {

    constructor(props) {
        super(props);

    }

   

Result = {
        command: 'SELECT',
        rowCount: 2,
        oid: null,
        rows: [
          {
            date: '2020-01-01T08:00:00.000Z',
            location: 'Avila',
            plastic_take_out_containers: 7,
            foam_take_out_containers: 8
          },
          {
            date: '2020-01-01T08:00:00.000Z',
            location: 'Avila2',
            plastic_take_out_containers: 4,
            foam_take_out_containers: 4
          },
          {
            date: '2020-01-01T08:00:00.000Z',
            location: 'Avila2',
            plastic_take_out_containers: 4,
            foam_take_out_containers: 4
          }
        ]
      }

    formatColNames(colName) {
        let split = colName.split("_");
        let res = split.join(" ");
        return res
    }

    createTableHeader() {
        if(this.props.data != undefined && this.props.data.rows != undefined) {
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
        if (this.props.data != undefined && this.props.data.rows != undefined){

        return (
            <Container>
                <Row>
                    <Col xxs></Col>
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
            <Col xxs></Col>
            </Row>
            </Container>
        );
    }
    else {
        return <div></div>
    }
}
}

export default DataTable;