import React from "react";
import "../components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  if (!interviewers) {
    return null; // or you can return a loading state or an error message
  }

  const interviewerItems = interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === value}
      setInterviewer={() => onChange(interviewer.id)}
    />
  ));

  return <ul className="interviewers">{interviewerItems}</ul>;
}


// export default function InterviewerList(props) {
//     const interviewerListItems = props.interviewers.map((interviewer) => (
//       <InterviewerListItem
//         key={interviewer.id}
//         name={interviewer.name}
//         avatar={interviewer.avatar}
//         selected={interviewer.id === props.value}
//         setInterviewer={() => props.onChange(interviewer.id)}
//       />
//     ));
  
//     return <ul className="interviewers__list">{interviewerListItems}</ul>;
//   }
  