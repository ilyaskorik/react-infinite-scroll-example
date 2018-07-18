import * as React from "react"

export interface TdProps {
    value: any
}

const Td: React.SFC<TdProps> = (props) => {
    return (
        <td>
            {props.value}
        </td>
    )
}

export default Td
