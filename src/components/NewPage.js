import React from 'react';
import News from './news/news.component';
import Chart from './lineChart/linechart.component';

class NewsPage extends React.Component {
    constructor(props){
        super(props);
    }

   render() {
       return (
           <div> 
                <News page={this.props.match.params.page}/>
                <Chart />
           </div>
       );
    }
}


export default NewsPage; 