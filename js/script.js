function CustomValidation() {  
  this.invalidities = [];
  this.validityChecks = [];
}

CustomValidation.prototype = {  
  addInvalidity: function(message) {
    this.invalidities.push(message);
  },
  getInvalidities: function() {
    return this.invalidities.join('. \n');
  },
  checkValidity: function(input) {
    for ( var i = 0; i < this.validityChecks.length; i++ ) {

      var isInvalid = this.validityChecks[i].isInvalid(input);
      if (isInvalid) {
        this.addInvalidity(this.validityChecks[i].invalidityMessage);
      }
      var requirementElement = this.validityChecks[i].element;
      if (requirementElement) {
        if (isInvalid) {
          requirementElement.classList.add('invalid');
          requirementElement.classList.remove('valid');
          
          
        } else {
          requirementElement.classList.remove('invalid');
          requirementElement.classList.add('valid');
          
        }
      var elem = this.validityChecks[i].toolTip;  
      var list = document.querySelectorAll('.requirements-name li');
      console.log(elem);
      list.forEach(function (item) {
        if(item.classList.contains('invalid')) {
          elem.classList.add('show');
        } else {
          elem.classList.remove('show');
          }
        });
      } 
    } 
  }
};


var usernameValidityChecks = [  
  {
    isInvalid: function(input) {
      return input.value.length < 8;
    },
    invalidityMessage: 'This input needs to be at least 8 characters',
    element: document.querySelector('.requirements-name li:nth-child(1)'),
    toolTip: document.querySelector('.requirements-name')
    
  },
  {
    isInvalid: function(input) {
      var illegalCharacters = input.value.match(/[^a-zA-Z]/g);
      return illegalCharacters ? true : false;
    },
    invalidityMessage: 'Only letters are allowed',
    element: document.querySelector('.requirements-name li:nth-child(2)'),
    toolTip: document.querySelector('.requirements-name')
  },
];

var passwordValidityChecks = [
  {
    isInvalid: function (input) {
      return input.value.length < 8 || input.value.length > 100
    },
    invalidityMessage: 'This input needs to be at least 8 characters and less than 100 characters',
    element: document.querySelector('.requirements-password li:nth-child(1)'),
    toolTip: document.querySelector('.requirements-password')
  },

  {
    isInvalid: function (input) {
      return !input.value.match(/[0-9]/g);
    },
    invalidityMessage: 'This input needs to be contain at least 1 number',
    element: document.querySelector('.requirements-password li:nth-child(2)'),
    toolTip: document.querySelector('.requirements-password')
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[a-z]/g);
    },
    invalidityMessage: 'This input needs to be contain at least 1 lowercase letter',
    element: document.querySelector('.requirements-password li:nth-child(3)'),
    toolTip: document.querySelector('.requirements-password')
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/^[A-Z]/g);
    },
    invalidityMessage: 'This input needs to be contain at least 1 uppercase letter',
    element: document.querySelector('.requirements-password li:nth-child(4)'),
    toolTip: document.querySelector('.requirements-password')
  }
];

var emailValidityChecks = [
  {
    isInvalid: function (input) {
      return !input.value.match(/[A-Z0-9._%+-]+@|gmail.com|mail.ru|yahoo.com|yandex.ru/g);
    },
    invalidityMessage: 'This input needs contain example@gmail.com|@mail.ru|@yahoo.com|@yandex.ru',
    element: document.querySelector('.requirements-email li:nth-child(1)'),
    toolTip: document.querySelector('.requirements-email')
  },
];


function checkInput(input) {
  //input.CustomValidation.invalidities = [];
  input.CustomValidation.checkValidity(input);

  // if ( input.CustomValidation.invalidities.length == 0 && input.value != '' ) {
  //   input.setCustomValidity('');



  // } else {
  //   var message = input.CustomValidation.getInvalidities();
  //   input.setCustomValidity(message);

    //  toolTips.forEach(function(item) {
    //   item.classList.add('show');
    // });

  // }
}

var usernameInput = document.getElementById('username');  

usernameInput.CustomValidation = new CustomValidation();  
usernameInput.CustomValidation.validityChecks = usernameValidityChecks;


var passwordInput = document.getElementById('password');  

passwordInput.CustomValidation = new CustomValidation();  
passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

var emailInput = document.getElementById('email');  

emailInput.CustomValidation = new CustomValidation();  
emailInput.CustomValidation.validityChecks = emailValidityChecks;


var inputs = document.querySelectorAll('input:not([type="submit"])'), 
    submit = document.querySelector('input[type="submit"'),
    toolTips = document.querySelectorAll('.input-requirements');


inputs.forEach(function (item) {
  item.addEventListener('keyup', function (){
    checkInput(this);
  });
});

submit.addEventListener('click', function(ev) {  
  ev.preventDefault();
  inputs.forEach(function (item) {
    checkInput(item);
  });
});


