import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList.";
import InterviewerListItem from "./InterviewerListItem";
import Appointment from "./Appointment/Appointment"
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

// eslint-disable-next-line
const interviewers = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};


export default function Application(props) {
  
  const setDay = (day) => {
    setState((prevState) => ({
      ...prevState,
      day: day,
    }));
  };
  
  // const setDays = (days) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     days: days,
  //   }));
  // };
  

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // const dailyAppointments = [];

  

  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      console.log('my console log to get interviewer...',all[2].data);
     setState(prev => ({
      ...prev,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data
     }))

      console.log(all[2]);
    })
    // axios.get('/api/days')
    // .then(response => {
    //   setDays(response.data);
    // })
    // .catch(error => {
    //   console.log('unable to get days from api', error);
    // });
  }, [])
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  
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
        interviewers={interviewers}
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
           />
        })}
      </section>
    </main>
  );
}
