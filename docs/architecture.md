# System Architecture

## Overview

This application is built using Next.js 14+ with the App Router, providing a modern and efficient way to build server-rendered React applications.

## Component Hierarchy

- **App Directory**: Organized by feature.
  - `app/(route)/page.tsx`: Feature-specific pages.
  - `app/api/(resource)/route.ts`: API routes for handling HTTP requests.

- **Shared Components**
  - Located in `src/components/`
  - Reusable components across different features.

- **Shared Utilities**
  - Located in `src/lib/`
  - Utility functions and helpers used throughout the application.

- **Types**
  - Located in `src/types/`
  - TypeScript type definitions for better type safety.

## API Design

API routes are defined using Next.js Route Handlers located in `app/api/(resource)/route.ts`. Each route handler can handle different HTTP methods (GET, POST, PUT, DELETE) and return appropriate responses.
