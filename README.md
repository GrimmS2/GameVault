# GameVault

O GameVault é uma aplicação web desenvolvida em ReactJS para gerenciar uma biblioteca de jogos. O sistema permite cadastrar, visualizar, editar e excluir jogos por meio de uma API REST simulada com JSON Server.

## Tecnologias utilizadas

- ReactJS
- JavaScript
- HTML e CSS
- Vite
- JSON Server

## Funcionalidades

- Cadastro de jogos
- Listagem dos jogos cadastrados
- Edição das informações de um jogo
- Exclusão de jogos
- Armazenamento dos dados no arquivo `db.json`

## API REST

A API foi desenvolvida utilizando JSON Server, que simula um servidor REST e armazena os dados em um arquivo JSON.

**Endereço base:** `http://localhost:3000`

### Endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/jogos` | Lista todos os jogos |
| GET | `/jogos/:id` | Consulta um jogo pelo ID |
| POST | `/jogos` | Cadastra um novo jogo |
| PUT | `/jogos/:id` | Atualiza um jogo existente |
| DELETE | `/jogos/:id` | Exclui um jogo |

### Exemplo de JSON

```json
{
  "nome": "Minecraft",
  "genero": "Sandbox",
  "plataforma": "PC",
  "ano": 2011
}
```

O ID é gerado automaticamente pelo JSON Server.

## Como executar o projeto

É necessário ter o Node.js instalado.

1. Abra a pasta do projeto no terminal.
2. Instale as dependências:

```bash
npm install
```

3. Inicie a aplicação React:

```bash
npm run dev
```

4. Em outro terminal, inicie a API:

```bash
npx json-server db.json --port 3000
```

5. Acesse a aplicação em:

`http://localhost:5173/`

A API estará disponível em `http://localhost:3000/jogos`.

## Estrutura dos dados

Cada jogo possui os seguintes campos:

- `id`: identificador único gerado pela API.
- `nome`: nome do jogo.
- `genero`: gênero do jogo.
- `plataforma`: plataforma em que o jogo está disponível.
- `ano`: ano de lançamento.