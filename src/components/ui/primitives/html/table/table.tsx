import * as React from "react"

interface TableProps {
}

const Table: React.SFC<TableProps> = props => (
    <table className={'table is-striped is-narrow is-hoverable'}>
        {props.children}
    </table>
)

export default Table
