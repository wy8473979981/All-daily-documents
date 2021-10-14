/**
 * Created by mapbar_front on 2017/6/6.
 */
import React, { Component } from "react";
import Header from '../containers/Header';
import Content from '../containers/Content';
import Footer from '../containers/Footer';
export default class Main extends Component{
    render() {
        return (
            <div>
                <Header></Header>
                <Content></Content>
                <Footer></Footer>
            </div>
        )
    }
}
