# Chat App

Chat App is a real-time messaging application that allows users to communicate seamlessly. It's built with Express, MongoDB, Socket.io, JWT, and ReactJS.

## Project Structure

- **api:** Backend server using Express, MongoDB, and Socket.io.
- **client:** Frontend built with ReactJS using Vite as the build tool.

## Backend Setup

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the API directory:

    ```bash
    cd api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the `api` directory and configure:

    ```env
    PORT=3001
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-secret-key>
    ```

5. Start the API server:

    ```bash
    node index
    ```

## Frontend Setup

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```


4. Start the Vite development server:

    ```bash
    npm run dev
    ```

## Usage

- Visit the frontend URL (usually http://localhost:5173) to access the Chat App.
- Interact with the real-time messaging features and enjoy!

Feel free to explore and customize the application according to your needs!
