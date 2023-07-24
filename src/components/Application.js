import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList.";
import InterviewerListItem from "./InterviewerListItem";
import Appointment from "./Appointment/Appointment"
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import { useVisualMode } from "hooks/useVisualMode";
import useApplicationData from "hooks/useApplicationData";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const { mode, transition, back } = useVisualMode(EMPTY);

  // const setDay = (day) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     day: day,
  //   }));
  // };


  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  // useEffect(() => {
  //   Promise.all([
  //     axios.get('/api/days'),
  //     axios.get('/api/appointments'),
  //     axios.get('/api/interviewers')
  //   ]).then((all) => {
  //     console.log('Interviewers data:', all[2].data);
  //     setState(prev => ({
  //       ...prev,
  //       days: all[0].data,
  //       appointments: all[1].data,
  //       interviewers: all[2].data
  //     }));
  //   })
  //   .catch(error => {
  //     console.log('Error fetching data:', error);
  //   });
  // }, []);


  // function bookInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  // Make the PUT request to update the appointment in the database
  //   return axios.put(`/api/appointments/${id}`, { interview })
  //     .then(() => {
  //       setState(prevState => ({
  //         ...prevState,
  //         appointments
  //       }));
  //       // Transition to the SHOW mode after successful update
  //       transition(SHOW);
  //     })
  //     .catch(error => {
  //       console.log('Error updating appointment:', error);
  //       // Handle any errors that occur during the PUT request
  //     });
  // }
  // function cancelInterview(id) {
  //   return axios.delete(`/api/appointments/${id}`).then(() => {
  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: null,
  //     };
  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment,
  //     };
  //     setState({
  //       ...state,
  //       appointments,
  //     });
  //   });
  // }


  const dailyAppointments = getAppointmentsForDay(state, state.day)
  console.log('state ....', state);
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
            day={state.days}
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
              interviewers={state.interviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          )
        })}
      </section>
    </main>
  );
}
