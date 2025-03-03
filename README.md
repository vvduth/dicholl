# Dichol

Dichol is an e-commerce platform for women's fancy dresses and accessories. This project is built using Next.js, TypeScript, and P, PostGreSQL with Neon, Prisma.

## Features

- Product listing with detailed descriptions
- Product carousel for featured items
- User authentication and authorization
- Shopping cart and checkout process
- Integration with PayPal and Stripe for payments
- Admin Features such as create product, mark order as paid, assign role to user

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vvduth/dichol.git
   cd dichol
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL=your_database_url
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

4. Run Prisma migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

### Running Tests

To run tests, use the following command:

```bash
npm run test
# or
yarn test
```

### Building for Production

To build the application for production, use the following command:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```


