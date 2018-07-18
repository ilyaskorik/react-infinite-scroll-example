import * as React from "react"

interface TableProps {
    values: any[]
}

const TableHeader: React.SFC<TableProps> = props => (
    <thead>
    <tr>
        {props.values && props.values.length ? props.values.map((column, index) => (
            <th key={`th_${column.id}`}>
                {column.name}
            </th>
        )) : null}
    </tr>
    </thead>
)

export default TableHeader
