import React, { Fragment } from "react";
import "../Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Empty from "./Empty";
import Status from "./Status"; 
import { useVisualMode } from "hooks/useVisualMode";
import axios from "axios";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";


export default function Appointment(props) {

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {
        const interview = {
          student: name,
          interviewer
        };
        transition(SAVING)
        console.log('id:', props.id);
        console.log('interview', interview);
        props.bookInterview(props.id, interview);
        transition(SHOW);
      }

      function deleteInterview() {
        // Update the local state to set the interview to null
        props.setInterview(null);
      
        // Make a DELETE request to the API to remove the interview from the database
        axios.delete(`/api/appointments/${props.id}`).then((response) => {
          // If the request is successful, transition to the EMPTY mode
          transition(EMPTY);
        });
      }

      function cancelInterview() {
        transition(DELETING);
        props.cancelInterview(props.id).then(() => {
          transition(EMPTY);
        });
      }
      
    return (
        <>
            <article className="appointment"></article>
            <Header time={props.time} />

            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
           {mode === SHOW && (
            <Show student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onDelete={deleteInterview}
            />
           )}
           {mode === SAVING && <Status message="Saving" />}
           {mode === CREATE && 
           <Form
           student={props.student}
           interviewer={props.interviewer}
           interviewers={props.interviewers} // Pass the interviewers data here
           onSave={save}
           onCancel={cancelInterview}
           setStudent={props.setStudent} 
           setInterviewer={props.setInterviewer}
           
         />}
        </>
    )
}