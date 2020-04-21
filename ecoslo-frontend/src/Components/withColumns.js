import React from 'react';

export default function withColumns(ColumnWrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                columns : [],
            };
            this.updateColumns();
        }

        updateColumns = async () => {
            try {
                const {columns}  = await this.props.apiWrapper.getColumns();
                console.log(columns);
                this.setState({columns: columns});
            } catch (error) {
                console.log(error);
                // alert(error);
            }
        }

        render() {
            return <ColumnWrappedComponent columns={this.state.columns} {...this.props} />;
        }
    }
}