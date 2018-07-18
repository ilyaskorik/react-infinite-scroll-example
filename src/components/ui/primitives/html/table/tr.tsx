import * as React from "react"
import Td from "./td"

export interface TrProps {
    value: any[]
}

const Tr: React.SFC<TrProps> = props => (

    <tr>
        {props.value.map((value, index) => (
            <Td value={value} key={`td_${index}`}/>
        ))}
    </tr>

)

export default Tr
