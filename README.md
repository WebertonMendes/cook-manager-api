# Cook Manager API

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/WebertonMendes/cook-manager-api/development/docs/images/logo_dark.png" />
  <img src="https://raw.githubusercontent.com/WebertonMendes/cook-manager-api/development/docs/images/logo.png" width="100" alt="Cook Manager Logo" />
</picture>

<br/>

> API (Backend) da aplicação de gerenciamento de bares e restaurantes.

![App Version_PROD](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/WebertonMendes/cook-manager-api/main/package.json&query=version&style=for-the-badge&logo=nestjs&label=VERSION_PROD&color=157a8c)
![GitHub main commits](https://img.shields.io/github/commit-activity/t/WebertonMendes/cook-manager-api/main?style=for-the-badge&color=157a8c)
![App last commit](https://img.shields.io/github/last-commit/WebertonMendes/cook-manager-api/development?style=for-the-badge&color=157a8c)

![App Version_DEV](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/WebertonMendes/cook-manager-api/development/package.json&query=version&style=for-the-badge&logo=nestjs&label=VERSION_DEV&color=157a8c)
![App License](https://img.shields.io/github/license/WebertonMendes/cook-manager-api?style=for-the-badge&color=157a8c)
![App codecov](https://img.shields.io/codecov/c/github/WebertonMendes/cook-manager-api?style=for-the-badge&logo=codecov)

## ☕ Sobre o projeto

Descrição: A API do "Cook Manager", é responsável por prover a parte de backend da aplicação, algumas de suas responsabilidades são por exemplo:

- regras de negócio
- validações
- integração com database
- salvar, listar, atualizar e remover dados
- entre outros...

O projeto utiliza o padrão "API-RESTful", um conjunto de definições e protocolos usados no desenvolvimento e na integração de aplicações, e todos os endpoints estão disponíveis em vários formatos, você pode ver mais detalhes [aqui](docs/README.md).
<br/>

Linguagens/Ferramentas/Tecnologias utilizadas:

<table>
  <tr>
    <td style="border-bottom-style: hidden;">
      <img  align="center" alt="Javascript" width="18" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg"> Javascript
    </td>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="Typescript" width="18" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg"> Typescript
    </td>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="NodeJS" width="20" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"> NodeJS
    </td>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="NestJS" width="20" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-plain.svg"> NestJS
    </td>
  </tr>
  <tr>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="Vitest" width="22" src="https://avatars.githubusercontent.com/u/95747107"> Vitest
    </td>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="Prisma" width="20" src="https://avatars.githubusercontent.com/u/17219288"> Prisma
    </td>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="PostgreSQL" width="20" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-plain.svg"> PostgreSQL
    </td>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="Docker" width="24" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg"> Docker
    </td>
  </tr>
  <tr>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="Swagger" width="20" src="https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png"> Swagger
    </td>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="Insomnia" width="20" src="https://raw.githubusercontent.com/Kong/insomnia/develop/packages/insomnia/src/icons/icon.ico"> Insomnia
    </td>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="ApiDog" width="18" src="https://pbs.twimg.com/profile_images/1566674124629352448/HhHsOn-V_400x400.jpg"> ApiDog
    </td>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="REST Client" width="20" src="https://raw.githubusercontent.com/Huachao/vscode-restclient/master/images/rest_icon.png"> REST Client
    </td>
  </tr>
  <tr>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="Yarn" width="20" src="https://raw.githubusercontent.com/devicons/devicon/55609aa5bd817ff167afce0d965585c92040787a/icons/yarn/yarn-original.svg"> Yarn
    </td>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="ESLint" width="20" src="https://raw.githubusercontent.com/devicons/devicon/55609aa5bd817ff167afce0d965585c92040787a/icons/eslint/eslint-original.svg"> ESLint
    </td>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="VSCode" width="20" src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png"> VSCode
    </td>
    <td style="border-bottom-style: hidden;">
      <img align="center" alt="CodeCov" width="20" src="https://raw.githubusercontent.com/devicons/devicon/55609aa5bd817ff167afce0d965585c92040787a/icons/codecov/codecov-plain.svg"> CodeCov
    </td>
  </tr>
</table>

<br/>

## 💻 Pré-requisitos

Antes de começar:

- verifique se você possui o [Git](https://git-scm.com/downloads) instalado em sua máquina;
- verifique se você possui o [Docker](https://docs.docker.com/get-docker/) instalado em sua máquina;
- faça o clone do projeto em sua máquina: `git@github.com:WebertonMendes/cook-manager-api.git`

<br/>

## 🚀 Instalando e inciando a API do `Cook-Manager`

Para instalar e iniciar o projeto `cook-manager-api` na sua máquina, siga estas etapas:

**1° Paso:** Definir as variáveis de ambiente da aplicação

- duplicar o arquivo "template.env" na raiz do projeto
- renomear o arquivo para ".env"
- preencher as variáveis de ambiente no arquivo

<br/>

**2° Paso:** Iniciar os containers (App/Database)

```
docker-compose up -d
```

<br/>

**3° Paso:** Acessar a URL da documentação dos endpoints da aplicação

```
http://localhost:3333/api/docs
```

<br/>

## 🤝 Colaboradores

Atualmente às seguintes pessoas contribuem para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/WebertonMendes" title="Wéberton Mendes" target="_blank">
        <img src="https://avatars3.githubusercontent.com/u/61299096" alt="Foto do Weberton Mendes no GitHub" width="60px;" style="border-radius:50%"/>
      </a>
      <br/>
      <sub>Wéberton Mendes</sub>
    </td>
  </tr>
</table>

<br/>

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e você pode acompanhar a evolução de forma detalhada pelo [CHANGELOG](CHANGELOG.md).

<br/>

## 📝 Licença

Esse projeto está sob licença MIT. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.
