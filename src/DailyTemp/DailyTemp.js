import React from "react";
import {GoArrowDown, GoArrowUp} from "react-icons/go";
import './DailyTemp.css';

export default function DailyTemp ({dailyList}) {

    if(!dailyList){
        return <div></div>
    }

    let rows = []
    for (let i = 0; i < dailyList.time.length; i++) {
      rows.push(<li key={i} className="daily-list">{dailyList.time[i]}: <p><GoArrowUp/> {dailyList.temperature_2m_max[i]} <GoArrowDown /> {dailyList.temperature_2m_min[i]}</p></li>)
    }

    return (<div className="daily-temp-container">
        {rows}
    </div>)
}