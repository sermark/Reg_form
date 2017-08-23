function CustomValidation() {  
  this.invalidities = [];
  this.validityChecks = [];
}

CustomValidation.prototype = {  

  checkValidity: function(input) {

    for ( var i = 0; i < this.validityChecks.length - 1; i++ ) {

      var isInvalid = this.validityChecks[i].isInvalid(input);
      // var tool = this.validityChecks[this.validityChecks.length - 1].toolTip;
      // console.log(tool);

      var requirementElement = this.validityChecks[i].element;
      if (requirementElement) {
        if (isInvalid) {
          requirementElement.classList.add('invalid');
          requirementElement.classList.remove('valid');
          // tool.classList.add('show');

          

        } else {
          requirementElement.classList.remove('invalid');
          requirementElement.classList.add('valid');
          // tool.classList.remove('show');

        }
      } 
    } 
    return isInvalid;
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
  	toolTip: document.querySelector('.requirements-name')
  }
];

var passwordValidityChecks = [
  {
    isInvalid: function (input) {
      return input.value.length < 8 || input.value.length > 100
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
  	toolTip: document.querySelector('.requirements-password')
  }
];

var emailValidityChecks = [
  {
    isInvalid: function (input) {
      return !input.value.match(/[A-Z0-9._%+-]+@|gmail.com|mail.ru|yahoo.com|yandex.ru/g);
    },
    element: document.querySelector('.requirements-email li:nth-child(1)')
  },
  {
  	toolTip: document.querySelector('.requirements-email')
  }
];


function checkInput(input) {
	input.CustomValidation.checkValidity(input);
	var toolTips = document.querySelectorAll('.input-requirements');
	for (var i = 0; i < inputs.length; i++) {

		if (input.CustomValidation.checkValidity(input)) {
			toolTips[i].classList.add('show');
		} 
	}
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
    submit = document.querySelector('input[type="submit"'); 


inputs.forEach(function (item) {
  item.addEventListener('keyup', function (){
  	item.CustomValidation.checkValidity(item);
    // checkInput(item);
  });
});

submit.addEventListener('click', function(ev) {
	ev.preventDefault();  
	validateForm(inputs);
});


function validateForm (formInputs) {
  formInputs.forEach(function (item) {
    checkInput(item);
  });
}