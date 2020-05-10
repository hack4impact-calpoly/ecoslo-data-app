import React from 'react';

export default function withColumns(ColumnWrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                columns : [],
                colTypes : {},
            };
            this.updateColumns();
        }

        updateColumns = async () => {
            try {
                const columns = await this.props.apiWrapper.getColumns();
                console.log(columns);
                
                let colTypes = {};
                
                let cols = columns.r.fields.map((content, index) => {
                    console.log(content);
                    colTypes[content.name] = content.format;
                    return content.name;
                });
                console.log(colTypes);
                this.setState({columns: cols, colTypes: colTypes});
            } catch (error) {
                const cols = [];
                const colTypes = {};
                console.log("withColumns error:", error);
                // alert(error);
                this.setState({columns: cols, colTypes: colTypes});
            }
        }

        render() {
            return <ColumnWrappedComponent {...this.state} {...this.props} />;
        }
    }
}