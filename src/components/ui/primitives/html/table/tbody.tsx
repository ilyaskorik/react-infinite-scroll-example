import * as React from "react"
import Tr from "./tr";

interface TableProps {
    values: any[]
}

const TableBody: React.SFC<TableProps> = props => (
    <tbody>
        {props.values && props.values.length ? props.values.map((column, index) => (
            <Tr value={column} key={`tr_${index}`}/>
        )) : null}
    </tbody>
)

export default TableBody
