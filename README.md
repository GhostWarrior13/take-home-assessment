# Product Inventory Dashboard

A responsive, high-performance product management interface built with **React (NextJS)**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Features

### 1. List Page

- **Live Search:** Instant text filtering across product titles.
- **Advanced Filtering:** Filter by product status (Available/Sold Out) and Category.
- **Dynamic Sorting:** Toggle sorting by price, name, or rating.
- **UI States:**
  - **Loading State:** Simulated fetch delay for realistic UX.
  - **Error Handling:** Robust error state rendering and recovery.
  - **Empty State:** Clear feedback when no items match search criteria.

### 2. Detail View

- **Modal Integration:** Non-intrusive detail overlay triggered by row selection.
- **Data Richness:** Displays comprehensive specifications including brand, category, rating, warranty, and stock levels.
- **Accessibility:** Responsive layout with backdrop blur and escape-to-close functionality.

### 3. Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Typing:** TypeScript (Strict Mode)

## 🛠️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone [repository-url]
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `/components`: UI components (Table, Modal, Filters).
- `/data`: Mock data store containing 30+ product objects.
- `/types`: TypeScript interfaces for unified data structures.
- `/app`: Application routes and global styles.
