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
                const columns  = await this.props.apiWrapper.getColumns();
                console.log(columns);

                
                let cols = columns.r.fields.map((content, index) =>{
                    return content.name
                  })


                //this.setState({cols: })
                this.setState({columns: cols});
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