import React from "react";
import classNames from "classnames";
import "../components/DayListItem.scss";
import formatSpots from "helpers/formatSpots";

export default function DayListItem(props) {
  const dayClasses = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li data-testid="day" className={dayClasses} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
