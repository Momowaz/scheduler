import React from "react";
import "components/Application.scss";
import DayList from "./DayList.";
// import InterviewerListItem from "./InterviewerListItem";
import Appointment from "./Appointment/Appointment"
// import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
// import { useVisualMode } from "hooks/useVisualMode";
import useApplicationData from "hooks/useApplicationData";


// const EMPTY = "EMPTY";
// const SHOW = "SHOW";
// const CREATE = "CREATE";


export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const dailyInterviewers = getInterviewersForDay(state, state.day)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview)
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          )
        })}
        <Appointment time="5pm" />
      </section>
    </main>
  );
}
