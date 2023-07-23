import React, { Fragment } from "react";
import "../Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Error from "./Error";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Status from "./Status"; 
import { useVisualMode } from "hooks/useVisualMode";
import axios from "axios";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const ERROR = "ERROR";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE"


export default function Appointment(props) {

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );
      

      function save(name, interviewer) {
        const interview = {
          student: name,
          interviewer
        };
        transition(SAVING);
        props.bookInterview(props.id, interview)            
          .then(() => transition(SHOW))
          .catch(error => {
            transition(ERROR_SAVE, true)
          });
      }
    
      function deleteInterview() {
        transition(DELETING);
        props.cancelInterview(props.id)
          .then(() => transition(EMPTY))
          .catch(() => transition(ERROR, true));
      }
    
      return (
        <article className="appointment">
          <Header time={props.time} />
          {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer.name}
              onDelete={() => transition(CONFIRM)}
            />
          )}
          {mode === CREATE && (
            <Form
              interviewers={props.interviewers}
              onSave={save}
              onCancel={back}
            />
          )}
          {mode === SAVING && <Status message="Saving" />}
          {mode === DELETING && <Status message="Deleting" />}
          {mode === CONFIRM && (
            <Confirm
              message="Are you sure you want to delete this interview?"
              onCancel={() => back()}
              onConfirm={deleteInterview}
            />
          )}
          {mode === ERROR_SAVE && (
            <Error
              message="Could not save/delete the appointment."
              onClose={() => back()}
            />
          )}
        </article>
      );
    }