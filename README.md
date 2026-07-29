# NIST CSF 2.0 Navigator

> Ferramenta visual e interativa para explorar o NIST Cybersecurity Framework 2.0

[![Deploy to GitHub Pages](https://github.com/felipenicacio/nist-csf-navigator/actions/workflows/deploy.yml/badge.svg)](https://github.com/felipenicacio/nist-csf-navigator/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Acesse online:** https://felipenicacio.github.io/nist-csf-navigator

---

## Sobre o Projeto

O **NIST CSF 2.0 Navigator** é uma aplicação web open source que transforma o NIST Cybersecurity Framework 2.0 em uma experiência visual, interativa e acessível. Facilita a compreensão, implementação e exploração das relações com outros frameworks de segurança, risco e continuidade.

## Funcionalidades

- Navegação visual pelas 6 Functions, 17 Categories e 106 Subcategories
- Conteúdo aprofundado: descrição, orientações práticas, perguntas orientativas, evidências típicas
- Framework Crosswalk com NIST SP 800-53, ISO/IEC 27002 e CIS Controls
- 22+ frameworks relacionados documentados
- Guia de implementação (Current Profile → Target Profile)
- CSF Tiers com exemplos práticos
- Organizational Profiles
- Glossário com termos fundamentais
- Busca por qualquer elemento
- Design responsivo
- Conteúdo em português do Brasil

## Como Executar Localmente

Pré-requisitos: Node.js 18+

```bash
git clone https://github.com/felipenicacio/nist-csf-navigator.git
cd nist-csf-navigator
npm install
npm run dev
```

Acesse http://localhost:5173/nist-csf-navigator/

Build: `npm run build`

## Tecnologias

React 18 · TypeScript · Vite · Tailwind CSS v3 · React Router · Lucide Icons

## Aviso Legal

O NIST CSF 2.0 é desenvolvido pelo NIST. Este Navigator é uma ferramenta educacional independente, não substitui o documento oficial do framework e não é endossado pelo NIST.

## Licença

MIT License — veja [LICENSE](LICENSE)
