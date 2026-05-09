# 🫰 The Inevitable Portfolio | Mayank Upadhyay

An immersive, highly interactive personal portfolio built with **React 19** and **Framer Motion**. This project pushes the boundaries of scroll-linked animations, featuring cinematic transitions and a premium dark-mode aesthetic.

✨ **Live Demo**: [mayank-upadhyay-portfolio.vercel.app](https://mayank-upadhyay-portfolio.vercel.app/)

---

## 🎬 Cinematic Features

### 🌌 1. The "Snap" Entrance
The journey begins with a Thanos-inspired Gauntlet interaction. Using **AnimatePresence** and **sessionStorage**, the site features a custom "dust vanish" animation and localized audio effects to transport users from the landing page to the main portfolio.

### 🎡 2. The Rotating Contact Wheel
A custom-engineered 360° rotating social hub. 
- **Scroll-Linked**: The entire wheel rotates based on scroll progress.
- **Counter-Rotation**: Social icons maintain a perfectly upright position while the wheel spins, ensuring readability and interactivity.
- **Collision-Free**: Buttons are anchored using absolute coordinate translation for precise hit-detection.

### ✈️ 3. Gliding Resume Animation
Experience a unique way to view professional history. A paper plane glides into the viewport as you scroll, landing to trigger a full-screen, interactive PDF viewer portal.

### 🚅 4. Interactive Storytelling
- **Skill Train**: A dynamic horizontally-animated skill section.
- **Experience Tree**: A branching narrative of professional and DSA milestones.
- **Glassmorphism**: A curated deep-navy and orange-neon color palette for a premium feel.

---

## 🛠️ Technical Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Animations**: 
  - [Framer Motion](https://www.framer.com/motion/) (useScroll, useTransform, AnimatePresence)
  - [Anime.js](https://animejs.com/)
- **Styling**: Tailwind CSS & Vanilla CSS (Custom Design System)
- **Icons**: HeroIcons & Custom SVGs
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mayankupadhyay-1260/final_portfolio.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
src/
├── assets/             # Images, PDFs, and Audio (Snap sound)
├── Components/         # Modular animation components
│   ├── Intropage.jsx   # Thanos Snap logic
│   ├── SkillAnimation.jsx
│   ├── ResumeAnimation.jsx
│   └── ContactAnimation.jsx # Rotating wheel logic
├── App.jsx             # Main router/wrapper
└── main.jsx            # Entry point
```

---

## 🔧 Production Optimizations

This project includes specific configurations for high performance on Vercel:
- **SPA Routing**: `vercel.json` rewrite rules to prevent 404s on page refresh.
- **Asset Management**: Optimized static asset resolution for production builds.
- **Lazy Loading**: Code-splitting for heavy animation components to ensure fast initial load times.

---

## 🤝 Contact

**Mayank Upadhyay**  
Software Engineer  
📩 [Email Me](mailto:mayankupadhyay2004@gmail.com) | 💼 [LinkedIn](https://www.linkedin.com/in/mayank-upadhyay-969731258/) | 🐦 [X (Twitter)](https://x.com/u_mayank1260)
