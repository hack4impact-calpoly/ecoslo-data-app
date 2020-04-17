import React from 'react';

export default function withLocations(LocationWrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                locations : [],
            };
            this.updateLocations();
        }

        updateLocations = async () => {
            try {
                const {locations}  = await this.props.apiWrapper.getLocations();
                console.log(locations);
                this.setState({locations:  locations});
            } catch (error) {
                console.log(error);
                alert(error);
            }
        }

        render() {
            return <LocationWrappedComponent locations={this.state.locations} {...this.props} />;
        }
    }
}