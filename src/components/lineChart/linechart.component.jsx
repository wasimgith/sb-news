import React, { Component } from 'react';
import HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import '../../index.css';
import { connect } from 'react-redux';



class Chart extends Component {
 
  
  render () {
    const {xAxisData, yAxisData} = this.props;
    const options = {
      title: {
        text: ''
      },
      series : [{
        name: 'ID',
        data: xAxisData
      }],
      yAxis: [{ 
        // title: {
        //     text: 'Votes'
        // },
        series : [{
          name: 'Votes',
          data: yAxisData
        }]
       
      }],
    }
    return (    
      <div className="chart">
        <HighChartsReact highcharts={HighCharts} options={options}/>

      </div>
    )
  }
}

const mapStateToProps = state => {
  const { news, upvote } = state;
  if (news && news.hits && news.hits.length) {
    var yAxisData = news.hits.map(item => item.objectID);
    var xAxisData = yAxisData.map(item => {
        if (upvote && upvote[item]) {
          return upvote[item]
        } else {
          return 0;
        }
      })
  }

  return { yAxisData, xAxisData };
}


export default connect(mapStateToProps, null)(Chart); 
