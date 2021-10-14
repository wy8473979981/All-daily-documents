/**
 * Created by mapbar_front on 2017/6/6.
 */
import React, { Component } from 'react';
import { addTodo } from '../action/action';
export default class HeaderComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            message:""
        }
    }
    render(){
        return(
            <div>
                <input onChange={(e) => {
                    this.setState({
                        message: e.target.value.trim()
                    })
                }} onFocus={()=>{
                    this.refs.input.value = "";
                }} ref="input" type="text" />
                <button onClick={()=>this.props.dispatch(addTodo(this.state.message))}>add todo</button>
            </div>
        )
    }
}