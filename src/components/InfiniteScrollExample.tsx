import * as React from 'react'
import {InfiniteScroll} from './InfiniteScroll'
import {Table} from "./Table"

/**
 * Infinite Scroll realisation with loader
 */

export interface InfiniteScrollExampleState {
    fetchUrl: string,
    items: any[],
    error: undefined,
    isLoading: boolean,
    limit: number,
    offset: number
}

export class InfiniteScrollExample extends React.Component<{}, InfiniteScrollExampleState> {

    state = {
        fetchUrl: 'https://data.cityofnewyork.us/api/id/ic3t-wcy2.json?$select=`job__`,`doc__`,`borough`,`house__`,`street_name`,`block`,`lot`,`bin__`,`job_type`,`job_status`,`job_status_descrp`,`latest_action_date`,`building_type`,`community___board`,`cluster`,`landmarked`,`adult_estab`,`loft_board`,`city_owned`,`little_e`,`pc_filed`,`efiling_filed`,`plumbing`,`mechanical`,`boiler`,`fuel_burning`,`fuel_storage`,`standpipe`,`sprinkler`,`fire_alarm`,`equipment`,`fire_suppression`,`curb_cut`,`other`,`other_description`,`applicant_s_first_name`,`applicant_s_last_name`,`applicant_professional_title`,`applicant_license__`,`professional_cert`,`pre__filing_date`,`paid`,`fully_paid`,`assigned`,`approved`,`fully_permitted`,`initial_cost`,`total_est__fee`,`fee_status`,`existing_zoning_sqft`,`proposed_zoning_sqft`,`horizontal_enlrgmt`,`vertical_enlrgmt`,`enlargement_sq_footage`,`street_frontage`,`existingno_of_stories`,`proposed_no_of_stories`,`existing_height`,`proposed_height`,`existing_dwelling_units`,`proposed_dwelling_units`,`existing_occupancy`,`proposed_occupancy`,`site_fill`&$order=`borough`+ASC',
        items: [] as any[],
        error: undefined as any,
        isLoading: true,
        limit: 100,
        offset: -100
    }

    componentDidMount() {
        this.loadMore()
    }

    loadMore = () => {

        let offset = this.state.offset + this.state.limit

        this.setState({
            offset: offset,
            isLoading: true,
            error: undefined
        })

        fetch(`${this.state.fetchUrl}&$limit=${this.state.limit}&$offset=${offset}`)
            .then(res => res.json())
            .then(res => {
                    this.setState({
                        items: [...this.state.items, ...res],
                        isLoading: false
                    })
                },
                error => {
                    this.setState({
                        isLoading: false,
                        error: error
                    })
                }
            )
    }

    render() {
        return (
            <InfiniteScroll throttle={100} threshold={300} isLoading={this.state.isLoading} onLoadMore={this.loadMore}>
                <Table values={this.state.items}/>
            </InfiniteScroll>
        )
    }
}
