import React from 'react';
import { connect } from 'react-redux';
import { fetchNews, updateUpvote, onHideTap } from '../../actions/newsActions.js'

class News extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let page = 0;
        
        if (this.props.page) {
            page = this.props.page
        }
        
        this.props.onLoad(page);
    }

    onUpvoteClick = (e, id) => {
        this.props.onUpvoteClick(e, id);
    }

    hideClick = (id) => {
        this.props.onHideClick(id);
    }

    getDomainName(hostName) {
        if (!hostName) {
            return;
        }
        let domain = hostName.split('//');
        let newsDomain =  domain[1].substring(4, domain[1].indexOf('/'));
        return newsDomain; 
    }

    render() {
       
        const { news } = this.props;
        let nextPage;
        let prevPage;
        if (this.props.page) {
            let page = this.props.page
            nextPage = '/page/' + (Number(this.props.page) + 1);
            prevPage = page == 0 ? '' : page == 1 ? '/' : '/page/' + (page-1);
        } else {
            nextPage = '/page/1';
            prevPage = "/"
        }

        let newsItem = news.news && news.news.hits ?
                
                 news.news.hits.map(item => {
                    if (news.hide && news.hide[item.objectID]) {
                        return;
                    }
                    return (
                        <div className="list-container" key={item.objectID}>
                            <div className="col-short">
                                {item.num_comments !== null ? item.num_comments : 0}
                            </div>
                            <div className="col-short">
                                 {news.upvote ? news.upvote[item.objectID] > 0 ? news.upvote[item.objectID] : 0 : 0}
                            </div>
                            <div className="col-short">                            
                                <a className="arrow-up" onClick={(e)=>{ this.onUpvoteClick(e, item.objectID)}}>
                                </a>
                            </div>
                            <div className="col-long ">
                                <span><b>{item.title !== null ? item.title : item.story_text !== null ? item.story_text : ''  }</b></span> 
                                <span className="text-grey">{item.url !== null ? ' (' + this.getDomainName(item.url) + ')' : ''}</span> 
                                <span> by { item.author} </span>
                                <a onClick={(e)=>{ this.hideClick(item.objectID)}}>[ <b>hide</b> ]</a>
                            </div>
                        </div>
                    )
                }) : <div className="center-text"> Loading the news </div>;
        return(
            <div className="news-preview">
                <div className="header-container">
                    <div className="col-short"><b>Comments</b></div>
                    <div className="col-short"><b>Vote Count</b></div>
                    <div className="col-short"><b>Upvote</b></div>
                    <div className="col-long"><b>News Details</b></div>
                </div>
                    {newsItem}
                <div className="page-preview">
                    <a href={prevPage}>Prev</a> | <a href={nextPage}>Next</a> 
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return { news : state };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (page) => {
            dispatch(fetchNews(page))
        },
        onUpvoteClick: (e, id) => {
            dispatch(updateUpvote(e, id))
        },
        onHideClick: (id) => {
            dispatch(onHideTap(id))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(News); 