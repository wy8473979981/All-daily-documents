/**
 * Created by mapbar_front on 2017/6/7.
 */
import React, { Component } from 'react';
import { filter } from '../action/action';
export default class HeaderComponent extends Component{
    render(){
        return(
            this.props.filters == this.props.filter?<span>{this.props.name}</span>:<a onClick={()=>this.props.dispatch(filter(this.props.filters))} href="#">{this.props.name}</a>
        )
    }
}