export function getAppointmentsForDay(state, day) {
    console.log('state..', state);
    console.log('day..', day);
    
    const appointmentForDay = state.days.filter(d => d.name === day);
    console.log('selector helper...', appointmentForDay);
    let filteredAppointments = [];
    if (appointmentForDay.length > 0) {
        
        filteredAppointments = appointmentForDay[0]?.appointments?.map(apptId => state.appointments[apptId]);
    }
    console.log('filter appoints..', filteredAppointments)
    return filteredAppointments;
}

export function getInterview(state, interview) {

    if(!interview) {
        return null;
    }

    const interviewer = state.interviewers[interview.interviewer];

    return {
        student: interview.student,

        interviewer: {
            id: interviewer.id,
            name: interviewer.name,
            avatar: interviewer.avatar,
        },
    };

}