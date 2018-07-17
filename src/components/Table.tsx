import * as React from "react"
import {TableRow} from "./TableRow"

/**
 * HTML TABLE tag component
 */

export interface TableProps {
    values: any[]
}

export class Table extends React.Component<TableProps, {}> {
    render() {
        return <table>
            <tbody>
            <TableRow values={this.props.values}/>
            </tbody>
        </table>
    }
}
