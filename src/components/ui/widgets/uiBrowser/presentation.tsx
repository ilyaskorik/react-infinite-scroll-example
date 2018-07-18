import * as React from 'react'
import Table from "../../primitives/html/table/table"
import TableHeader from "../../primitives/html/table/thead";
import TableBody from "../../primitives/html/table/tbody";
import Paginator from "../../complex/paginator";

const throttle = require('lodash.throttle')

/**
 * Infinite Scroll container
 */

export interface InfiniteScrollProps {

    /**
     * Table columns
     */
    columns: any[]

    /**
     * Table columns
     */
    items: any[]

    /**
     * Should show loading
     */
    isLoading: boolean

    /**
     * Callback to load more entities
     */
    onLoadMore: () => void

    /**
     * Scroll threshold
     */
    threshold: number

    /**
     * Throttle rate
     */
    throttle: number

    /**
     * Children
     */
    children?: any
}

export class Presentation extends React.Component<InfiniteScrollProps, {}> {

    public static defaultProps: Pick<InfiniteScrollProps, 'threshold' | 'throttle'> = {
        threshold: 100,
        throttle: 64,
    }

    private sentinel: HTMLDivElement
    private scrollHandler: EventListenerObject
    private resizeHandler: EventListenerObject

    componentDidMount() {

        this.scrollHandler = throttle(this.checkWindowScroll, this.props.throttle)
        this.resizeHandler = throttle(this.checkWindowScroll, this.props.throttle)

        this.sentinel.addEventListener('scroll', this.scrollHandler)
        this.sentinel.addEventListener('resize', this.resizeHandler)
    }

    componentWillUnmount() {
        this.sentinel.removeEventListener('scroll', this.scrollHandler)
        this.sentinel.removeEventListener('resize', this.resizeHandler)
    }

    checkWindowScroll = () => {

        if (this.props.isLoading) {
            return
        }

        let almostBelow = Math.abs(this.sentinel.clientHeight - (this.sentinel.scrollHeight - this.sentinel.scrollTop))
        if (almostBelow < this.props.threshold) {
            // this.props.onLoadMore()
        }
    }

    getColumns = (): any[] => {
        return this.props.columns;
    }

    getRows = (): any[] => {

        let rows: any[] = []

        this.props.items.map((item, index) => {

            let row: any[] = []

            this.props.columns.forEach((column) => {
                row.push(item[column.fieldName])
            })

            rows.push(row)
        })

        return rows;
    }

    render() {
        return (
            <div ref={i => this.sentinel = i} style={{height: '800px', overflow: 'auto'}}>
                <Table>
                    <TableHeader values={this.getColumns()}/>
                    <TableBody values={this.getRows()}/>
                </Table>
            </div>

        )
    }
}

export default React.createFactory(Presentation)
