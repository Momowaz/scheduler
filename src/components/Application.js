import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList.";
import InterviewerListItem from "./InterviewerListItem";
import Appointment from "./Appointment/Appointment"
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import { useVisualMode } from "hooks/useVisualMode";


// const interviewers = [
//   {
//     id: 1,
//     name: "Sylvia Palmer",
//     avatar: "https://i.imgur.com/LpaY82x.png"
//   }
// ];


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Application(props) {

  const { mode, transition, back } = useVisualMode(EMPTY);

  const setDay = (day) => {
    setState((prevState) => ({
      ...prevState,
      day: day,
    }));
  };


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      console.log('Interviewers data:', all[2].data);
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
    .catch(error => {
      console.log('Error fetching data:', error);
    });
  }, []);

  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    // Make the PUT request to update the appointment in the database
    axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState(prevState => ({
          ...prevState,
          appointments
        }));
        // Transition to the SHOW mode after successful update
        transition(SHOW);
      })
      .catch(error => {
        console.log('Error updating appointment:', error);
        // Handle any errors that occur during the PUT request
      });
  }

  function cancelInterview(id) {
    // Find the appointment with the given id
    const appointment = state.appointments[id];
  
    // Update the appointment to set the interview data to null
    const updatedAppointment = {
      ...appointment,
      interview: null,
    };
  
    // Create a new appointments object with the updated appointment
    const updatedAppointments = {
      ...state.appointments,
      [id]: updatedAppointment,
    };
  
    // Update the state with the new appointments object
    setState((prev) => ({
      ...prev,
      appointments: updatedAppointments,
    }));
  
    // Make a DELETE request to the API to remove the interview from the database
    // axios.delete(`/api/appointments/${id}`).then((response) => {
     
    // });
  }
  


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
        <InterviewerListItem
          interviewers={state.interviewers}
          interviewer={state.interviewer}
          setInterviewer={state.setInterviewer}
        />


        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview)
          console.log('what is in interview:.. ', interview)
          return <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers={state.interviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />
        })}
      </section>
    </main>
  );
}
