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

### Customizable Dashboards API

To support user-personalized dashboards, the following API endpoints are defined:

- `GET /api/dashboard/config`: Fetches the dashboard layout configuration for the authenticated user.
- `POST /api/dashboard/config`: Saves the dashboard layout configuration for the authenticated user.

**Request/Response Body:**
```json
{
  "widgets": [
    {
      "id": "string", // Unique identifier for the widget (e.g., 'lead-time-metric')
      "x": "number",  // Grid X position
      "y": "number",  // Grid Y position
      "w": "number",  // Width in grid units
      "h": "number",  // Height in grid units
      "isEnabled": "boolean"
    }
  ]
}
```

## Data Storage

### Dashboard Configurations

User dashboard configurations are stored in a separate data file `data/dashboard_configs.json` to keep the `users.json` file lightweight.

**Storage Schema:**
```json
{
  "configs": [
    {
      "userId": "string",
      "widgets": [ ... ],
      "updatedAt": "ISO-8601 timestamp"
    }
  ]
}
```

## Frontend Implementation Guidance

### Customizable Dashboard UI

- **Layout Engine**: Use a grid-based layout system (e.g., `react-grid-layout`) to allow users to drag, drop, and resize widgets.
- **Edit Mode**: Implement an "Edit Mode" toggle. When active:
  - Widgets become draggable and resizable.
  - A "Save Layout" button appears.
  - A "Cancel" button appears to revert unsaved changes.
- **Widget Registry**: Maintain a registry of available widgets that can be toggled on/off from a configuration menu.
- **Persistence**: On "Save", the current layout state is sent to `POST /api/dashboard/config`.
