// USE WITH FIREBASE AUTH
// import ViewDirectorBasedOnUserAuthStatus from './utils/viewDirector';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';
import {
  getRequest, postRequest, patchRequest, deleteRequest
} from '../api/promises';

const htmlStructure = () => {
  document.querySelector('#app').innerHTML = `
    <h1>TESTING PROMISES</h1>
    <h2>Open your dev tools</h2><br />
    <button class="btn btn-warning" id="get-joke">GET JOKE</button>
    <button class="btn btn-info" id="post-name">POST YOUR NAME</button>
    <button class="btn btn-success" id="patch-name">PATCH YOUR NAME</button>
    <button class="btn btn-danger" id="delete-name">DELETE YOUR NAME</button>
  `;
};

const events = () => {
  document.querySelector('#get-joke').addEventListener('click', () => {
    getRequest().then(console.warn);
  });
  document.querySelector('#post-name').addEventListener('click', () => {
    // update this object with your name
    const payload = { name: 'YOUR NICKNAME' };
    postRequest(payload).then(console.warn);
  });
  document.querySelector('#patch-name').addEventListener('click', () => {
    // update this object with your name and firebaseKey that was logged in the console when you created your name in the database
    const payload = { name: 'YOUR FULL NAME', firebaseKey: '' };
    patchRequest(payload).then(console.warn);
  });
  document.querySelector('#delete-name').addEventListener('click', () => {
    const firebaseKey = '';
    deleteRequest(firebaseKey).then(console.warn);
  });
};

const startApp = () => {
  htmlStructure();
  events(); // ALWAYS LAST
};

startApp();
