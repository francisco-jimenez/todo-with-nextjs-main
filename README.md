# Next.js app with MongoDB database and i18n support

This is a Next.js app with a MongoDB database and i18n support. You can use this template to quickly get started with building a Next.js app that connects to a MongoDB database and has i18n support.

## Getting Started

To get started with this app, you will need to have Node.js and npm installed on your machine. Once you have these installed, follow these steps:

1. Clone the repository to your local machine.

```bash
git clone https://github.com/<your-username>/<your-repository-name>.git
```

2. Change into the project directory.

```bash
cd <your-repository-name>
```

3. Install the dependencies.

```bash
npm install
```

4. Start the development server.

```bash
npm run dev
```

5. Open the app in your browser.

```bash
http://localhost:3000
```

## Features

This starter template has the following features:

- MongoDB database connection
- i18n support using i18next library

## MongoDB Configuration

To use your own MongoDB database, update the `DB_URL` environment variable in the `.env.local` file with your database connection URL.

## Production Build

To make your app production-ready, run the following command:

```bash
npm run start
```

This will build your app using `next build` and start it in production mode using `next start`. The app will be available at `http://localhost:3000`.
