import * as React from "react"
import {TableCell} from "./TableCell"

/**
 * HTML TR tag component
 */

export interface TableRowProps {
    values: any[]
}

export class TableRow extends React.Component<TableRowProps, {}> {
    render() {
        return this.props.values.length ? this.props.values.map((value, index) => {
            return (
                <tr key={`${index}_tr`}>
                    <TableCell value={value.street_name} key={`${index}_1`}/> <TableCell value={value.applicant_s_last_name} key={`${index}_2`}/>
                </tr>
            )
        }) : null
    }
}
