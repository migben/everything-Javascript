const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');


// Set date input with todays date as the minimum

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);
