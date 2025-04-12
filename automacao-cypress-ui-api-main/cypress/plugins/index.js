// cypress/plugins/index.js

const { checkEmailAndResetPassword } = require('../support/emailHelper'); // Importe a função do arquivo imapScript.js

module.exports = (on, config) => {
  // Registra a task
  on('task', {
    // Task personalizada que chama a função de acessar o email
    'checkEmailAndResetPassword': () => {
      return checkEmailAndResetPassword();  // Chama a função para buscar o link e redefinir a senha
    }
  });
};
