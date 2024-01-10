# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato deste arquivo é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), e o projeto segue o [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
<br /><br />

## [1.3.0] - UNRELEASED

### Added

- Criação dos endpoints para gerenciamento de `PEDIDOS`:
  - CREATE >> [POST] "/orders"
  - LIST >> [GET] "/orders"
  - FIND >> [GET] "/orders/:id"
  - UPDATE >> [PATCH] "/orders/:id"

## [1.2.0] - 2024-01-09

### Added

- Criação dos endpoints para gerenciamento de `PRODUTOS`:
  - CREATE >> [POST] "/products"
  - LIST >> [GET] "/products"
  - FIND >> [GET] "/products/:id"
  - UPDATE >> [PATCH] "/products/:id"
  - DELETE >> [DELETE] "/products/:id"

## [1.1.0] - 2023-12-29

### Added

- Criação do Workflow CI/CD com Github Actions:

  - Add testes unitários
  - Add testes end-to-end

- Criação dos endpoints para gerenciamento de `CATEGORIAS`:
  - CREATE >> [POST] "/categories"
  - LIST >> [GET] "/categories"
  - FIND >> [GET] "/categories/:id"
  - UPDATE >> [PATCH] "/categories/:id"
  - DELETE >> [DELETE] "/categories/:id"

## [1.0.0] - 2023-12-24

### Added

- Criação dos endpoints para gerenciamento de `USUÁRIOS`:
  - CREATE >> [POST] "/users"
  - LIST >> [GET] "/users"
  - FIND >> [GET] "/users/:id"
  - UPDATE >> [PATCH] "/users/:id"
  - DELETE >> [DELETE] "/users/:id"
