import React from "react";
// import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  if (!interviewers) {
    return null; // or you can return a loading state or an error message
  }

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

  const interviewerItems = Object.values(interviewers).map(interviewer => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === value}
      setInterviewer={() => onChange(interviewer.id)}
    />
  ));

  return <ul className="interviewers__list">{interviewerItems}</ul>;
}
