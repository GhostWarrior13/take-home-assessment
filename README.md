# Product Inventory Dashboard

A responsive, high-performance product management interface built with **React (Next.js 16)**, **TypeScript**, and **Tailwind CSS**. This dashboard provides a full CRUD-like experience using browser storage for data persistence.

## 🚀 Features

### 1. List Page (`ProductTable.tsx`)

- **Live Search:** Instant text filtering across product titles using a performant filtering pipeline.
- **Advanced Filtering:** Filter by product status (Available/Sold Out) via a custom dropdown.
- **Dynamic Sorting:** Toggle sorting by **Price** or **Product Name** (Ascending/Descending). The sorting engine handles both string comparisons and numerical logic.
- **Empty State:** Clear, italicized feedback when no items match search or filter criteria.
- **Delete Functionality:** Product deletion with window confirmation and LocalStorage synchronization.

### 2. Detail & Edit View (`ProductDetailsModal.tsx`)

- **Modal Integration:** Decided to use modal instead of routes.
- **Live Editing:** Real-time form state management. Users can edit Brand, Price, Category, and more.
- **Data Persistence:** Integrated with `localStorage`. Edits are saved across the entire product array, ensuring data is not lost on page refresh.
- **Data Richness:** Displays comprehensive specifications including warranty and stock levels.

### 3. Inventory Expansion (`NewProductModal.tsx`)

- **Product Creation:** A dedicated interface to add new items to the inventory.
- **Automatic Sync:** New items are immediately injected into the table view and persisted to the local database.

## 📁 Project Structure & Components

Based on the project architecture:

- **`app/page.tsx`**: The main entry point. Orchestrates the state between the table and the various modals.
- **`components/ProductTable.tsx`**: The heavy-lifter. Contains the filtering/sorting logic and renders the primary data grid.
- **`components/ProductDetailsModal.tsx`**: Vire product details and manages the "Edit" state. Uses a local `formData` buffer to allow users to discard changes before saving.
- **`components/NewProductModal.tsx`**: Handles the logic for creating and validating new inventory entries.
- **`data/productData.ts`**: The central data hub. Contains the TypeScript `interface Product` definitions and the initial mock dataset (30+ products).

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS (Utility-first CSS)
- **Icons:** Lucide React
- **Typing:** TypeScript
- **Storage:** Browser LocalStorage API for persistence

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  **Build for production:**
    ```bash
    npm run build
    ```
