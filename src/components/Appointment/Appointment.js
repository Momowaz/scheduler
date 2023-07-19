import React, { Fragment } from "react";
import "../Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Empty from "./Empty";
import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {
        const interview = {
          student: name,
          interviewer
        };
        console.log('id:', props.id);
        console.log('interview', interview);
        props.bookInterview(props.id, interview);
        transition(SHOW);
      }

    return (
        <>
            <article className="appointment"></article>
            <Header time={props.time} />

            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
           {mode === SHOW && (
            <Show student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            />
           )}
           {mode === CREATE && <Form onSave={save} />}
        </>
    )
}