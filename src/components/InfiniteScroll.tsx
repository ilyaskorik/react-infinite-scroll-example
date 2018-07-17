import * as React from 'react'

const throttle = require('lodash.throttle')

/**
 * Infinite Scroll container
 */

export interface InfiniteScrollProps {

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

export class InfiniteScroll extends React.Component<InfiniteScrollProps, {}> {

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

        let almostBelow = Math.abs(this.sentinel.clientHeight - (this.sentinel.scrollHeight - this.sentinel.scrollTop ))
        if (almostBelow < this.props.threshold) {
            this.props.onLoadMore()
        }
    }

    render() {
        return (
            <div ref={i => this.sentinel = i} style={{height:'200px', overflow:'scroll'}}>
                {this.props.children}
            </div>
        )
    }
}

export default React.createFactory(InfiniteScroll)
