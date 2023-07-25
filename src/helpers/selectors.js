export function getAppointmentsForDay(state, day) {
    
    const appointmentForDay = state.days.filter(d => d.name === day);
    let filteredAppointments = [];
    if (appointmentForDay.length > 0) {
        
        filteredAppointments = appointmentForDay[0]?.appointments?.map(apptId => state.appointments[apptId]);
    }
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