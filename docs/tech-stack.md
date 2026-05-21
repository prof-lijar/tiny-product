# Tech Stack

## Core Technologies

- **Next.js**: A React framework that enables server-rendered React applications for better performance and SEO.
- **TypeScript**: Adds static types to JavaScript, enhancing code quality and maintainability.
- **Tailwind CSS**: Utility-first CSS framework for building custom designs without leaving your HTML.
- **React Components**: Server components by default, client components only when necessary.

## Development Tools

- **ESLint**: Linting tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the ability to automatically fix problems.
- **PostCSS**: A tool for transforming styles with JavaScript plugins. Used along with Tailwind CSS for processing tailwind directives.

## Project Structure

```
src/
├── app/
│   ├── (route)/
│   │   └── page.tsx
│   ├── api/
│   │   └── (resource)/
│   │       └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
├── components/
├── lib/
└── types/

public/
├── file.svg
├── globe.svg
├── next.svg
├── vercel.svg
└── window.svg

```

## Version Control

- **Git**: Used for version control and collaboration.
- **GitHub**: Hosting repository and managing pull requests.

## Deployment

- **Vercel**: Continuous deployment platform for Next.js applications, providing seamless integration with GitHub for automatic deployments on push to the main branch.
