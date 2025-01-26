# Product Selling Platform

This project is a platform for users to sell products and for admins to manage product sales. Users can create products to sell, view their sales history, place bids, leave comments, and interact with admins for approval. Admins can manage access, approve, or reject products that users want to sell.

## Key Features

### User Side
- **Create Products**: Users can create new products to sell on the platform by providing product details such as name, description, price, and category.
- **View Sales History**: Users can track the products they’ve sold and review their sales history on their profile.
- **Product Filtering**: Products listed on the landing page can be filtered by input (e.g., search keywords) or by their category, allowing users to easily find items that match their interests.
- **View Product Details**: Users can click on individual products to view detailed information, including description, price, images, and seller information.
- **Leave Comments & Bids**: Users can place bids on products they are interested in and leave comments for the seller. Other users can view these bids and comments to make informed decisions.
- **Bidding System**: Users can bid on items, and their bids will be visible to other users who can also place bids. The highest bid may be used as a reference for negotiations between users and sellers.

### Admin Side

- **Manage Product Listings**: Admins can review products submitted by users and give them access to sell on the platform.
- **Approve or Reject Listings**: Admins can approve or reject user-submitted products for selling based on set criteria.
- **Manage User Status**: Admins can set user accounts to active or banned, based on their activity or behavior.
- **Admin Dashboard**: Admins have access to a dashboard where they can:
  - **View Product Stats**: See a summary of all products submitted, including approved, rejected, and pending products.
  - **Track Pending Product Counts**: Check how many products are awaiting approval or rejection.
  - **Data Visualization**: The dashboard includes charts for visualizing product submissions, user activity, and product approval statistics, making it easier for admins to track trends and performance.

## Landing Page
- **Product Display**: The homepage features a clean layout where products are showcased for users to browse.
- **Product Filtering**: Users can filter products by input (search bar) or by selecting specific categories to narrow down the displayed products, making it easier to find items of interest.

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server for modern web projects.
- **TailwindCSS**: A utility-first CSS framework for styling components.
- **Ant Design**: A UI component library with ready-to-use components and icons.
- **Redux & Redux Toolkit**: A state management library for JavaScript apps, along with Redux Toolkit for easy state management.
- **React Router DOM**: A library for routing in React applications.
- **Axios**: A promise-based HTTP client for making requests to the backend.

### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: A minimal and flexible Node.js web application framework for building APIs.
- **MongoDB**: A NoSQL database for storing user and product data.
- **JWT-based Authentication**: This platform uses JSON Web Tokens (JWT) for secure authentication of users. 
  - JWT ensures that only authorized users can access protected resources.
  - The user receives a token upon successful login, which is used for authenticating API requests.
  - The token is stored securely in the user's browser and included in requests to verify the user's identity.

## Installation

### Prerequisites
- Node.js (v14 or above)
- MongoDB instance running locally or remotely

### Installation Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/product-selling-platform.git
    ```

2. Navigate to the project directory:
    ```bash
    cd product-selling-platform
    ```

3. Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```

4. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

5. Configure environment variables for both frontend and backend as described below.

6. Run the development servers:
    - For the frontend:
      ```bash
      cd frontend
      npm run dev
      ```
    - For the backend:
      ```bash
      cd backend
      npm start
      ```

### Environment Variables
Make sure to set the following environment variables in your `.env` files:

#### Frontend:
- `REACT_APP_API_URL`: URL of your backend API.

#### Backend:
- `MONGO_URI`: Connection string to your MongoDB database.
- `JWT_SECRET`: A secret key used for JWT authentication.
- `PORT`: The port on which the backend server will run (default: 5000).

## Contributing
If you'd like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- Thanks to the open-source community for libraries and tools that made this project possible.
