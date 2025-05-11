# Website Builder Backend API Documentation

This documentation provides details about the RESTful API endpoints available in the Website Builder Backend.

## Base URL

All endpoints are served relative to the base URL of your API server.

## Authentication

Most endpoints require authentication. Authentication is handled via JWT tokens.

### Authentication Headers

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### Authentication

#### Login

- **URL:** `/auth/login`
- **Method:** `POST`
- **Authentication Required:** No
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "token": "jwt_token_string",
      "user": { ... },
      "role": { ... }
    }
    ```
- **Error Response:**
  - **Code:** 401
  - **Content:** `{ "message": "Invalid username or password" }`

#### Register

- **URL:** `/auth/register`
- **Method:** `POST`
- **Authentication Required:** No
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string",
    "name": "string",
    "slug": "string",
    "data": { ... }
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "token": "jwt_token_string",
      "user": { ... },
      "role": { ... }
    }
    ```
- **Error Response:**
  - **Code:** 400
  - **Content:** `{ "message": "Username already exists" }`

### Users

#### Get All Users

- **URL:** `/users`
- **Method:** `GET`
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of user objects

#### Get User by ID

- **URL:** `/users/:id`
- **Method:** `GET`
- **URL Parameters:**
  - `id`: User ID
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** User object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "User not found" }`

#### Create User

- **URL:** `/users`
- **Method:** `POST`
- **Authentication Required:** Yes
- **Request Body:**
  ```json
  {
    "name": "string",
    "slug": "string",
    "data": { ... },
    "username": "string",
    "password": "string"
  }
  ```
- **File Upload:** `image` (optional)
- **Success Response:**
  - **Code:** 201
  - **Content:** Created user object

#### Update User

- **URL:** `/users/:id`
- **Method:** `PUT`
- **URL Parameters:**
  - `id`: User ID
- **Authentication Required:** Yes
- **Request Body:** (all fields optional)
  ```json
  {
    "name": "string",
    "slug": "string",
    "data": { ... }
  }
  ```
- **File Upload:** `image` (optional)
- **Success Response:**
  - **Code:** 200
  - **Content:** Updated user object

#### Delete User

- **URL:** `/users/:id`
- **Method:** `DELETE`
- **URL Parameters:**
  - `id`: User ID
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "User deleted successfully" }`

### Entities

#### Get All Entities

- **URL:** `/entities`
- **Method:** `GET`
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of entity objects

#### Get Entity by ID

- **URL:** `/entities/:id`
- **Method:** `GET`
- **URL Parameters:**
  - `id`: Entity ID
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** Entity object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "Entity not found" }`

#### Create Entity

- **URL:** `/entities`
- **Method:** `POST`
- **Authentication Required:** Yes
- **Request Body:**
  ```json
  {
    "name": "string",
    "slug": "string",
    "meta": { ... }
  }
  ```
- **File Upload:** `image` (optional)
- **Success Response:**
  - **Code:** 201
  - **Content:** Created entity object

#### Update Entity

- **URL:** `/entities/:id`
- **Method:** `PUT`
- **URL Parameters:**
  - `id`: Entity ID
- **Authentication Required:** Yes
- **Request Body:** (all fields optional)
  ```json
  {
    "name": "string",
    "slug": "string",
    "meta": { ... }
  }
  ```
- **File Upload:** `image` (optional)
- **Success Response:**
  - **Code:** 200
  - **Content:** Updated entity object

#### Delete Entity

- **URL:** `/entities/:id`
- **Method:** `DELETE`
- **URL Parameters:**
  - `id`: Entity ID
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Entity deleted successfully" }`

### Pages

#### Get All Pages

- **URL:** `/pages`
- **Method:** `GET`
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of page objects

#### Get Page by ID

- **URL:** `/pages/:id`
- **Method:** `GET`
- **URL Parameters:**
  - `id`: Page ID
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** Page object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "Page not found" }`

#### Get Page Sections by Entity and Page Slugs

- **URL:** `/pages/:entitySlug/:pageSlug/sections`
- **Method:** `GET`
- **URL Parameters:**
  - `entitySlug`: Entity slug
  - `pageSlug`: Page slug
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of page section objects
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "Entity not found" }` or `{ "message": "Page not found" }`

#### Create Page

