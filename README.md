# Obafemi-Oderanti-Coding-Challenge

## Description
A simple fullstack application that allows users to list the latest blocks and details of each block, for `http://blockchain.info`.

Frontend: ReactJS Framework

Backend (API): NodeJS Express Framework & GraphQL

## Installation
- Clone repository to local machine
- cd into /ui directory and run `npm install` && `npm start`
- On a different terminal window, cd into api/ directory and run `npm install` && `npm start`
- Navigate browser to `localhost:3000` to view the dashboard


# Future updates
- Detailed error handling for API
- Implementation of unit test e.g. With Jest
- Implement a dropdown (frontend) for users to choose number of previous days data to view (already implemented on the backend)
- Implement caching and resource optimization of data and queries
- Mobile responsiveness for frontend (user interface)
- Improved UI design with 3rd party library resources eg., react icons
- Implemetation of more of the data attributes, eg. transactions

# Hosting
The backend could be hosted seperately from the backend, eg. backend on Heroku, and frontend on Github pages, Vercel, Firebase or Netlify

Alternatively, the frontend could be served from the backend, and running a build of the frontend and displaying it as static data for the server, eg.

```

app.use(express.static(path.join(__dirname, './ui/build')));

```

```
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './ui/build', 'index.html'));
});

```