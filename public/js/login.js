$(function () {
  login();
  $('#tb').click(function () {
    $('#popupWindow').animate({
      height: '550px',
      top: '30%'
    });
  });
  $('#tb1').click(function () {
    $('#popupWindow').animate({
      height: '300px',
      top: '50%'
    });
  });
  $('ul.tabs li:first').addClass('active');
  $('.block article').hide();
  $('.block article:first').show();
  $('ul.tabs li').on('click', function () {
    $('ul.tabs li').removeClass('active');
    $(this).addClass('active')
    $('.block article').hide();
    var activeTab = $(this).find('a').attr('href');
    $(activeTab).show();
    return false;
  });



  $('#btnShow').click(function () {
    $('#cover').slideDown('slow');
  });
  $('#btnClose').click(function () {
    $('#cover').slideUp('slow');
  });
  $('#btnClose1').click(function () {
    $('#cover').slideUp('slow');
  });
  $('#btnCloser').click(function () {
    $('#cover').slideUp('slow');
  });



  $('#btnClose1').click(function () {
    var email = $('#email').val();
    var password = $('#password').val();
    if (isEmpty(email, password)) {
      $.ajax({
        type: "POST",
        url: "/api/login",
        data: {
          email: email,
          password: password
        },
        success: function (data) {
          if (data == 'Success') {
            Cookies.set('rentUser', [email, password]);
            $('.error').text('Вы успешно авторизовались на сайте').stop().fadeIn(400).delay(1000).fadeOut(400); //fade out after 3 seconds
            login();
          } else {
            $('.error').text('Пользователь с такими данными не найден').stop().fadeIn(400).delay(1000).fadeOut(400); //fade out after 3 seconds           
          }
        },
      });
    } else {
      $('.error').text('Вы заполнили не все поля').stop().fadeIn(400).delay(1000).fadeOut(400); //fade out after 3 seconds      
    }
  });
  $('#btnCloser').click(function () {
    var email = $('#emailr').val();
    var password = $('#passwordr').val();
    var name = $('#name').val();
    var surname = $('#surname').val();
    var patronymic = $('#patronymic').val();
    var phone = $('#phome').val();
    if (isEmpty(email, password, name, surname, patronymic, phone)) {
      $.ajax({
        type: "POST",
        url: "/api/register",
        data: {
          email: email,
          password: password,
          name: name,
          surname: surname,
          patronymic: patronymic,
          phone: phone
        },
        success: function (data) {
          if (data == 'Success') {
            $('.error').text('Вы успешно зарегистрировались на сайте').stop().fadeIn(400).delay(1000).fadeOut(400); //fade out after 3 seconds           
          }
        },
      });
    } else {
      $('.error').text('Вы заполнили не все поля').stop().fadeIn(400).delay(1000).fadeOut(400); //fade out after 3 seconds      
    }
  });

  function login() {
    if (Cookies.get('rentUser')) {
      let temp = $('#nav');
      temp.html('');
      temp.append('<li><a href="/user">Личный кабинет</a></li>');
      temp.append('<li><a id="loguot" href="#">Выйти</a></li>');
    }
  }
  $('#loguot').click(function () {
    Cookies.remove('rentUser');
    window.location.reload();
  });
});

function isEmpty() {
  let count = 0;
  for (let index = 0; index < arguments.length; index++) {
    if (arguments[index] != '') {
      count++;
    }
  }
  if (count == arguments.length) {
    return true;
  } else {
    return false;
  }
}