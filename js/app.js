const email = document.querySelector('#email');
const subject = document.querySelector('#asunto');
const message = document.querySelector('#mensaje');
const send = document.querySelector('#enviar');
const form = document.querySelector('#enviar-mail');
const reset = document.querySelector('#resetBtn');

onLoad();

function onLoad() {
  document.addEventListener('DOMContentLoaded', loadApp);
  email.addEventListener('blur', validateForm);
  subject.addEventListener('blur', validateForm);
  message.addEventListener('blur', validateForm);
  send.addEventListener('click', sendForm);
  reset.addEventListener('click', resetForm);

}

function loadApp() {
  console.log('Iniciando app');
  send.disabled = true;
}

function validateForm() {
  console.log('Validando...');

  validateLongitude(this);

  console.log(this.type);

  if (this.type === 'email') {
    validateEmail(this);
  }


  let error = document.querySelectorAll('.error');

  if (email.value !== '' && subject.value !== '' && message.value !== '') {
    if (error.length === 0) {
      send.disabled = false;
    }
  }
}

function validateLongitude(field) {
  if (field.value.length > 0) {
    console.log(field.value.length);
    field.style.borderBottomColor = 'green';
    field.classList.remove('error');
  } else {
    field.style.borderBottomColor = 'red';
    field.classList.add('error');
  }
}

function validateEmail(field) {
  if (regexEmail(field.value)) {
    field.style.borderBottomColor = 'green';
    field.classList.remove('error');
    console.log('Email correcto');
  } else {
    field.style.borderBottomColor = 'red';
    field.classList.add('error');
    console.log('Error en el email');
  }
}

function regexEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function sendForm(e) {
  e.preventDefault();

  const spinnerGif = document.querySelector('#spinner');
  spinnerGif.style.display = 'block';

  const envelope = document.createElement('img');
  envelope.src = 'img/mail.gif';
  envelope.style.display = 'block';

  setTimeout(function () {
    spinnerGif.style.display = 'none';
    document.querySelector('#loaders').appendChild(envelope);

    setTimeout(function () {
      envelope.style.display = 'none';
      resetForm();
    }, 1000);

  }, 2000);

  console.log('Enviando');
}

function resetForm(e) {
  e.preventDefault();
  form.reset();
}
