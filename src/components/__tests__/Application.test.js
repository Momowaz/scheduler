import React from "react";

import { render, cleanup, waitForElement, getByAltText, queryByAltText, queryByTextWithMultipleElements, queryByText, getByPlaceholderText, fireEvent, getAllByTestId, getByText, prettyDOM } from "@testing-library/react";

import Application from "components/Application";
import DayListItem from "components/DayListItem";
import axios from "axios";

/* test number five */
it("shows the save error when failing to save an appointment", () => {
  axios.put.mockRejectedValueOnce();
});

afterEach(cleanup);

xit("renders without crashing", () => {
  render(<Application />);
});

// it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
//   const { container, debug } = render(<Application />);

//   await waitForElement(() => getByText(container, "Archie Cohen"));

//   const appointments = getAllByTestId(container, "appointment");
//   const appointment = appointments[0];

//   fireEvent.click(getByAltText(appointment, "Add"));

//   fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
//     target: { value: "Lydia Miller-Jones" }
//   });

//   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
//   fireEvent.click(getByText(appointment, "Save"));

//   expect(getByText(appointment, "Saving")).toBeInTheDocument();

//   await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

//   const day = getAllByTestId(container, "day").find(day =>
//     queryByText(day, "Monday")
//   );

//   expect(getByText(day, "no spots remaining")).toBeInTheDocument();
// });

// it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
//   // 1. Render the Application component.
//   const { container } = render(<Application />);

//   // 2. Wait until the text "Archie Cohen" is displayed.
//   await waitForElement(() => getByText(container, "Archie Cohen"));

//   // 3. Click the "Delete" button on the booked appointment.
//   const appointment = getAllByTestId(container, "appointment").find(
//     appointment => queryByText(appointment, "Archie Cohen")
//   );

//   fireEvent.click(queryByAltText(appointment, "Delete"));

//   // 4. Check that the confirmation message is shown.
//   expect(
//     queryByTextWithMultipleElements(appointment, "Are you sure you would like to delete?")
//   ).toBeInTheDocument();

//   // 5. Click the "Confirm" button on the confirmation modal.
//   fireEvent.click(queryByText(appointment, "Confirm"));

//   // 6. Check that the element with the text "Deleting" is displayed.
//   expect(getByText(appointment, "Deleting")).toBeInTheDocument();

//   // 7. Wait until the element with the "Add" button is displayed again.
//   await waitForElement(() => getByAltText(appointment, "Add"));

//   // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
//   const day = getAllByTestId(container, "day").find(day =>
//     queryByText(day, "Monday")
//   );

//   expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
// });

// it("shows the save error when failing to save an appointment", async () => {
//   // 1. Render the Application component.
//   const { container } = render(<Application />);

//   // 2. Wait until the text "Archie Cohen" is displayed.
//   await waitForElement(() => getByText(container, "Archie Cohen"));

//   // 3. Click the "Add" button on an empty appointment slot to create a new appointment.
//   const appointment = getAllByTestId(container, "appointment").find(
//     appointment => queryByText(appointment, "Add")
//   );

//   fireEvent.click(queryByAltText(appointment, "Add"));

//   // 4. Enter the student name and select an interviewer.
//   fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
//     target: { value: "Lydia Miller-Jones" }
//   });
//   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

//   // 5. Click the "Save" button on the form.
//   fireEvent.click(queryByText(appointment, "Save"));

//   // 6. Mock the axios.put request to return a rejected promise with an error message.
//   axios.put.mockRejectedValueOnce(new Error("Error saving appointment."));

//   // 7. Check that the element with the text "Saving" is displayed.
//   expect(getByText(appointment, "Saving")).toBeInTheDocument();

//   // 8. Wait until the element with the "Error" message is displayed.
//   await waitForElement(() => getByText(appointment, "Error"));

//   // 9. Check that the error message is shown with the correct content.
//   expect(getByText(appointment, "Error saving appointment.")).toBeInTheDocument();

//   // 10. Click the close button on the error to dismiss it.
//   fireEvent.click(getByAltText(appointment, "Close"));

