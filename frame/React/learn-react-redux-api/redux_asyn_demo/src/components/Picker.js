/**
 * Created by mapbar_front on 2017/6/8.
 */
import React, { Component } from 'react';
export default class Picker extends Component{
    render(){
        return (
            <div>
                <h1>{this.props.value}</h1>
                <select value={this.props.value} onChange={(e)=>this.props.onChange(e.target.value)}>
                    {
                        this.props.options.map((item,index) => {
                            return <option value={item} key={index}>{item}</option>
                        })
                    }
                </select>
            </div>
        )
    }
}