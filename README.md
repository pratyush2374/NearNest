# 🏘️ NearNest

Connect Locally. Discover what's happening around you.  
A location-based community platform to share updates, recommendations, and local insights.

---

## 🚀 Get Started

Welcome to **NearNest**, your digital neighborhood bulletin board. Think of it as a mini-Twitter for your locality post updates, reply to neighbors, and react to what's going on nearby.

---

## 🌟 Features

-   📍 **Location-Based Posts** — See updates from your neighborhood.
-   👥 **Community Driven** — Engage with nearby users and build local connections.
-   💬 **Interactive** — Like and reply to posts to keep the conversation going.
-   📷 **Image Uploads** — Share images via Cloudinary integration.
-   ⚡ **Redis Geo Queries** — Fetch posts from nearby locations using Redis's geospatial features.

---

## 🛠 Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/)
-   **Language:** TypeScript
-   **ORM:** [Prisma](https://www.prisma.io/)
-   **Database:** MongoDB
-   **Geo Search:** Redis (Geospatial)
-   **Image Uploads:** Cloudinary
-   **Auth:** JWT via NextAuth.js

---

## 🧪 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=your_mongodb_url
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_gmail_app_password
REDIS_HOST=your_redis_host
REDIS_PASSWORD=your_redis_password
REDIS_USERNAME=your_redis_username
NEXTAUTH_SECRET=your_nextauth_secret
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 🧰 Local Setup

Follow these steps to set up the project locally:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/pratyush2374/NearNest.git
    mv NearNest nearnest
    cd nearnest
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment**

    - Create a `.env` file as shown above.
    - Make sure your database, Redis, and Cloudinary credentials are active.

4. **Generate Prisma Client**

    ```bash
    npx prisma db push
    ```

5. **Run Development Server**

    ```bash
    npm run dev
    ```
6. **Open your browser and navigate to [http://localhost:3000](http://localhost:3000)**


