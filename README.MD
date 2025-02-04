# E-Commerce Website

This is a simple e-commerce website built using HTML, CSS, and JavaScript. The website allows users to browse products, add items to the cart, add discounts and proceed to checkout. It can be run locally using the Live Server extension in VS Code.

## Features
- Responsive design for different screen sizes
- Product listing with images, descriptions, and prices
- Add to cart functionality
- Shopping cart with item quantity adjustment
- Product coupons

## Prerequisites
To run this project locally, ensure you have the following installed:
- [Visual Studio Code (VS Code)](https://code.visualstudio.com/)
- [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

## Installation & Setup
1. Clone this repository or download the ZIP file:
   ```sh
   git clone https://github.com/ZakDev1/ecommerce-website.git
   ```
2. Open the project folder in VS Code:
   ```sh
   cd ecommerce-site
   ```
3. Open the `index.html` file in VS Code.
4. Right-click anywhere in the editor and select **Open with Live Server** (or use the shortcut `Alt + L, Alt + O`).
5. The website should open in your default web browser.

## Project Structure
```
├── src/
│   ├── html/
│   │   ├── cart.js
│   │   ├── category.js
│   │   ├── index.js
│   │   ├── product.js
│   ├── css/
│   │   ├── cart.css
|   |   ├── category.css
|   |   ├── globals.css
|   |   ├── product.css
|   |   ├── style.css
│   ├── js/
│   │   ├── cart.js
│   │   ├── cartPageUtils.js
│   │   ├── categorySlug.js
│   │   ├── productSlug.js
│   │   ├── script.js
│   │   ├── temp.js
│   ├── imgs/
│   │   ├── (product images)
└── README.md
```

## Usage
- Browse through the available products.
- Click on a product to view details.
- Add items to the shopping cart.
- Adjust quantities or remove items in the cart.
- Proceed to checkout (static page, no backend processing).

## Technologies Used
- **HTML5**: Structure of the web pages
- **CSS3**: Styling and responsive design
- **JavaScript (Vanilla JS)**: Interactivity (cart management, product listing, etc.)

## License
This project is open-source and available under the MIT License.