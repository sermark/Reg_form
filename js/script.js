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
            console.log(this.validityChecks[0].isInvalid(input));
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
        element: document.querySelector('.requirements-name li:nth-child(1)')
    },
    {
        isInvalid: function(input) {
            var illegalCharacters = input.value.match(/[^a-zA-Z]/g);
            return illegalCharacters ? true : false;
        },
        invalidityMessage: 'Only letters are allowed',
        element: document.querySelector('.requirements-name li:nth-child(2)')
    }
];


function checkInput(input) {

    input.CustomValidation.invalidities = [];
    input.CustomValidation.checkValidity(input);

    if ( input.CustomValidation.invalidities.length == 0 && input.value != '' ) {
        input.setCustomValidity('');
    } else {
        var message = input.CustomValidation.getInvalidities();
        input.setCustomValidity(message);
    }
}


var usernameInput = document.getElementById('username');  


usernameInput.CustomValidation = new CustomValidation();  
usernameInput.CustomValidation.validityChecks = usernameValidityChecks;


var inputs = document.querySelectorAll('input:not([type="submit"])');  


for (var i = 0; i < inputs.length; i++) {  
    inputs[i].addEventListener('keyup', function() {
        checkInput(this);
    });
}

