import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: {}
  });

  const updateSpots = (day, appointments) => {
    const selectedDay = state.days.find((d) => d.name === day);
    const availableSpots = selectedDay.appointments.filter(
      (apptId) => !appointments[apptId].interview
    ).length -1;

    const updatedDay = {...selectedDay, spots: availableSpots };

    const updatedDays = state.days.map((d) => 
      d.name === day ? updatedDay : d
    );
    
    setState((prev) => ({
      ...prev,
      days: updatedDays,
    }));
  };

  const setDay = (day) => {
    setState((prevState) => ({
      ...prevState,
      day: day,
    }));
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Make the PUT request to update the appointment in the database
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          appointments,
        }));
        updateSpots(state.day, appointments);
      })
      .catch((error) => {
        console.log("Error updating appointment:", error);
        // Handle any errors that occur during the PUT request
        throw error;
      });
  };

  const cancelInterview = (id) => {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null,
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        setState((prev) => ({
          ...prev,
          appointments,
        }));

        updateSpots(state.day, appointments)
      })
      .catch((error) => {
        console.log("Error deleting appointment:", error);
        // Handle any errors that occur during the DELETE request
        throw error;
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
