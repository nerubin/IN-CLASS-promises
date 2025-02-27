// USE WITH FIREBASE AUTH
// import ViewDirectorBasedOnUserAuthStatus from './utils/viewDirector';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';
import {
  getRequest,
} from '../api/promises';

// added global variables to keep track of the joke state
let currentJoke = null;
let jokeFetched = false; // indicates if the joke setup has been fetched
let punchLineShown = false; // indicates if the punchline is displayed

const htmlStructure = () => {
  document.querySelector('#app').innerHTML = `
    <h1>Joke Generator</h1>
    <div id="joke-container"></div>
    <br />
    <button class="btn btn-warning" id="joke-btn">GET JOKE</button>
  `;
};

// Helper function to clear the joke container
const clearJokeContainer = () => {
  document.getElementById('joke-container').innerHTML = '';
};

// Helper function to update the button text based on our state
const updateButtonText = () => {
  const jokeBtn = document.getElementById('joke-btn');
  if (!jokeFetched) {
    jokeBtn.innerText = 'GET JOKE';
  } else if (jokeFetched && !punchLineShown) {
    jokeBtn.innerText = 'GET PUNCHLINE';
  } else {
    jokeBtn.innerText = 'GET ANOTHER JOKE';
  }
};

// function will run each time the button is clicked
const handleJokeBtnClick = () => {
  const container = document.getElementById('joke-container');

  // If we haven't fetched a joke yet, fetch it
  if (!jokeFetched) {
    getRequest()
      .then((joke) => {
        currentJoke = joke; // save joke for later use
        clearJokeContainer(); // clear any previous joke
        // create a paragrpah element for the joke setup
        const jokeSetupParagraph = document.createElement('p');
        jokeSetupParagraph.textContent = joke.setup;
        container.appendChild(jokeSetupParagraph); // display the setup above the button
        jokeFetched = true; // mark that the joke has been fetched
        updateButtonText(); // change button text to "GET PUNCHLINE"
      })
      .catch((error) => console.error('Error fetching joke:', error));
  } else if (jokeFetched && !punchLineShown) {
    if (currentJoke && currentJoke.delivery) {
      const punchLineParagraph = document.createElement('p');
      punchLineParagraph.textContent = currentJoke.delivery;
      container.appendChild(punchLineParagraph); // show punchline below setup
      punchLineShown = true; // mark that punchline is shown
      updateButtonText(); // change btn to "GET ANOTHER"
    }
  } else {
    clearJokeContainer();
    currentJoke = null;
    jokeFetched = false;
    punchLineShown = false;
    updateButtonText(); // reset btn text back to "GET JOKE"
  }
};

// update the events function to use the new click handler
const events = () => {
  document.getElementById('joke-btn').addEventListener('click', handleJokeBtnClick);
};

const startApp = () => {
  htmlStructure();
  events(); // ALWAYS LAST
};

startApp();
