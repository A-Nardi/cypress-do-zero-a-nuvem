//visitando uma pagina de forma independente (sem partir de outra pagina e a testando)
it('Testa a página da política de privacidade de forma independente', () => {
    //definindo qual pagina será visitanda
    cy.visit('./src/privacy.html')
        //verificando se uma tag h1 (titulo 1) possui o valor CAC TAT - Política de Privacidade e esta visivel
        cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
        // verificando se uma tag (paragrafo) possui o valor Talking About Testing e esta visivel
        cy.contains('p', 'Talking About Testing').should('be.visible')
})
