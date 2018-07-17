import * as React from "react"

/**
 * HTML TD tag component
 */

export interface TableCellProps {
    value: any
}

export class TableCell extends React.Component<TableCellProps, {}> {
    render() {
        return (
            <td>
                {this.props.value}
            </td>
        )
    }
}
