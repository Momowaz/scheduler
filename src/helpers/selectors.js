export function getAppointmentsForDay(state, day) {
    
    const appointmentForDay = state.days.find((dayObj) => dayObj.name === day);
    let filteredAppointments = [];
    if (appointmentForDay) {
        
        filteredAppointments = appointmentForDay?.appointments.map(apptId => state.appointments[apptId]);
    }
    console.log('filteredAppointments...', filteredAppointments )
    return filteredAppointments;
}


export function getInterview(state, interview) {

    if(!interview) {
        return null;
    }
    const interviewer = state.interviewers[interview.interviewer];
    if (!interviewer) {
        return null; // Return null if interviewer data is not available
      }

    return {
        student: interview.student,

        interviewer: {
            id: interviewer.id,
            name: interviewer.name,
            avatar: interviewer.avatar,
        },
    };

}

export function getInterviewersForDay(state, day) {
    const foundDay = state.days.find(d => d.name === day)

    if (!foundDay) return []

    return foundDay.interviewers.map(id => state.interviewers[id])
}