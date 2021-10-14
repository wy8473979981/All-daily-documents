/**
 * Created by mapbar_front on 2017/6/8.
 */
import { combineReducers } from 'redux';

import { SELECT_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS,  } from '../actions/action';


function selectedsubreddit(state='reactjs',action) {
    switch (action.type){
        case SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state
    }
}

function posts(state = {
    isFetching: false,
    items:[]
},action) {
    switch (action.type){
        case REQUEST_POSTS:
            return {
                ...state,
                isFetching:true,
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                items:action.posts,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

function postsBySubreddit(state = {},action) {
    switch (action.type){
        case REQUEST_POSTS:
        case RECEIVE_POSTS:
            return Object.assign({},state,{
                [action.subreddit]:posts(state[action.subreddit],action)
            });
        default:
            return state;
    }
}







const rootReducer = combineReducers({
    selectedsubreddit,
    postsBySubreddit
})

export default rootReducer;
