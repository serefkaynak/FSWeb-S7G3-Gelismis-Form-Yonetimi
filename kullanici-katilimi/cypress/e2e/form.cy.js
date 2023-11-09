describe("Form Sayfası Testleri", (() => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    it("Email alanına mail adresi yazsın"),(() => {

        cy.get("input[name=name]").type("Ali");

        cy.get("input[name=email]").clear();
        cy.get("input[name=email]").should("have.value", "");

        cy.get("input[name=email]").type("XXXXXXXXXXXX");
        cy.get("input[name=email]").should("have.value", "XXXXXXXXXXXX");
        
        cy.get("input[name=email]").type("ali@veli.com");
        cy.get("input[name=password]").type("12345678");

        cy.get("input[name=kosul").check();
        cy.get("input[name=kosul").should("be.checked");

        cy.get("#user-form-btn").should("be.enabled");
        cy.get("#user-form-btn").click();
    };
})