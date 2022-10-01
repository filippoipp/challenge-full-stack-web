**INSTRUÇÕES DE COMO EXECUTAR O PROJETO ESTÃO NO README DE CADA PARTE**

## Comentários
Optei pela utilização de uma arquitetura simples, básicamente feita de controllers e repositories.
As bibliotecas de terceiros utilizadas foram:
    @hapi/joi,
    axios,
    bcryptjs,
    compression,
    cors,
    cpf-cnpj-validator,
    dotenv,
    express,
    jsonwebtoken,
    pg,
    source-map-support,
    typeorm,

Pontos de melhoria
**backend**
- Os retornos de erro estão genéricos, então é algo que poderia ser melhorado para mais facil entendimento e também
para facilitar para o frfont-end
- Apesar de ter feito alguns testes unitários, ainda é necessario aumentar a cobertura de testes para ter uma aplicação mais segura
e também fazer os testes e2e e de integração.

**frontend**
- Configurei o Vuex para fazer a manipulação do token de autorização, porém o mesmo não foi utilizado. Optei por utilizar o local storage para
poder dar segmento ao projeto.
- Quando o tempo do token expira, a sessão do usuário não é finalizada
- Criaria alguns componentes que poderiam ser reutilizados em varias partes do código,
por exemplo modal de cadastro e alerta de erro.

Acredito ter entregue todos os pontos obrigatórios.
