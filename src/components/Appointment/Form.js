import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [error, setError] = useState("");
  const [student, setStudent] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function validate() {

    if (student.trim() === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    // Clear the error if both name and interviewer are valid
    setError("");

    props.onSave(student, interviewer);
  }

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const save = () => {
    validate();
    if (!error && student && interviewer) {
      props.onSave(student, interviewer);
    }
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={e => e.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={e => setStudent(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__validation">{error}</section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  );
}
