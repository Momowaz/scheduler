import React from "react";
import DayListItem from "./DayListItem";
import "../components/DayListItem.scss";

export default function DayList(props) {
  const dayItems = props.days.map(day => (
      <DayListItem
        key={day.id} 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}
      />
  ));
  return <div>{dayItems}</div>
}
