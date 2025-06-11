Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'André',
    lastName: 'Nardi',
    email: 'teste@teste.com',
    openTextArea: 'Teste de preenchimento de campo obrigatório',
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.openTextArea, { delay: 0 })
    cy.get('button[type="submit"]').click()
})