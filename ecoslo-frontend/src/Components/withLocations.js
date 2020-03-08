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
            console.log(this.props);
            const {locations}  = await this.props.apiWrapper.getLocations();
            console.log(locations)
            this.setState({
                locations : locations
            });
        }

        render() {
            return <LocationWrappedComponent locations={this.state.locations} {...this.props} />;
        }
    }
}