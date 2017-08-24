function CustomValidation() {                                           //Создаем конструктор
  this.validityChecks = [];
}

CustomValidation.prototype = {                                          //записываем в протопит методы

  checkValidity: function(input) {                                      //Проверка валидности каждой подсказки определенного инпута
    for ( var i = 0; i < this.validityChecks.length - 1 ; i++ ) {
      var isInvalid = this.validityChecks[i].isInvalid(input);
      var requirementElement = this.validityChecks[i].element;
        if (isInvalid) {                                                //Если не валидна, то показывем подсказку
          requirementElement.classList.add('invalid');
          requirementElement.classList.remove('valid');
        } else {                                                        //Если валидна, убираем подсказку
          requirementElement.classList.remove('invalid');
          requirementElement.classList.add('valid');
        }
    } 
  },

  checkForm: function (input) {                                                                         //Провера валидности каждого инпута
    var toolTips = this.validityChecks[this.validityChecks.length - 1].toolTip;
    var isInvalidForm = this.validityChecks[this.validityChecks.length - 1].isInvalidForm(input);
    if (isInvalidForm) {                                                                                //Если инпут не валиден, то показываем блок подсказок и меняем border-color на inval(красный)
      toolTips.classList.add('show');
      input.classList.add('inval');
      input.classList.remove('val');
      return true;                                                                                      //Результатом возвращаем true (для дальнейшей проверки всей формы)
    } else {                                                                                            //Если инпут валиден, то убираем блок подсказок и меняем border-color на val(зеленый)
      toolTips.classList.remove('show');
      input.classList.remove('inval');
      input.classList.add('val');
      return false;                                                                                     //Результатом возвращаем false (для дальнейшей проверки всей формы)
    }
  }

};


var usernameValidityChecks = [                                                  //Записываем в массив объекты каждой подсказки для input[type=name]
  {
    isInvalid: function(input) {                                                //Проверка по длине вводимых символов                                                                                          
      return input.value.length < 8;
    },
    element: document.querySelector('.requirements-name li:nth-child(1)')       //Записываем в свойство объекта DOM элемент этой подсказки 
  },
  {
    isInvalid: function(input) {                                                //Проверка вводимых символов (только буквы) 
      var illegalCharacters = input.value.match(/[^a-zA-Z]/g);
      return illegalCharacters ? true : false;
    },
    element: document.querySelector('.requirements-name li:nth-child(2)')       //Записываем в свойство объекта DOM элемент этой подсказки
  },
  {
    isInvalidForm: function (input) {                                           //Проверка всего инпута
      return !input.value.match(/^[a-zA-Z]{8,}$/);
    },
  	toolTip: document.querySelector('.requirements-name')                       //Записываем в свойство объекта DOM элемент блока подсказок input[type=name]
  }
];

var passwordValidityChecks = [                                                  //Записываем в массив объекты каждой подсказки для input[type=password]
  {
    isInvalid: function (input) {                                               //Проверка по длине вводимых символов
      return !input.value.match(/[^\s]{8,100}$/);
      //return input.value.length < 8 | input.value.length > 100;
    },
    element: document.querySelector('.requirements-password li:nth-child(1)')   //Записываем в свойство объекта DOM элемент этой подсказки 
  },  
  {
    isInvalid: function (input) {                                               //Проверка вводимых символов (как минимум 1 цифра)
      return !input.value.match(/[0-9]/g);
    },
    element: document.querySelector('.requirements-password li:nth-child(2)')   //Записываем в свойство объекта DOM элемент этой подсказки
  },
  {
    isInvalid: function (input) {                                               //Проверка вводимых символов (как минимум 1 буква нижнего регистра)
      return !input.value.match(/[a-z]/g);
    },
    element: document.querySelector('.requirements-password li:nth-child(3)')   //Записываем в свойство объекта DOM элемент этой подсказки
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[A-Z]/g);                                      //Проверка вводимых символов (как минимум 1 буква верхнего регистра)
    },
    element: document.querySelector('.requirements-password li:nth-child(4)')   //Записываем в свойство объекта DOM элемент этой подсказки
  },
  {
    isInvalidForm: function (input) {                                           //Проверка всего инпута
      return !input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    },
  	toolTip: document.querySelector('.requirements-password')                   //Записываем в свойство объекта DOM элемент блока подсказок input[type=password]
  }
];

var emailValidityChecks = [                                                     //Записываем в массив объекты каждой подсказки для input[type=email]
  {
    isInvalid: function (input) {                                               //Проверка вводимых символов (только адреса ...@gmail|yahoo|bing|microsoft.com) 
      return !input.value.match(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(gmail|yahoo|bing|microsoft)\.(com)$/g);
    },
    element: document.querySelector('.requirements-email li:nth-child(1)')      //Записываем в свойство объекта DOM элемент этой подсказки
  },
  {
    isInvalidForm: function (input) {                                           //Проверка всего инпута
      return !input.value.match(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(gmail|yahoo|bing|microsoft)\.(com)$/g);
    },
  	toolTip: document.querySelector('.requirements-email')                      //Записываем в свойство объекта DOM элемент блока подсказок input[type=email]
  }
];

function checkInput(input) {                                                    //Функция проверки на валидность вводимых символов в инпут и всего инпута в целом
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

inputs.forEach(function (item) {                                                 //При вводе в каждый инпут вызываем функцию проверки на валиндность
  item.addEventListener('keyup', function (){
  	// item.CustomValidation.checkValidity(item);
   //  item.CustomValidation.checkForm(item);
    checkInput(item);
  });
});

submit.addEventListener('click', function(ev) {                                 //При отправке всей формы провереряем ее на валидность, если валидна - отправляем, иначе - показывем подсказки что не верно введено
  //console.log(validateForm(inputs));
  if (validateForm(inputs)) {
    form.submit();
  } else {
    ev.preventDefault();  
    validateForm(inputs);
  }
});

function validateForm (formInputs) {                                            //Проверка всей формы на валидность 
  var flag = 0;
  formInputs.forEach(function (item) {
    item.CustomValidation.checkForm(item);
    if(!item.CustomValidation.checkForm(item)) flag++                           //Если инпут валиден, то увеличиваем значение flag на 1
  });
  if (flag == inputs.length) return true                                        //Если flag равен числу инпутов, то вся форма валидна и возвращаем true, иначе false
  else return false
}
