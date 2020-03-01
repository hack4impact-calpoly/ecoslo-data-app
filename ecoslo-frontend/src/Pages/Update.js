import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: ['Weight - Trash', 'Weight - Recycle', 
      '# of Trash Bags', 'Distance Covered', '# of Volunteers - Adult', 
      '# of Volunteers - Child','Unusual Items'],
      
      selected: {
        weightTrash: false,
        weightRecycle: false,
        numTrashBags: false,
        distanceCovered: false,
        volunteersAdult: false,
        volunteersChild: false,
        unusualItems: false
      }
    };

  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    let stateCopy = Object.assign({}, this.state); 
    stateCopy.selected[name] = value; 

    this.setState(stateCopy); 

    //this.setState({
    //  [name] : value
    //});
  }

  renderForm = () => {
    let data = this.state.columns; 

    let formUI = data.map((col) => {
      if (col == 'Weight - Trash') {
        return (
          <div key={col}><label>
            <input type="checkbox" 
            name="weightTrash"
            checked={this.state.weightTrash}
            onChange={this.handleInputChange}/> Weight - Trash
            </label>    
          </div>
        )
      }

      if (col == 'Weight - Recycle') {
        return (
          <div key={col}><label>
            <input type="checkbox" 
            name="weightRecycle"
            checked={this.state.weightRecycle}
            onChange={this.handleInputChange}/> Weight - Recycle
            </label>    
          </div>
        )
      }
      
      if (col == '# of Trash Bags') {
        return (
          <div key={col}><label>
            <input type="checkbox" 
            name="numTrashBags"
            checked={this.state.numTrashBags}
            onChange={this.handleInputChange}/> # of Trash Bags
            </label>    
          </div>
        )
      }

      if (col == 'Distance Covered') {
        return (
          <div key={col}><label>
            <input type="checkbox" 
            name="distanceCovered"
            checked={this.state.distanceCovered}
            onChange={this.handleInputChange}/> Distance Covered
            </label>    
          </div>
        )
      }

      if (col == '# of Volunteers - Adult') {
        return (
          <div key={col}><label>
            <input type="checkbox" 
            name="volunteersAdult"
            checked={this.state.volunteersAdult}
            onChange={this.handleInputChange}/> # of Volunteers - Adult
            </label>    
          </div>
        )
      }

      if (col == '# of Volunteers - Child') {
        return (
          <div key={col}><label>
            <input type="checkbox" 
            name="volunteersChild"
            checked={this.state.volunteersChild}
            onChange={this.handleInputChange}/> # of Volunteers - Child
            </label>    
          </div>
        )
      }

      if (col == 'Unusual Items') {
        return (
          <div key={col}><label>
            <input type="checkbox" 
            name="unusualItems"
            checked={this.state.unusualItems}
            onChange={this.handleInputChange}/> Unusual Items
            </label>    
          </div>
        )
      }

    })

    return formUI;
  }

  renderColumns = () => {
    //let data = this.state.selected; 

    let selectedUI = () => {
      let columns = Object.keys(this.state.selected); 
      for (let col of columns) {
        console.log(this.state.selected[col]);
        if (this.state.selected[col]) {
          return (
            <div key={col}>
              <Form.Label>col</Form.Label>
              <Form.Control></Form.Control>
            </div>
          )
        } 
      }
    }
    console.log(this.state.selected); 
    return selectedUI;
  }

  render() {
    return (
      <div>
        <Container>
        <Form>
          <div>
            {this.renderForm()}
            {this.renderColumns()}
          </div>
        {}
        </Form>
        </Container>
      </div>
    );
  }
}

export default Update;