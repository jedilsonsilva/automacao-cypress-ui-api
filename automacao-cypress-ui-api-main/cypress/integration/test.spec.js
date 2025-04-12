describe('Cadastro e Reset de Senha', () => {
    it('Deve receber o email, acessar o link e resetar a senha', () => {
      // Chama a task para verificar o email e obter o link de redefinição de senha
      cy.task('checkEmailAndResetPassword').then((resetPasswordLink) => {
        // Agora que temos o link, visitamos a página de redefinição de senha
        cy.visit(resetPasswordLink);
        
        // Preenche os campos de nova senha
        cy.get('input[name="password"]').type('NovaSenha123');
        cy.get('input[name="confirmPassword"]').type('NovaSenha123');
        cy.get('button[type="submit"]').click();
  
        // Verifique se a senha foi alterada com sucesso
        cy.contains('Senha alterada com sucesso').should('be.visible');
      });
    });
  });