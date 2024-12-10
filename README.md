Here’s a comprehensive list of test cases for both **end-to-end (E2E)** and **component** tests to ensure the `ProductsPage` and `SingleProduct` components function correctly. This includes various scenarios and edge cases.

---

### **End-to-End (E2E) Test Cases**

#### **Products Page**

1. **Page Loads Correctly**

   - Verify that the `/products` route loads the products page.
   - Ensure the page title (`title` prop) is displayed.

2. **Displays Products**

   - Verify that the page displays a grid of products (up to `limit` items).
   - Confirm that each product shows its name, price, description, and image.

3. **Pagination Functionality**

   - Verify that clicking "Next" or "Previous" buttons updates the product list correctly.
   - Test navigating to the last and first pages directly using pagination controls.

4. **Product Details Navigation**

   - Click the "View Details" button for a product and verify that the user is navigated to `/products/{product.id}`.
   - Confirm the `product.id` is included in the new URL.

5. **Filters and Sorting**

   - Verify that the `search` and `sort` parameters correctly filter and order the products.
   - Test edge cases like searching for non-existent products.

6. **Error Handling**

   - Simulate an API failure and ensure the error message is displayed to the user.
   - Verify that invalid or missing query parameters don't crash the app.

7. **Empty State**

   - Test with no products in the API response to ensure a user-friendly "No Products Found" message is displayed.

8. **Loading State**
   - Verify that the "Loading..." indicator appears while the product data is being fetched.

---

### **Component Test Cases**

#### **`SingleProduct` Component**

1. **Renders Product Details**

   - Verify that the name, price, description, and image of the product are displayed correctly.

2. **Handles Missing Data Gracefully**

   - Test cases where the product image, name, or description is missing and verify that the component renders without crashing.
   - Provide fallback content for missing fields (e.g., "No Image Available").

3. **Navigation Button**

   - Verify that clicking the "View Details" button triggers navigation to the correct URL.

4. **Hover Effect**

   - Check the hover effects (e.g., shadow, button color) are applied correctly when hovering over the product card.

5. **Accessibility**

   - Test for proper `alt` text on the image and accessible labels for the button.

6. **Styling**
   - Ensure the component's layout adheres to the design (e.g., responsive behavior, margins, and padding).

#### **`ProductsPage` Component**

1. **Renders Title**

   - Verify that the page title matches the `title` prop.

2. **Fetches Data**

   - Verify that the `useGetProducts` hook is called with the correct parameters (`limit`, `page`, `sort`, `search`).

3. **Displays Products**

   - Ensure the page renders the correct number of `SingleProduct` components based on the `products` array.

4. **Handles Pagination**

   - Verify the `UpworkPagination` component receives the correct `currentPage` and `totalPages` props.
   - Test the `setPage` callback updates the page state correctly.

5. **Loading State**

   - Test that the "Loading..." text appears when `isLoading` is true.

6. **Error State**

   - Simulate an error from the `useGetProducts` hook and verify the error message is displayed.

7. **No Products State**

   - Test with an empty `products` array to ensure a proper "No Products Found" message.

8. **Responsive Layout**
   - Test the layout across various screen sizes (mobile, tablet, desktop) to ensure proper grid behavior.

---

### **Advanced Scenarios**

#### Products Page

1. **Performance**

   - Verify that the page doesn't re-fetch data unnecessarily when only the pagination changes.

2. **SEO & Meta Tags**

   - Ensure appropriate meta tags are set (e.g., `title`, `description`) for the page.

3. **Keyboard Navigation**

   - Test that users can navigate between pagination controls and product cards using only the keyboard.

4. **Dynamic Title**

   - If the `title` prop changes, verify that the displayed title updates dynamically.

5. **State Management**
   - Ensure React Query's cache is properly updated after a page or filter change.

#### SingleProduct

1. **Dynamic Content**
   - Test rendering different types of product data (long names, descriptions, large prices) and verify correct behavior.
2. **Localization**
   - Verify the component handles localization for currency and text fields.

---

### Suggested Tools for Testing

- **End-to-End Testing:** Cypress or Playwright.
- **Component Testing:** Jest with React Testing Library.
- **Accessibility Testing:** axe or Lighthouse.
- **Responsive Testing:** Browser dev tools or automated tools like BrowserStack.

### Additional Notes

Ensure your components have meaningful `data-testid` attributes where necessary to make test targeting easier and more reliable.
