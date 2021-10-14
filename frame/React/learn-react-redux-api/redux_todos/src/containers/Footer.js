/**
 * Created by mapbar_front on 2017/6/6.
 */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import FooterComponent from '../components/FooterComponent';
export default connect((state)=> {
    return {
        state,
    }
})(FooterComponent);