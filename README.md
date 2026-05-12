# RPStories
### High-End Immersive Character Archive for Roleplay Communities

[![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=flat-square&logo=vuedotjs&logoColor=%234FC08D)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

**RPStories** is a lightweight, high-performance web application designed to host and showcase immersive character dossiers for roleplay environments (FiveM, RedM, etc.). Unlike traditional technical sheets, RPStories focuses on atmosphere, visual identity, and storytelling through a refined, game-inspired interface.

## 🚀 Key Features

- **Ambient Glow Engine**: A dynamic UI system that synchronizes the background atmosphere with the character's visual identity.
- **Status-Aware Theming**: Distinct visual processing for active vs. deceased characters (grain effects, grayscale filters, and specific UI badges).
- **Modular Architecture**: Built with **Vue 3** and **Vite**, featuring a clean separation between core logic, UI components, and character data.
- **Responsive & Performance-First**: Optimized for all viewports with a focus on fluid transitions and minimal load times.

## 🛠️ Tech Stack

- **Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4 + Custom CSS Variables
- **State Management**: Global Reactive Store (Modular)

## 📦 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Elmasunder/rpstories.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## 📖 Adding Characters

To expand the archive, simply update the centralized data store:

1. Navigate to `src/data/characters.js`.
2. Append a new character object following the established schema.
3. Assets should be placed in `public/assets/your_character_id/`.
4. The engine will automatically handle color generation, routing, and rendering.

---

## ⭐ Support

If you find this project useful or inspiring, please consider giving it a **star** on GitHub!

**Developed by [Elma Sunder](https://github.com/Elmasunder)**
