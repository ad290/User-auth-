# Search Users (GET) API Documentation

## Endpoint  

- Replace `YOUR_JWT_TOKEN` with the token you receive after a successful login.

---

## Steps to Test Using Postman

### 1. Register a New User  
- **Method**: POST  
- **URL**: `http://localhost:8000/api/auth/register`  
- **Headers**:  
    ```
    Content-Type: application/json
    ```
- **Body (JSON)**:
    ```json
    {
      "email": "testuser@example.com",
      "password": "yourpassword"
    }
    ```
- **Action**: Click **Send** to create a new user.

---

### 2. Get JWT Token (Login)  
- **Method**: POST  
- **URL**: `http://localhost:8000/api/auth/login`  
- **Headers**:  
    ```
    Content-Type: application/json
    ```
- **Body (JSON)**:
    ```json
    {
      "email": "testuser@example.com",
      "password": "yourpassword"
    }
    ```
- **Action**: Click **Send** and **copy the JWT token** from the response.

- Example Response:
    ```json
    {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjM1NzI3MzQ4fQ.ZwSmGCg5O5Y4Op1vqfU9Nf4tG_g72L0I0jFvFGJ2y1A"
    }
    ```
- **Copy the value** of the `token` field — this is your JWT token.

---

### 3. Search for a User  
- **Method**: GET  
- **URL**: `http://localhost:8000/api/users/search?term=testuser`  
- **Headers**:  
    ```
    Authorization: Bearer YOUR_JWT_TOKEN
    ```
    - Replace `YOUR_JWT_TOKEN` with the token copied from the login response.

- **Params**:  
    ```
    term: testuser
    ```

---

### 4. How to Set Authorization Header in Postman  
1. Go to the **Headers** tab in Postman.  
2. Add a new key: `Authorization`  
3. Set the value as:  
    ```
    Bearer YOUR_JWT_TOKEN
    ```
    - Example:
      ```
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjM1NzI3MzQ4fQ.ZwSmGCg5O5Y4Op1vqfU9Nf4tG_g72L0I0jFvFGJ2y1A
      ```

Alternatively, you can use the **Authorization** tab:
1. Click on the **Authorization** tab.
2. Select **Bearer Token** from the dropdown.
3. Paste the JWT token you copied from the login response.

---

### 5. Send the Search Request  
- Click **Send** to search for users with the token in the Authorization header.  

---

### Tip: Save Your Requests  
- Save each request in a **Collection** to easily reuse and organize your API tests.

---

### Troubleshooting  
- Ensure your backend server is running at `http://localhost:8000`.  
- Double-check the JWT token's validity and ensure it's correctly copied.  
- If you receive a `401 Unauthorized` error, the token might be expired. Try logging in again to get a new token.

---

