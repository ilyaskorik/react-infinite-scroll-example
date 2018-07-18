import * as React from "react"

interface PaginatorProps {
    total: number,
    limit: number,
    offset: number,
    current: number,
    toggleNext: any,
    togglePrevious: any
}

class Paginator extends React.Component<PaginatorProps, {}> {

    public static defaultProps: Pick<PaginatorProps, 'total' | 'limit' | 'current' | 'offset'> = {
        total: 0,
        limit: 0,
        offset: 0,
        current: 0,
    }

    render() {
        return (
            <div className="columns">
                <div className="column">
                    <button className={'button'} onClick={e => this.props.togglePrevious(e)}>
                        Previous
                    </button>
                    &nbsp;
                    <button className={'button'} onClick={e => this.props.toggleNext(e)}>
                        Next
                    </button>
                </div>
                <div className="column">
                    Showing Rows {this.props.offset + this.props.limit - (this.props.limit-1)}-{this.props.offset + this.props.limit} out of {this.props.total}
                </div>
            </div>
        )
    }

}

export default Paginator
