/**
 * Created by mapbar_front on 2017/6/6.
 */
import { connect } from 'react-redux';

import ContentComponent from '../components/ContentComponent';
function filterArray(array,filter) {
    switch (filter){
        case "SHOW_ALL":
            return array;
        case "SHOW_ACTIVE":
            return array.filter((item,index)=>item.completed == false);
        case "SHOW_COMPLETED":
            return array.filter((item,index)=>item.completed == true);
        default:
            return array;
    }
}
export default connect((state)=> {
    console.log(state);
    return {
        array:filterArray(state.todos,state.visibilityFilter),
        state,
    }
})(ContentComponent);