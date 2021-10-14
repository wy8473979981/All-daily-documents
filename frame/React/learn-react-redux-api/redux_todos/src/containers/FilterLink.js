/**
 * Created by mapbar_front on 2017/6/7.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FilterLinkComponent from '../components/FilterLinkComponent';
export default connect((state)=>{
    return {
        state,
    }
})(FilterLinkComponent);