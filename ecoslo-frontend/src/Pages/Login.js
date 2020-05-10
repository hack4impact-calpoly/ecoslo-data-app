import React from "react";
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdbreact';
import "../styles/index.css";
import "../styles/login.css";
import { userLoginInfo } from "../redux/actions/actions";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
        }
    }

    updateUsername = (evt) => {
        this.setState({
            email: evt.target.value,
        });
    }

    updatePassword = (evt) => {
        this.setState({
            password: evt.target.value,
        });
    }

    attemptSignIn() {
        this.props.loginStore({
            email: this.state.email,
            password: this.state.password
        });
        // let apiReturnValue = this.props.apiWrapper.login(this.state.email, this.state.password);
    }

    render() {
        return (
            <React.Fragment>
                <div className="top-div-login" />
                <div className="center-component">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="6">
                                <MDBCard>
                                    <MDBCardBody className="mx-4">
                                        <div className="text-center">
                                            <h3 className="dark-grey-text mb-5">
                                                <strong>EcoSLO Database Sign In</strong>
                                            </h3>
                                        </div>
                                        <MDBInput
                                            label="Your username"
                                            group
                                            type="email"
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={evt => this.updateUsername(evt)}
                                        />
                                        <MDBInput
                                            label="Your password"
                                            group
                                            type="password"
                                            validate
                                            containerClass="mb-0"
                                            onChange={evt => this.updatePassword(evt)}
                                        />
                                        {/* <p className="font-small blue-text d-flex justify-content-end pb-3">
                                            Forgot
                                            <a href="#!" className="blue-text ml-1">
                                                Password?
                                            </a>
                                        </p> */}
                                        <div className="text-center mb-3">
                                            <MDBBtn
                                                type="button"
                                                gradient="blue"
                                                rounded
                                                className="btn-block z-depth-1a"
                                                onClick={() => this.attemptSignIn()}
                                            >
                                                Sign in
                                            </MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginStore: apiResult => dispatch(userLoginInfo(apiResult)),
    };
};


export default connect(
    null,
    mapDispatchToProps,
)(Login);