import React from "react";
import "../styles/index.css";
import { Table } from "react-bootstrap";

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

    createTableHeader() {
        let res = Object.entries(this.Result.rows[1]).map(([key, value]) => {
            return <th>{key}</th>
        });
        return res;
    }

    createRow (index) {
        let res = Object.entries(index).map(([key, value]) => {
            return <td>{value}</td>
        });
        return res;
    }

    createTableBody() {
        let res = this.Result.rows.map((index)=>{
            return (<tr>
                {this.createRow(index)}
            </tr>)
        });
        return res;
    }
      


    render() {
        return (
            <Table responsive>
  <thead>
    <tr>
      {this.createTableHeader()}
    </tr>
  </thead>
  <tbody>
    {this.createTableBody()}
  </tbody>
</Table>
        );
    }
}

export default DataTable;