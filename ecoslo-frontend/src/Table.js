import React from "react";
import Table from "react-bootstrap/Table";

class Table extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            cleanups: [
                { location: 'Elephant Seal Viewing Point', 
                start_date: 2018, 
                end_date: 2018, 
                weight_trash: 8, 
                weight_recycle: 0,
                distance_covered: 1.5, 
                total_volunteers: 4}
            ]
        }
    }

    renderTableData() {
        return this.state.cleanups.map((cleanup, index) => {
            const { location, start_date, end_date, weight_trash, weight_recycle,
            distance_covered, total_volunteers} = cleanup
            return (
                <tr key={location}>
                    <td>{location}</td>
                    <td>{weight_trash}</td>
                    <td>{weight_recycle}</td>
                    <td>{distance_covered}</td>
                    <td>{total_volunteers}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h1 id='title'>Beach Cleanup Data</h1> 
                <table id='cleanups'>
                    <tbody>
                        {this.renderTableData()}    
                    </tbody> 
                </table>    
            </div>
        )
    }
}

export default Table