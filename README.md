# Blog Post RESTful API

A RESTful API built with Node.js, Express, TypeScript, and PostgreSQL for managing blog posts.

## Tech Stack
*   **Runtime:** Node.js
*   **Language:** TypeScript
*   **Framework:** Express.js
*   **Database:** PostgreSQL
*   **ORM:** Sequelize
*   **Validation:** Zod

## Setup Instructions

### Prerequisites
1.  [Node.js](https://nodejs.org/) installed on your machine.
2.  [PostgreSQL](https://www.postgresql.org/) installed and running locally.

### Installation
1.  Clone the repository and navigate to the root folder.
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Environment Configuration
1.  Create a `.env` file in the root directory and update the credentials according to your local PostgreSQL setup.
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=your_postgres_password
    DB_NAME=blog_db
    ```

### Database Setup
1.  Open your PostgreSQL terminal (`psql`) or a GUI client like pgAdmin.
2.  Create a blank database matching your `.env` configuration:
    ```sql
    CREATE DATABASE blog_db;
    ```
3.  *Note:* You do not need to run manual migration scripts. The application uses Sequelize's `sync({ alter: true })` feature in the development environment to automatically generate the `posts` table upon starting the server.

### Running the Application
Start the development server using npm:
```bash
npm run dev
```
The server should now be running at http://localhost:3000.

## API Endpoints

### Summary

| Methods | Urls | Description |
| :--- | :--- | :--- |
| **GET** | `/posts` | Retrieve a list of all blog posts (with pagination) |
| **GET** | `/posts/:id` | Retrieve a single blog post by its ID |
| **POST** | `/posts` | Create a new blog post |
| **PUT** | `/posts/:id` | Update an existing blog post by its ID |
| **DELETE** | `/posts/:id` | Delete a blog post by its ID |

---

### 1. Get All Posts
Retrieves a list of blog posts with pagination support.
- **URL:** `/posts`
- **Method:** `GET`
- **Query Parameters (Optional):**
  - `page` (integer): Page number to retrieve (Default: 1). Must be a positive number.
  - `limit` (integer): Number of posts per page (Default: 10). Must be a positive number.
- **Example Request:**
```bash
curl -X GET "http://localhost:3000/posts?page=1&limit=5"
```
- **Success Response (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "Post Pertama",
      "content": "Ini adalah post pertama.",
      "created_at": "2026-09-05T10:00:00.000Z",
      "updated_at": "2026-09-05T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 5,
    "totalPages": 1
  }
}
```

### 2. Get Single Post
Retrieve a specific blog post by its ID.
- **URL:** `/posts/:id`
- **Method:** `GET`
- **Path Parameters:** `id` (integer, required): The unique identifier of the post.
- **Example Request:**
```bash
curl -X GET http://localhost:3000/posts/1
```
- **Success Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "Post Pertama",
    "content": "Ini adalah post pertama.",
    "created_at": "2026-09-05T10:00:00.000Z",
    "updated_at": "2026-09-05T10:00:00.000Z"
  }
}
```

### 3. Create a Post
Create a new blog post.
- **URL:** `/posts`
- **Method:** `POST`
- **Body (JSON):**
  - `title` (string, required): The title of the post (Max 255 characters). Cannot be empty.- `content` (string, required): The main content of the post. Cannot be empty.
- **Example Request:**
```bash
curl -X POST http://localhost:3000/posts \
-H "Content-Type: application/json" \
-d '{
  "title": "My New Post",
  "content": "This is the content of the new post."
}'
```
- **Success Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "id": 2,
    "title": "Post Kedua",
    "content": "Ini adalah post kedua.",
    "created_at": "2026-09-05T11:00:00.000Z",
    "updated_at": "2026-09-05T11:00:00.000Z"
  }
}
```

### 4. Update a Post
Update an existing blog post by its ID.
- **URL:** `/posts/:id`
- **Method:** `PUT`
- **Path Parameters:** `id` (integer, required): The unique identifier of the post.
- **Body (JSON):**
  - `title` (string, required): The title of the post (Max 255 characters). Cannot be empty.- `content` (string, required): The main content of the post. Cannot be empty.
- **Example Request:**
```bash
curl -X PUT http://localhost:3000/posts/1 \
-H "Content-Type: application/json" \
-d '{
  "title": "Updated Title",
  "content": "This is the updated content."
}'
```
- **Success Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "Post Pertama Updated",
    "content": "Ini adalah post pertama terupdate.",
    "created_at": "2026-09-05T10:00:00.000Z",
    "updated_at": "2026-09-05T12:00:00.000Z"
  }
}
```

### 5. Delete a Post
Delete an existing blog post by its ID.
- **URL:** `/posts/:id`
- **Method:** `DELETE`
- **Path Parameters:** `id` (integer, required): The unique identifier of the post.
- **Example Request:**
```bash
curl -X DELETE http://localhost:3000/posts/1
```
- **Success Response (204 No Content):**
<br>(No body returned in the response)

## Testing with Postman
This project have included a complete Postman collection containing all test scenarios (including success and validation error cases).
1. Open Postman.
2. Click **Import** in the top left corner.
3. Select the `Blog API Collection.postman_collection.json` file from this repository.
4. The collection uses a `{{baseUrl}}` variable (default: `http://localhost:3000`). You can run the requests sequentially from top to bottom.