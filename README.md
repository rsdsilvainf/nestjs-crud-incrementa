# API CRUD com NestJS — Tasks e Projects

Projeto incremental baseado no material de aula **Desenvolvimento Backend**: NestJS, arquitetura modular, Controller, Service, Module, DTO, rotas REST e persistência em JSON.

## Requisitos

- Node.js e npm instalados.
- Terminal aberto na pasta do projeto.

## Instalação e execução

```bash
npm install
npm run start:dev
```

Servidor: `http://localhost:3000/api`

## Estrutura principal

```text
data/
  tasks.json
  projects.json
src/
  app.module.ts
  main.ts
  tasks/
    dto/
      create-task.dto.ts
      update-task.dto.ts
    tasks.controller.ts
    tasks.service.ts
    tasks.module.ts
  projects/
    dto/
      create-project.dto.ts
      update-project.dto.ts
    projects.controller.ts
    projects.service.ts
    projects.module.ts
```

- **Controller:** recebe as requisições HTTP e chama o Service.
- **Service:** executa as operações e lê/grava os arquivos JSON.
- **Module:** registra Controller e Service.
- **DTO:** descreve os dados recebidos nas operações de criação e atualização.
- **data/*.json:** mantém os dados mesmo depois que o servidor é encerrado.

## Rotas de Tasks

Todas usam o prefixo `/api`.

| Método | Rota | Função |
|---|---|---|
| GET | `/tasks` | Lista tarefas |
| GET | `/tasks/1` | Busca uma tarefa |
| POST | `/tasks` | Cria tarefa |
| PUT | `/tasks/1` | Substitui os campos principais |
| PATCH | `/tasks/1` | Atualiza parcialmente |
| DELETE | `/tasks/1` | Remove tarefa |

### Exemplo POST /api/tasks

```json
{
  "descricao": "Estudar NestJS",
  "inicio": 1,
  "fim": 3
}
```

### Exemplo PUT /api/tasks/1

```json
{
  "descricao": "Estudar NestJS e testar a API",
  "inicio": 1,
  "fim": 4
}
```

### Exemplo PATCH /api/tasks/1

```json
{
  "status": "concluida",
  "resultado": [10, 20, 30]
}
```

## Rotas de Projects

| Método | Rota | Função |
|---|---|---|
| GET | `/projects` | Lista projetos |
| GET | `/projects/1` | Busca um projeto |
| POST | `/projects` | Cria projeto |
| PUT | `/projects/1` | Substitui os campos |
| PATCH | `/projects/1` | Atualiza parcialmente |
| DELETE | `/projects/1` | Remove projeto |

### Exemplo POST /api/projects

```json
{
  "nome": "CompFlow",
  "descricao": "Aplicação acadêmica",
  "status": "em andamento"
}
```

### Exemplo PATCH /api/projects/1

```json
{
  "status": "concluido"
}
```

## Como testar

Pode usar Insomnia, ReqBin ou extensão REST Client do VS Code, conforme a aula.

1. Inicie o servidor com `npm run start:dev`.
2. Faça um POST para criar uma tarefa e outro para criar um projeto.
3. Teste GET para listar e buscar pelo ID.
4. Teste PUT enviando todos os campos principais.
5. Teste PATCH enviando apenas um campo.
6. Teste DELETE e depois faça GET para confirmar a remoção.
7. Para verificar persistência, crie um registro, pare o servidor (`Ctrl + C`), inicie novamente e consulte o GET. O registro deverá continuar presente.
8. Confira também os arquivos `data/tasks.json` e `data/projects.json`.

## Observação sobre persistência

Os arquivos JSON são gravados na pasta `data`, fora de `src`, como mostrado no material. Execute os comandos a partir da raiz do projeto para que o caminho `data/...` seja encontrado.

## Publicação no GitHub

Crie um repositório vazio no GitHub e, na pasta do projeto, execute:

```bash
git init
git add .
git commit -m "Implementa CRUD de tasks e projects com NestJS"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

Substitua a URL pela do seu repositório. Depois, entregue o link do repositório ao professor.
