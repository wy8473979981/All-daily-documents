/**
 * Created by mapbar_front on 2017/6/6.
 */
import React, { Component } from 'react';
import FilterLink from '../containers/FilterLink';
export default class HeaderComponent extends Component{
    render(){
        return(
            <div>
                filter:{" "}<FilterLink filter={this.props.state.visibilityFilter} name="All" filters="SHOW_ALL" />{", "}
                <FilterLink filter={this.props.state.visibilityFilter} name="Active" filters="SHOW_ACTIVE" />{", "}
                <FilterLink filter={this.props.state.visibilityFilter} name="Completed" filters="SHOW_COMPLETED" />
            </div>
        )
    }
}