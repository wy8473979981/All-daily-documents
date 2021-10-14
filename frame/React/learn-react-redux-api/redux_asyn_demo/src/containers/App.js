/**
 * Created by mapbar_front on 2017/6/8.
 */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchPosts,seletedSubreddit } from '../actions/action';

import Picker from '../components/Picker';
import Posts from '../components/Posts';
class App extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        //alert(this.props.state.selectedsubreddit);
        this.props.dispatch(fetchPosts(this.props.state.selectedsubreddit));
    }
    componentWillReceiveProps(nextProps){
        console.log('nextprops',nextProps.state.selectedsubreddit);
        //this.props.dispatch(fetchPosts(nextProps.state.selectedsubreddit));
        if(nextProps.state.selectedsubreddit !== this.props.state.selectedsubreddit){
            this.props.dispatch(fetchPosts(nextProps.state.selectedsubreddit));
        }
    }
    handleChange(nextReddit){
        this.props.dispatch(seletedSubreddit(nextReddit))
    }
    render(){
        //const lastUpdated = this.props.state.postsBySubreddit
        const { selectedsubreddit, postsBySubreddit } = this.props.state;
        const {
            isFetching,
            lastUpdated,
            items:posts
        } = postsBySubreddit[selectedsubreddit] || {
            isFetching: true,
            items: []
        }
        return(
            <div>
                <Picker value={selectedsubreddit} options={['reactjs','frontend']} onChange={this.handleChange} />
                <p>
                    {lastUpdated && <span>
                        Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                    </span>}
                    {!isFetching && <button>refresh</button>}
                </p>
                {isFetching?<h2>Loading...</h2>:<div><Posts posts={posts} /></div>}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state);

    return{
        state
    }
}
export default connect(mapStateToProps)(App);