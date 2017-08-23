function CustomValidation() {  
  this.validityChecks = [];
}

CustomValidation.prototype = {  

  checkValidity: function(input) {
    for ( var i = 0; i < this.validityChecks.length - 1 ; i++ ) {
      var isInvalid = this.validityChecks[i].isInvalid(input);
      var requirementElement = this.validityChecks[i].element;
        if (isInvalid) {
          requirementElement.classList.add('invalid');
          requirementElement.classList.remove('valid');
        } else {
          requirementElement.classList.remove('invalid');
          requirementElement.classList.add('valid');
        }
    } 
  },

  checkForm: function (input) {
    var toolTips = this.validityChecks[this.validityChecks.length - 1].toolTip;
    var isInvalidForm = this.validityChecks[this.validityChecks.length - 1].isInvalidForm(input);
    if (isInvalidForm) {
      toolTips.classList.add('show');
      input.classList.add('inval');
      input.classList.remove('val');
      return true;
    } else {
      toolTips.classList.remove('show');
      input.classList.remove('inval');
      input.classList.add('val');
      return false;
    }
  }
};


var usernameValidityChecks = [  
  {
    isInvalid: function(input) {
      return input.value.length < 8;
    },
    element: document.querySelector('.requirements-name li:nth-child(1)')
  },
  {
    isInvalid: function(input) {
      var illegalCharacters = input.value.match(/[^a-zA-Z]/g);
      return illegalCharacters ? true : false;
    },
    element: document.querySelector('.requirements-name li:nth-child(2)')
  },
  {
    isInvalidForm: function (input) {
      return !input.value.match(/^[a-zA-Z]{8,}$/);
    },
  	toolTip: document.querySelector('.requirements-name')
  }
];

var passwordValidityChecks = [
  {
    isInvalid: function (input) {
      return !input.value.match(/[^\s]{8,100}$/);
      //return input.value.length < 8 | input.value.length > 100;
    },
    element: document.querySelector('.requirements-password li:nth-child(1)')
  },  
  {
    isInvalid: function (input) {
      return !input.value.match(/[0-9]/g);
    },
    element: document.querySelector('.requirements-password li:nth-child(2)')
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[a-z]/g);
    },
    element: document.querySelector('.requirements-password li:nth-child(3)')
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[A-Z]/g);
    },
    element: document.querySelector('.requirements-password li:nth-child(4)')
  },
  {
    isInvalidForm: function (input) {
      return !input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    },
  	toolTip: document.querySelector('.requirements-password')
  }
];

var emailValidityChecks = [
  {
    isInvalid: function (input) {
      return !input.value.match(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(gmail|yahoo|bing|microsoft)\.(com)$/g);
    },
    element: document.querySelector('.requirements-email li:nth-child(1)')
  },
  {
    isInvalidForm: function (input) {
      return !input.value.match(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(gmail|yahoo|bing|microsoft)\.(com)$/g);
    },
  	toolTip: document.querySelector('.requirements-email')
  }
];

function checkInput(input) {
  input.CustomValidation.checkValidity(input);
  input.CustomValidation.checkForm(input);
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
    form = document.getElementById('form');

inputs.forEach(function (item) {
  item.addEventListener('keyup', function (){
  	// item.CustomValidation.checkValidity(item);
   //  item.CustomValidation.checkForm(item);
    checkInput(item);
  });
});

submit.addEventListener('click', function(ev) {
  //console.log(validateForm(inputs));
  if (validateForm(inputs)) {
    form.submit();
  } else {
    ev.preventDefault();  
    validateForm(inputs);
  }
});

function validateForm (formInputs) {
  var flag = 0;
  formInputs.forEach(function (item) {
    item.CustomValidation.checkForm(item);
    if(!item.CustomValidation.checkForm(item)) flag++
  });
  if (flag == inputs.length) return true
  else return false
}