- **URL:** `/pages`
- **Method:** `POST`
- **Authentication Required:** Yes
- **Request Body:**
  ```json
  {
    "name": "string",
    "slug": "string",
    "entityId": number
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:** Created page object

#### Update Page

- **URL:** `/pages/:id`
- **Method:** `PUT`
- **URL Parameters:**
  - `id`: Page ID
- **Authentication Required:** Yes
- **Request Body:** (all fields optional)
  ```json
  {
    "name": "string",
    "slug": "string"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:** Updated page object

#### Delete Page

- **URL:** `/pages/:id`
- **Method:** `DELETE`
- **URL Parameters:**
  - `id`: Page ID
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Page deleted successfully" }`

#### Add Section to Page

- **URL:** `/pages/:id/sections`
- **Method:** `POST`
- **URL Parameters:**
  - `id`: Page ID
- **Authentication Required:** Yes
- **Request Body:**
  ```json
  {
    "sectionId": number,
    "data": { ... },
    "order": number (optional)
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:** Created page section object

#### Update Page Section

- **URL:** `/pages/:pageId/sections/:sectionId`
- **Method:** `PUT`
- **URL Parameters:**
  - `pageId`: Page ID
  - `sectionId`: Page Section ID
- **Authentication Required:** Yes
- **Request Body:** (all fields optional)
  ```json
  {
    "data": { ... },
    "order": number
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:** Updated page section object

#### Delete Page Section

- **URL:** `/pages/:pageId/sections/:sectionId`
- **Method:** `DELETE`
- **URL Parameters:**
  - `pageId`: Page ID
  - `sectionId`: Page Section ID
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Section removed from page successfully" }`

### Sections

#### Get All Sections

- **URL:** `/sections`
- **Method:** `GET`
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of section objects

#### Get News Sections

- **URL:** `/sections/news`
- **Method:** `GET`
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of news section objects

#### Get Staff Sections

- **URL:** `/sections/staff`
- **Method:** `GET`
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of staff section objects

#### Get Navigation Sections

- **URL:** `/sections/nav`
- **Method:** `GET`
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of navigation section objects

#### Get Footer Sections

- **URL:** `/sections/footer`
- **Method:** `GET`
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of footer section objects

#### Get Section by ID

- **URL:** `/sections/:id`
- **Method:** `GET`
- **URL Parameters:**
  - `id`: Section ID
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** Section object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "Section not found" }`

#### Create Section

- **URL:** `/sections`
- **Method:** `POST`
- **Authentication Required:** Yes
- **Request Body:**
  ```json
  {
    "name": "string",
    "type": "nav" | "footer" | "news" | "section" | "persons",
    "componentId": number
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:** Created section object

#### Update Section

- **URL:** `/sections/:id`
- **Method:** `PUT`
- **URL Parameters:**
  - `id`: Section ID
- **Authentication Required:** Yes
- **Request Body:** (all fields optional)
  ```json
  {
    "name": "string",
    "type": "nav" | "footer" | "news" | "section" | "persons",
    "componentId": number
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:** Updated section object

#### Delete Section

- **URL:** `/sections/:id`
- **Method:** `DELETE`
- **URL Parameters:**
  - `id`: Section ID
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Section deleted successfully" }`

### News

#### Get All News

- **URL:** `/news`
- **Method:** `GET`
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of news objects

#### Get News by Entity Slug

- **URL:** `/news/entity/:entitySlug`
- **Method:** `GET`
- **URL Parameters:**
  - `entitySlug`: Entity slug
- **Query Parameters:**
  - `take`: Number of items to return (optional)
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of news objects

#### Get News by Slug

- **URL:** `/news/slug/:slug`
- **Method:** `GET`
- **URL Parameters:**
  - `slug`: News slug
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** News object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "News not found" }`

#### Get News by ID

- **URL:** `/news/:id`
- **Method:** `GET`
- **URL Parameters:**
  - `id`: News ID
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** News object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "News not found" }`

#### Create News

- **URL:** `/news`
- **Method:** `POST`
- **Authentication Required:** Yes
- **Request Body:**
  ```json
  {
    "title": "string",
    "slug": "string",
    "entityId": number,
    "details": { ... }
  }
  ```
- **File Upload:** `image` (optional)
- **Success Response:**
  - **Code:** 201
  - **Content:** Created news object

#### Update News

- **URL:** `/news/:id`
- **Method:** `PUT`
- **URL Parameters:**
  - `id`: News ID
- **Authentication Required:** Yes
- **Request Body:** (all fields optional)
  ```json
  {
    "title": "string",
    "slug": "string",
    "details": { ... }
  }
  ```
- **File Upload:** `image` (optional)
- **Success Response:**
  - **Code:** 200
  - **Content:** Updated news object

#### Delete News

- **URL:** `/news/:id`
- **Method:** `DELETE`
- **URL Parameters:**
  - `id`: News ID
- **Authentication Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "News deleted successfully" }`

## Status Codes

The API returns the following status codes:

- `200 OK`: The request was successful
- `201 Created`: A new resource was successfully created
- `400 Bad Request`: The request was malformed or invalid
- `401 Unauthorized`: Authentication failed or token is invalid
- `404 Not Found`: The requested resource was not found
- `500 Server Error`: An error occurred on the server

## File Uploads

For endpoints that support file uploads, use multipart/form-data format and include the file in the field name specified in the endpoint documentation.

## Response Formats

All responses are in JSON format.

## Error Handling

Error responses follow this format:

```json
{
  "message": "Error message description"
}
```

For validation errors:

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```
