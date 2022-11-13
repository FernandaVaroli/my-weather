import React from "react";
import './DailyTemp.css';

export default function DailyTemp ({dailyList}) {

    if(!dailyList){
        return <div></div>
    }

    let rows = []
    for (let i = 0; i < dailyList.time.length; i++) {
      rows.push(<li className="daily-list">{dailyList.time[i]}: maxima {dailyList.temperature_2m_max[i]} minima {dailyList.temperature_2m_min[i]}</li>)
    }

    return (<div className="daily-temp-container">
        {rows}
    </div>)
}