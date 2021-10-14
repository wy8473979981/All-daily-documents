/**
 * Created by mapbar_front on 2017/6/6.
 */
import React, { Component } from 'react';
import { toggle_todo } from "../action/action";
export default class ContentComponent extends Component{
    render(){
        console.log(this.props);
        return(
            <div>
                <ul>
                    {this.props.array.map((item,index)=>{
                        return (<li style={{color: item.completed?"red":"blue"}} onClick={() => this.props.dispatch(toggle_todo(index))} key={index}>{item.text}</li>)
                    })}
                </ul>
            </div>
        )
    }
}