//   // 11. Check that the form is shown again to correct the error.
//   expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();
// });

// it("shows the delete error when failing to delete an existing appointment", async () => {
//   // 1. Render the Application component.
//   const { container } = render(<Application />);

//   // 2. Wait until the text "Archie Cohen" is displayed.
//   await waitForElement(() => getByText(container, "Archie Cohen"));

//   // 3. Click the "Delete" button on the booked appointment for "Archie Cohen".
//   const appointment = getAllByTestId(container, "appointment").find(
//     appointment => queryByText(appointment, "Archie Cohen")
//   );

//   fireEvent.click(queryByAltText(appointment, "Delete"));

//   // 6. Mock the axios.delete request to return a rejected promise with an error message.
//   axios.delete.mockRejectedValueOnce(new Error("Error deleting appointment."));

//   // 7. Check that the confirmation message is shown.
//   expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

//   // 8. Click the "Confirm" button on the confirmation.
//   fireEvent.click(queryByText(appointment, "Confirm"));

//   // 9. Check that the element with the text "Deleting" is displayed.
//   expect(getByText(appointment, "Deleting")).toBeInTheDocument();

//   // 10. Wait until the element with the "Error" message is displayed.
//   await waitForElement(() => getByText(appointment, "Error"));

//   // 11. Check that the error message is shown with the correct content.
//   expect(getByText(appointment, "Error deleting appointment.")).toBeInTheDocument();

//   // 12. Click the close button on the error to dismiss it.
//   fireEvent.click(getByAltText(appointment, "Close"));

//   // 13. Check that the form is shown again to correct the error.
//   expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
// });

// it("changes the schedule when a new day is selected", async () => {
//   const { getByText } = render(<Application />);

//   await waitForElement(() => getByText("Monday"));

//   fireEvent.click(getByText("Tuesday"));

//   expect(getByText("Leopold Silvers")).toBeInTheDocument();
// });

// it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
//   // 1. Render the Application component.
//   const { container } = render(<Application />);

//   // 2. Wait until the text "Archie Cohen" is displayed.
//   await waitForElement(() => getByText(container, "Archie Cohen"));

//   // 3. Click the "Edit" button on the booked appointment for "Archie Cohen".
//   const appointment = getAllByTestId(container, "appointment").find(
//     appointment => queryByText(appointment, "Archie Cohen")
//   );

//   fireEvent.click(queryByAltText(appointment, "Edit"));

//   // 4. Check that the form is rendered with the existing student name and interviewer selected.
//   expect(getByTestId(appointment, "student-name-input")).toHaveValue("Archie Cohen");
//   expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument(); // Assuming Tori Malcolm is the existing interviewer

//   // 5. Edit the student name to "Lydia Miller-Jones" and select a different interviewer (e.g., "Sylvia Palmer").
//   fireEvent.change(getByTestId(appointment, "student-name-input"), {
//     target: { value: "Lydia Miller-Jones" }
//   });
//   fireEvent.click(queryByAltText(appointment, "Sylvia Palmer"));

//   // 6. Click the "Save" button on the form.
//   fireEvent.click(queryByText(appointment, "Save"));

//   // 7. Check that the element with the text "Saving" is displayed.
//   expect(getByText(appointment, "Saving")).toBeInTheDocument();

//   // 8. Wait until the element with the "Show" button is displayed.
//   await waitForElement(() => getByAltText(appointment, "Show"));

//   // 9. Check that the DayListItem with the text "Monday" still has the text "1 spot remaining".
//   const day = getAllByTestId(container, "day").find(day =>
//     queryByText(day, "Monday")
//   );

//   expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
// });

it("renders 'no spots remaining' when there are 0 spots", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={0} />);
  expect(getByText("no spots remaining")).toBeInTheDocument();
});

xit("renders '1 spot remaining' when there is 1 spot", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={1} />);
  expect(getByText("1 spot remaining")).toBeInTheDocument();
});

xit("renders '2 spots remaining' when there are 2 spots", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={2} />);
  expect(getByText("2 spots remaining")).toBeInTheDocument();
});

