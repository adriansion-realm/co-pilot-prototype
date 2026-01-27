# Co-Pilot - Project Management Board

A Next.js application implementing a task and project management board based on the Figma design.

## Features

- **Task Board with 4 Columns**: Overdue, Today, Later, and No tasks
- **Task Cards** with:
  - Project title
  - Date indicators
  - Price information
  - Time elapsed tracking
  - Issue/warning indicators
  - Favorite/heart markers
  - Settings/tools access
- **Responsive Design** using Tailwind CSS
- **Interactive UI** with hover effects

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
co-pilot/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page with sidebar
│   └── globals.css     # Global styles with Tailwind
├── components/
│   ├── TaskBoard.tsx   # Main board component with data
│   ├── TaskColumn.tsx  # Column component
│   └── TaskCard.tsx    # Individual task card
└── package.json
```

## Build

To create a production build:
```bash
npm run build
npm start
```
