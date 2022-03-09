import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './modules/ValidaLogin'

import Login from './modules/ValidaLogin'
const mainBoxLogin = document.querySelector('.containerLogin');

if (mainBoxLogin) {
    const login = new Login('.registerSubmit')
    const register = new Login('.loginSubmit')
}

import './modules/sidebar';
import './modules/CreateList';
import './modules/editList';
import './modules/estoque';

import './assets/css/main.css';
import './assets/css/login.css';
import './assets/css/sidebar.css';
import './assets/css/home.css';
import './assets/css/createList.css';
import './assets/css/listas.css';
import './assets/css/estoque.css';
import './assets/css/contact.css';
import './assets/css/responsive.css';
