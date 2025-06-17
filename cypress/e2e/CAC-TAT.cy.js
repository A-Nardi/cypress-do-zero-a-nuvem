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

    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    cy.get('#phone').type('abc').should('not.have.value', 'abc')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    //--------- tratativa por posição e validação por posição
    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Nardi')
    cy.get('#email').type('nardi@teste.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.get('#product').select(1).then($select => {
      expect($select[0].selectedIndex).to.equal(1)
    })

    cy.get('#phone').type('abc').should('not.have.value', 'abc')
    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Nardi')
    cy.get('#email').type('nardi@teste.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.get('#product').select('Cursos').find('option:selected').should('have.text', 'Cursos')
    cy.get('#phone').type('abc').should('not.have.value', 'abc')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    //--------- Pelo texto presente no campo e validando pelo texto

  })

  it('11 - Seleção de um campo do tipo radio através de check e verifica se esta marcado', () => {
    const longText = Cypress._.repeat('contains teste, ', 10)
    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Nardi')
    cy.get('#email').type('nardi@teste.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    cy.get('#phone').type('abc').should('not.have.value', 'abc')
    cy.get('input[type="radio"]').check('feedback').should('be.checked')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('12 - Marca cada tipo de atendimento e verifica se esta marcado', () => {
    cy.get('input[type="radio"]')
        .each(typeOfService => {
          cy.wrap(typeOfService)
              .check()
              .should('be.checked')
        })
  })
  it('13 - Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check()
        .should('be.checked')
        .last().uncheck().should('not.be.checked')
        })

  it('14 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longText = Cypress._.repeat('qwdnqiudnasndnsaomsdamdamsomdsa', 10)

    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Nardi')
    cy.get('#email').type('nardi@teste.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('15 - Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')
        .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
  })

  it('16 - Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
        //drag-drop é uma função que simular arrastar e soltar arquivos
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
  })

  it('17 - Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
  })

  it('18 - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    //utilizado ".contains" no lugar de ".get" para garantir que alem do tag ancora fosse <a> o valor era politica...
    cy.contains('a', 'Política de Privacidade')
        //validado que se ao clicar no campo, possuia um atributo _href e o valor era privacy.html
        .should('have.attr', 'href', 'privacy.html')
        //e o atributo era _black (levaria a outra tela)
        .and('have.attr', 'target', '_blank')
  })

  it('19 - Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
        //utilizando a função invoke para remover o atributo target que levaria a uma nova aba, dessa forma mantem na mesma aba
        .invoke('removeAttr', 'target').click()
        //validando que ao acessa o link que levaria uma nova aba e agora foi removido a funcionalidade, se mantem o direcionamento certo
        cy.url().should('include', 'privacy.html')
  })

})
