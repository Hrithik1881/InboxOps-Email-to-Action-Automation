# InboxOps Desktop Client (`apps/desktop`)

The desktop application for InboxOps, built with **Electron**, **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

## Architectural Responsibilities
- **Secure Process Isolation**:
  - `main`: Manages native OS window lifecycles, auto-updates, and strictly controlled IPC communication.
  - `preload`: Context isolation enabled (`contextIsolation: true`), Node integration disabled (`nodeIntegration: false`). Exposes only minimal, validated IPC bridges to the renderer.
  - `renderer`: Standard React UI. Never holds direct access to system secrets, raw filesystem tokens, or backend database credentials.
- **Client Capabilities**:
  - Overview Dashboard (KPI cards, action lists, overdue indicators, sync health).
  - Review Queue (split-pane AI proposal verification with side-by-side original email evidence).
  - Case & Task Management (full audit timeline, assignment, status transitions, SLA countdowns).
  - Accessibility-first (WCAG 2.1 AA compliant, visible focus states, full keyboard navigation).

## Tech Stack
- **Framework**: Electron + React 18+
- **Bundler**: Vite
- **Styling**: Tailwind CSS + Headless UI / Radix primitives
- **State Management**: TanStack Query (React Query) + Zustand
