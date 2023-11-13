## Getting Started

### STEP 1: Gather API keys for the application

To run this application locally you will need to have accounts for the following services:

- Clerk
- MongoDB
- UploadThing

Add API keys to a new .env file at root.

### STEP 2: Pull code from Github

Fork the repository for your own instance of the repository.

Open the terminal to the folder you’d like to store the source code.

Run the following git command:

```jsx
git clone “https://github.com/[YOUR_USERNAME]/[NAME_OF_REPO].git”
```

### STEP 3: Create a local environment variable file

Create a .env.local file within the parent folder (/community-app/)

### STEP 4: Install npm packages

Open a terminal from parent folder (/community-app/) and run:

```jsx
npm install
```

### STEP 5: Run the application locally

Run the following command in the terminal:

- Setup for http://localhost:3000

```jsx
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

...