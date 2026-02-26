# RVSP Text Reader

A professional-grade **Rapid Serial Visual Presentation (RSVP)** reader built with React, TypeScript, and GSAP. This application allows users to read text significantly faster than traditional methods by flashing words one by one at a fixed focal point.

## ✨ Features

- 🏎️ **Adjustable Speed**: Control the reading pace from 50 to 1000 Words Per Minute (WPM).
- 🎯 **ORP Highlighting**: Automatically calculates and highlights the **Optimal Recognition Point** for every word to minimize eye movement.
- ⏱️ **3-2-1 Countdown**: A smooth entry animation and countdown to help you focus before reading starts.
- 🌎 **Multilingual**: Full support for English and Spanish via `react-i18next`.
- ⏪ **Smart Rewind**: Instantly jump back 5 seconds in the text if you miss something.
- 📱 **Clean UI**: Minimalist dark theme designed for maximum focus and zero distractions.
- ⚡ **GSAP Powered**: Silky smooth transitions and UI animations.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:masaroli/rvsp-reader.git
   cd rsvp-reader
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript (with strict type-aware linting)
- **Animation**: GSAP (GreenSock Animation Platform)
- **Styling**: CSS Modules
- **I18n**: i18next & react-i18next

## 📖 How it Works

RSVP reading works by centering words on the screen and highlighting the **Optimal Recognition Point (ORP)**—usually the 2nd or 3rd letter. This allows your brain to process the word instantly without the need for your eyes to "scan" from left to right, effectively increasing reading speed while maintaining comprehension.

---

Built with ❤️ for focused reading.
