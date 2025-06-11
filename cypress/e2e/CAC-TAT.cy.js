describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('1 - verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('2 - Preenche os campos obrigatórios e envia o formulário.', () => {
    const longText = Cypress._.repeat('qwdnqiudnasndnsaomsdamdamsomdsa', 10)

    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Nardi')
    cy.get('#email').type('nardi@teste.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')

  })

  it('3 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('qwdnqiudnasndnsaomsdamdamsomdsa', 10)

    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Nardi')
    cy.get('#email').type('semformatacao.teste')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('4 - Teste para validar que, se um valor não-numérico for digitado, seu valor continuará vazio', () => {
    const longText = Cypress._.repeat('qwdnqiudnasndnsaomsdamdamsomdsa', 10)

    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Nardi')
    cy.get('#email').type('nardi@teste.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.get('#phone').type('abc').should('not.have.value', 'abc')

    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  it('5 - Não preenchimento do campo obrigatório, telefone', () => {
    const longText = Cypress._.repeat('qwdnqiudnasndnsaomsdamdamsomdsa', 10)

    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Nardi')
    cy.get('#email').type('nardi@teste.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.get('#phone-checkbox').click()
    cy.get('#phone').should('not.have.value')

    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('6 - Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    const longText = Cypress._.repeat('qwdnqiudnasndnsaomsdamdamsomdsa', 10)

    cy.get('#firstName')
      .type('André')
      .should('have.value', 'André')
      .clear().should('have.value', '')
    cy.get('#lastName')
      .type('Nardi')
      .should('have.value', 'Nardi')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('nardi@teste.com.br')
      .should('have.value', 'nardi@teste.com.br')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('49998555555')
      .should('have.value', '49998555555')
      .clear()
      .should('have.value', '')
  })

  it('7 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('8 - Envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('9 - Funcionalidade contains para identificar elementos', () => {
    const longText = Cypress._.repeat('contains teste, ', 10)

    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Nardi')
    cy.get('#email').type('nardi@teste.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.get('#phone').type('abc').should('not.have.value', 'abc')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('10 - Utilizando campos de seleção através da funcionalidade select', () => {
    const longText = Cypress._.repeat('contains teste, ', 10)
    //--------- tratativa pelo valor do select
    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Nardi')
    cy.get('#email').type('nardi@teste.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.get('select').select('mentoria').should('have.value', 'mentoria')
    cy.get('#phone').type('abc').should('not.have.value', 'abc')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    //--------- tratativa por posição e validação por posição
    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Nardi')
    cy.get('#email').type('nardi@teste.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.get('select').select(1).then($select => {
      expect($select[0].selectedIndex).to.equal(1)
    })

    cy.get('#phone').type('abc').should('not.have.value', 'abc')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    //--------- Pelo texto presente no campo e validando pelo texto
    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Nardi')
    cy.get('#email').type('nardi@teste.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.get('select').select('Cursos').find('option:selected').should('have.text', 'Cursos')
    cy.get('#phone').type('abc').should('not.have.value', 'abc')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })
})
