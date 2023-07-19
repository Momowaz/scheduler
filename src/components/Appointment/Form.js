import Button from "components/Button"
import React, { useState } from "react"
import InterviewerList from "components/InterviewerList"

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    props.setStudent("");
    props.setInterviewer(null);
  }
  const cancel = () => {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={e => {e.preventDefault()}} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={e => setStudent(e.target.value)}
          />
        </form>
        <InterviewerList
          // interviewers={props.interviewers}
          // value={props.interviewer} 
          // onChange={props.setInterviewer}
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={props.onConfirm}>Save</Button>
        </section>
      </section>
    </main>
  )
}