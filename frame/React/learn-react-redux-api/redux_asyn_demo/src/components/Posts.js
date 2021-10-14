/**
 * Created by mapbar_front on 2017/6/8.
 */
import React, { Component } from 'react';
export default class Posts extends Component{
    render(){
        console.log('zai post zhong ',this.props.posts);
        return (
            <ul>
                {
                    this.props.posts.map((item,index)=>{
                        return <li key={index}>{item.title}</li>
                    })
                }
            </ul>
        )
    }
}