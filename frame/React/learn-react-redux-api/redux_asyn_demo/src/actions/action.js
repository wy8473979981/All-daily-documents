/**
 * Created by mapbar_front on 2017/6/8.
 */

import fetch from "isomorphic-fetch";
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";

export function seletedSubreddit(subreddit){
    return {
        type:SELECT_SUBREDDIT,
        subreddit
    }
}

export const REQUEST_POSTS = "REQUEST_POSTS";

export function requestPosts(subreddit) {
    return {
        type:REQUEST_POSTS,
        subreddit
    }
}

export const RECEIVE_POSTS = "RECEIVE_POSTS";

export function receivePosts(subreddit,json) {
    return {
        type:RECEIVE_POSTS,
        subreddit,
        posts:json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function fetchPosts(subreddit) {
    return dispatch => {
        dispatch(requestPosts(subreddit))
        fetch(`https://www.reddit.com/r/${subreddit}.json`).then(response => {
            return response.json()
        }).then(json => dispatch(receivePosts(subreddit,json)))
    }
}

// export function fetchPostsIfNeeded(subreddit,dispatch) {
//     return (dispatch) => {
//         alert(1);
//         return dispatch(fetchPosts(subreddit));
//     }
// }