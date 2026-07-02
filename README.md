# Event Manager (TypeScript + Vite)

A simple event management web application built with **TypeScript**, **HTML**, and **CSS**.  
It allows users to create, view, edit, and delete events in a clean two-page interface.

---

# 📌 Features

- View list of events
- Create new events
- Edit existing events
- Delete events
- Event status detection:
  - Past (red)
  - Today (green)
  - Future (blue)
- Sorted event list by date
- Empty state handling
- Clean modular TypeScript structure

---

# 🧱 Project Structure
```
EVENTS-APP/
│
├── node_modules/
├── public/
│
├── src/
│ ├── assets/
│ │
│ ├── data/
│ │ └── events-store.ts
│ │
│ ├── models/
│ │ └── event.ts
│ │
│ ├── pages/
│ │ ├── event-form.ts
│ │ └── events-page.ts
│ │
│ ├── styles/
| | ├── global.css
│ | ├── events.css
| | └── form.css
│ │
│ ├── utils/
│ │ └── date-utils.ts
│ │
│ └── main.ts
│
├── index.html
├── event.html
│
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
└── task.txt
```

---

# 🚀 How to Run the Project (Vite)

## 1. Install dependencies
```
bash
npm install
```
---

# 🚀 How to Run the Project (Vite)

## 1. Install dependencies
```
npm install
```
---

## 2. Start development server
```
npm run dev
```
---

## 3. Open in browser
After running, Vite will show something like:

http://localhost:5173

Open it in your browser.

---

## 4. Build for production (optional)
```
npm run build
```
---

## 5. Preview production build
```
npm run preview
```
---

# 📦 How to Download / Clone the Project

## Option 1 — Git clone
```
git clone https://github.com/your-username/event-manager.git
cd event-manager
npm install
npm run dev
```
---

## Option 2 — Download ZIP

1. Go to GitHub repo
2. Click Code
3. Download ZIP
4. Extract
5. Run:
```
npm install
npm run dev
```
---

# 🧠 Key Design Decisions

## No backend / no database
Data is stored in-memory using a TypeScript store module.

## Modular architecture
- models → types
- utils → helpers
- data → state/store
- pages → UI logic

## Two-page system
- index.html → list
- event.html → form

---

# 🎨 UI Behavior

- Red → Past events
- Green → Today
- Blue → Future
- Click card → edit event
- Add button → create event
- Delete button → remove event instantly

---

# ⚠️ Notes

- No persistence (refresh resets data)
- Must run using Vite (not file open)

---

# 🧑‍💻 Author

Frontend training project using:
- TypeScript
- Vite
- Vanilla JavaScript DOM manipulation