<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="[https://github.com/BrunoCarvalhoFeitosa/ecommerce-store](https://github.com/BrunoCarvalhoFeitosa/barber)">
    <img src="\public\favicon\favicon.ico" alt="Logo" width="48" weight="48" />
  </a>

  <p align="center">
    App desenvolvido em Next.js, Typescript, Prisma, PostgreSQL, TailwindCSS e ShadcnUI para reserva de horários em uma barbearia. A aplicação possui sistema de login autenticado com o Google, para isso foi utilizada a biblioteca next-auth, através desta autenticação é possível reservar horários para diversos tipos de serviços que a barbearia oferece, como por exemplo, corte de cabelo, barba, sobrancelha, pezinho, massagem e hidratação. Todas as reservas são salvas e podem tanto ser visualizadas quando podem ser canceladas.
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#feito-com">Feito com</a></li>
        <li><a href="#hospedagem">Hospedagem</a></li>
      </ul>
    </li>
    <li>
      <a href="#iniciando-o-projeto">Iniciando o projeto</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#license">Licenças</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Sobre o projeto

### Desktop
A aplicação é totalmente responsiva, adapta-se a diferentes tamanhos de telas, além de ser segura, já que possui autenticação com o Google. Além disso, foram feitas validações acerca das reservas, onde um usuário não logado não poderá reservar qualquer tipo de serviço, as reservas já ultrapassadas das datas ainda são exibidas como uma maneira do usuário ver o histórico geral, estas reservas não possuem nenhuma interação, ou seja, o usuário não poderá remove-las e nem ter nenhum tipo de ação. Além disso, a aplicação possui um sistema de busca de barbearias, através do react-hook-form e do zod as buscas são validadas e são disparadas no banco de dados com base no que o usuário digitou, caso não haja nenhum resultado retornado, na interface uma mensagem é exibida e caso haja retorno de resultados, eles são exibidos e possuem interação, o usuário poderá clicar no card e ir diretamente para a página da barbearia para reservar um horário para qualquer serviço, lembrando que uma vez um horário selecionado, ele é removido para que outros usuários não selecionem o mesmo horário.

https://github.com/BrunoCarvalhoFeitosa/barber/assets/46093815/fc57d7d3-9c8b-4e6a-aff8-a4d93b73d4cb

### Mobile

https://github.com/BrunoCarvalhoFeitosa/barber/assets/46093815/c0605294-b4bd-461f-9cdb-447fcae7e775

### Feito com

* [Next.js](https://nextjs.org)
* [Typescript](https://www.typescriptlang.org)
* [Prisma](https://www.prisma.io)
* [PostgreSQL](https://www.postgresql.org)
* [TailwindCSS](https://tailwindcss.com)
* [ShadcnUI](https://ui.shadcn.com)
* [Vercel](https://vercel.com)

### Hospedagem

A aplicação está em produção neste link: (https://bruno-carvalho-feitosa-barber.vercel.app).

<!-- GETTING STARTED -->
## Iniciando o projeto

Primeiramente será necessário clonar este projeto em (https://github.com/BrunoCarvalhoFeitosa/barber.git), após o download será necessário abrir este projeto no seu editor e no terminal digitar npm install ou yarn, posteriormente é só rodar em seu terminal o comando npm run dev ou yarn dev, após isso, a página será aberta em seu navegador. Será necessário configurar em um arquivo .env as variáveis: DATABASE_URL_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXT_AUTH_SECRET.

### Pré-requisitos

* npm
  ```sh
  npm install npm@latest -g
  ```

### Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/BrunoCarvalhoFeitosa/barber.git
   ```
2. Instale os pacotes do NPM
   ```sh
   npm install ou yarn
   ```
   
3. Inicie o projeto
   ```sh
   npm run dev ou yarn dev
   ```   

<!-- LICENSE -->
## License

Distribuído sob a licença MIT.

<!-- CONTACT -->
## Contato

Bruno Carvalho Feitosa - [GitHub](https://github.com/BrunoCarvalhoFeitosa) - [LinkedIn](https://www.linkedin.com/in/bruno-carvalho-feitosa/)
