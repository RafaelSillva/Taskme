# TaskMe

TaskMe é uma aplicação de gerenciamento de tarefas, criada para ajudar a controlar e organizar tarefas de diferentes níveis de prioridade (baixo, médio e alto). Este projeto foi desenvolvido com o objetivo de praticar e aprimorar habilidades no Next.js, assim como explorar outras tecnologias modernas de desenvolvimento web.

## 📋 Funcionalidades

- **Criação de Tarefas**: Adicione tarefas com título, descrição, data de vencimento, prioridade e status.
- **Visualização de Tarefas**: Acompanhe suas tarefas em uma lista organizada e detalhada.
- **Atualização de Tarefas**: Edite as informações das tarefas existentes para mantê-las atualizadas.
- **Remoção de Tarefas**: Exclua tarefas quando não forem mais necessárias.
- **Classificação por Prioridade**: Organize as tarefas por nível de prioridade para melhor gestão.

## 🛠️ Tecnologias Utilizadas

- **Next.js**: Framework React para construção de interfaces rápidas e escaláveis, focado em SSR (Server-Side Rendering) e SSG (Static Site Generation).
- **React Hooks**: Utilizados para gerenciamento de estado e ciclos de vida dos componentes de forma mais eficiente e concisa.
- **Componentes Customizados**: A aplicação é modularizada em componentes reutilizáveis, facilitando a manutenção e escalabilidade do código.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **MongoDB**: Banco de dados NoSQL, utilizado para armazenar e gerenciar as tarefas.

## 🚀 Objetivo do Projeto

TaskMe foi criado como um projeto de treinamento para desenvolver e consolidar habilidades no Next.js e outras tecnologias complementares. Além de explorar o potencial do framework, o projeto foca em:

- Estruturar aplicações web de maneira organizada e escalável.
- Aplicar conceitos de responsividade e design moderno com Tailwind CSS.
- Manipular dados com o MongoDB e integrá-los a uma aplicação Next.js.

## 🏁 Pré-requisitos e Instalação

### Pré-requisitos

- Node.js
- Typescript
- MongoDB
- Yarn ou npm

### Instalação

1. Clone o repositório:
   ```bash
   git clone [https://github.com/RafaelSillva/Taskme.git]
   cd taskme

### Instale as dependências:
npm install
# ou
yarn install

### Configure as variáveis de ambiente no arquivo .env.local para conectar ao MongoDB:
MONGODB_URI=sua-url-de-conexao-mongodb

### Inicie o servidor de desenvolvimento:
npm run dev
# ou
yarn dev

### Abra 
http://localhost:3000 para visualizar a aplicação no navegador.

📂 Estrutura do Projeto
taskme/
├── components/    # Componentes reutilizáveis da aplicação
├── models/        # Modelos de dados do MongoDB
├── pages/         # Páginas do Next.js
├── public/        # Arquivos estáticos
├── styles/        # Arquivos de estilo (Tailwind CSS)
├── utils/         # Funções auxiliares
└── README.md      # Documentação do projeto

📸 Capturas de Tela
<image src="https://github.com/RafaelSillva/Taskme/blob/main/client/public/Captura%20de%20tela%202024-11-12%20141318.png"/>
<image src="https://github.com/RafaelSillva/Taskme/blob/main/client/public/Captura%20de%20tela%202024-11-12%20141356.png"/>

📖 Aprendizados
Este projeto permitiu consolidar habilidades em:

Estruturação de uma aplicação com Next.js.
Uso de React Hooks para manipulação de estado e efeitos.
Estilização com Tailwind CSS para design responsivo.
Integração de uma aplicação Next.js com MongoDB para persistência de dados.

🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir issues para sugerir melhorias ou reportar problemas.

📝 Licença
Este projeto é licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.

Este `README.md` dá uma visão clara das funcionalidades, tecnologias, objetivo, instruções de instalação e outros detalhes essenciais para que outros desenvolvedores entendam e utilizem a aplicação TaskMe.

