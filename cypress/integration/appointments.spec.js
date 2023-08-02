describe("Appointments", () => {

    beforeEach(() => {
        cy.request("GET", "/api/debug/reset");
        cy.visit("/");
        cy.contains("Monday");
    });

    it("should book an interview", () => {
        cy.contains("[data-testid=day]", "Tuesday")
            .click()
            .should("have.class", "day-list__item--selected")

        // Click the "Add" button for the empty appointment
        cy.get("[alt=Add]")
            .first()
            .click();

        // Wait for the input field to be visible and type the student's name
        cy.get("[data-testid=student-name-input]").should("be.visible").type("Lydia Miller-Jones");

        // Choose an interviewer
        cy.get("[alt='Sylvia Palmer']").click();

        // Click the "Save" button and wait for the appointment to be saved
        cy.contains("Save").click();
        cy.contains("Saving").should("exist");

        // Sees the booked appointment
        cy.contains(".appointment__card--show", "Lydia Miller-Jones");
        cy.contains(".appointment__card--show", "Sylvia Palmer");

    });

    it("should edit an interview", () => {
        cy.get("[alt=Edit]")
          .first()
          .click({ force: true });
      
        cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
        cy.get("[alt='Tori Malcolm']").click();
      
        cy.contains("Save").click();
      
        cy.contains(".appointment__card--show", "Lydia Miller-Jones");
        cy.contains(".appointment__card--show", "Tori Malcolm");
      });

      it("should cancel an interview", () => {
        cy.get("[alt=Delete]")
          .click({ force: true });
      
        cy.contains("Confirm").click();
      
        cy.contains("Deleting").should("exist");
        cy.contains("Deleting").should("not.exist");
      
        cy.contains(".appointment__card--show", "Archie Cohen")
          .should("not.exist");
      });
});
