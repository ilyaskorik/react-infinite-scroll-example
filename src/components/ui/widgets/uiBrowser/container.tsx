import * as React from 'react'
import Presentation from './presentation'
import Paginator from "../../complex/paginator";

/**
 * Infinite Scroll realisation with loader
 */

export interface InfiniteScrollExampleState {
    fetchId: string,
    items: any[],
    meta: any[],
    columns: any[],
    error: undefined,
    isLoading: boolean,
    limit: number,
    total: number,
    current: number,
    offset: number
}

export class Container extends React.Component<{}, InfiniteScrollExampleState> {

    state = {
        fetchId: 'ic3t-wcy2.json',
        meta: [] as any[],
        columns: [] as any[],
        items: [] as any[],
        error: undefined as any,
        isLoading: true,
        limit: 100,
        total: 0,
        current: 0,
        offset: 0
    }

    componentDidMount() {
        this.loadMeta()
        this.loadCount()
        this.loadMore()
    }

    loadCount = () => {
        fetch(`https://data.cityofnewyork.us/api/id/${this.state.fetchId}?$select=count(*) as __count_alias__`)
            .then(res => res.json())
            .then(res => {
                    this.setState({
                        total: res[0]['__count_alias__'],
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

    loadMeta = () => {
        fetch(`https://data.cityofnewyork.us/api/views/${this.state.fetchId}`)
            .then(res => res.json())
            .then(res => {

                    this.setState({
                        meta: res,
                        columns: [ ...res.columns]
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

    loadMore = () => {

        let fetchSelect = "$select=`job__`,`doc__`,`borough`,`house__`,`street_name`,`block`,`lot`,`bin__`,`job_type`,`job_status`,`job_status_descrp`,`latest_action_date`,`building_type`,`community___board`,`cluster`,`landmarked`,`adult_estab`,`loft_board`,`city_owned`,`little_e`,`pc_filed`,`efiling_filed`,`plumbing`,`mechanical`,`boiler`,`fuel_burning`,`fuel_storage`,`standpipe`,`sprinkler`,`fire_alarm`,`equipment`,`fire_suppression`,`curb_cut`,`other`,`other_description`,`applicant_s_first_name`,`applicant_s_last_name`,`applicant_professional_title`,`applicant_license__`,`professional_cert`,`pre__filing_date`,`paid`,`fully_paid`,`assigned`,`approved`,`fully_permitted`,`initial_cost`,`total_est__fee`,`fee_status`,`existing_zoning_sqft`,`proposed_zoning_sqft`,`horizontal_enlrgmt`,`vertical_enlrgmt`,`enlargement_sq_footage`,`street_frontage`,`existingno_of_stories`,`proposed_no_of_stories`,`existing_height`,`proposed_height`,`existing_dwelling_units`,`proposed_dwelling_units`,`existing_occupancy`,`proposed_occupancy`,`site_fill`&$order=`borough`+ASC"

        this.setState({
            isLoading: true,
            error: undefined
        })

        fetch(`https://data.cityofnewyork.us/api/id/${this.state.fetchId}?${fetchSelect}&$limit=${this.state.limit}&$offset=${this.state.offset}`)
            .then(res => res.json())
            .then(res => {
                    this.setState({
                        items: [...res],
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

    togglePrevious = (event: any): void => {

        let offset = this.state.offset - this.state.limit;

        this.setState({
            offset: offset < 0 ? 0 : offset,
        })
        this.loadMore()
    }

    toggleNext = (event: any): void => {

        let offset = this.state.offset + this.state.limit;

        this.setState({
            offset: offset > this.state.total ? this.state.offset : offset
        })

        this.loadMore()
    }

    render() {
        return (
            <div>

                <Presentation throttle={100} threshold={300}
                              columns={this.state.columns}
                              items={this.state.items}
                              isLoading={this.state.isLoading}
                              onLoadMore={this.loadMore}/>

                <Paginator total={this.state.total}
                           limit={this.state.limit}
                           offset={this.state.offset}
                           current={this.state.current}
                           togglePrevious={this.togglePrevious}
                           toggleNext={this.toggleNext}
                />

            </div>
        )
    }
}
