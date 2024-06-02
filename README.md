# NewsMan

This is a news application that shows Lates headlines from all around the world. Select your country to geet the latest headlines from different sources.

![Demo](./public/demo.gif)

# Project Setup

- This Project has a backend and frontend.
- The backend is contained in server directory (express setup with `typescript`)
- frontend is at the root (vite react setup with `typescript` )
- both frontend and backend has there seprate `node modules`
- The build command `yarn build` or `npm buil` builds both server and fontend
- outpt directory for react fronted is `./server/build/client`
- output direcotry for backend is `./server/build/server`

# scripts

The scripts are defined in `./package.json` and `./server/package.json`

## server scripts

all path's relative to `./server` directory

- `start` :- starts the server from `./build/server/index.js` (relative to server directory). for this to work server needs to be build first
- `build` :- This command compiles the typescript code into js based on `./tsconfig.json` and puts it into `./build/server/` directory.
- `dev` :- This command watch for the changes in the direcotry and re-commile and then run the code again.

## client scripts

- `start` :- Run the servers start script. (both client and server need to be build first).
- `build` :- build the vite-react app & then run's the server's build command.
- `dev`:- Run the client and server in devlopment mode.
- `server:dev` && `server:build` helper commands to start the server's dev and build command respectively.

# Guide to Run Locally.

- Clone the repo
  ```
  git clone https://github.com/nktech-official/newsman.git
  ```
- Navigate to the cloned directory and create a `.env` file inside `./server/` directory with following content:-

  ```
  API_KEY=YOUR_API_KEY_HERE
  PORT=4000
  ```

- Install dependecies using `yarn` for both client and server
  ```
  yarn install && cd ./server && yarn install
  ```
- To start in dev mode navigate back to project root and run
  ```
  yarn dev
  ```
- To run in Production first build using
  ```
  yarn build
  ```
  - Then start the project
    ```
    yarn start
    ```

# Dependecies

Command Dependecines for both backend and frontend include `typescript` and `tsc` for typescript support.

## backend

- `dotenv`:- To Load Environment variables from `.env` file.
- `express` :- The Backend Server
- `memory-cache` :- To cache the results of `newsapi` to reduce number of api calls
- `ts-newsapi` :- Third party Library for newsapi with `typescript` support to make requests from to the `newsapi`

## frontend

- `axios` :- To make the requests to the backend server programatically from the frontend.
- `moment` :- Parse the Date & Time .
- `postcss` && `tailwindcss` :- Required to set tailwind css
- `ract` && `react-dom` :- Frontend Library Setup
- `react-router-dom` :- managing app state in url using navigate from `useNavigate()` hook.
