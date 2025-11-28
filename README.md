# Edjus UI

A Next.js application for edjus.ca website.

## Getting Started

First, install the dependencies:

```bash
yarn install
```

Husky will be automatically set up when you run `yarn install` (via the `prepare` script).

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Git Hooks (Husky)

This project uses [Husky](https://typicode.github.io/husky/) for Git hooks:

- **pre-commit**: Runs `yarn lint` before each commit to ensure code quality
- **pre-push**: Runs `yarn build` before pushing to ensure the project builds successfully

If you need to manually set up Husky after cloning:

```bash
yarn husky install
```

## Features

- Header with logo and navigation menu
- Routing for Home, About Us, and Contact Us pages
- Responsive design
- Modern UI with clean styling

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with header
│   ├── page.tsx            # Home page
│   ├── about-us/
│   │   └── page.tsx        # About Us page
│   ├── contact-us/
│   │   └── page.tsx        # Contact Us page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Header component
│   └── Header.module.css   # Header styles
└── package.json
```

