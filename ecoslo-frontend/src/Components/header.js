import Navbar from 'react-bootstrap/Navbar'
import "../styles/home.css";
import "../styles/index.css";

class Header extends React.Component {
    render(){
        return(
            <body>
            <Navbar bg="dark" variant="dark" className="center-strip">
            <img
              src="../images/ECOSLO_logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <Navbar.Brand href="#home">EcoSlo Beach Cleanup</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#add">Add</Nav.Link>
              <Nav.Link href="#update">Update</Nav.Link>
              <Nav.Link href="#view">View</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
          </Navbar>
          </body>
        )

    }
}
