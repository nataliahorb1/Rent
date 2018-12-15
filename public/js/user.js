$(function () {
    let access;
    login();

    function login() {
        if (Cookies.get('rentUser')) {
            let temp = $('#nav');
            temp.html('');
            temp.append('<li><a href="/user">Личный кабинет</a></li>');
            temp.append('<li><a id="loguot" href="#">Выйти</a></li>');
        } else {
            window.location.href = '/';
        }
    }
     $('#loguot').click(function () {
    Cookies.remove('rentUser');
    window.location.reload();
  });   
    if (Cookies.get('rentUser')) {
        let dates = Cookies.getJSON('rentUser');
        $.ajax({
            type: "POST",
            url: "/api/dataUser",
            data: {
                email: dates[0],
                password: dates[1]
            },
            success: function (data) {
                $('input[name=surname]').val(data[0].surname);
                $('input[name=name]').val(data[0].name);
                $('input[name=patronymic]').val(data[0].patronymic);
            },
        });
    }
    if (Cookies.get('rentUser')) {
        let dates = Cookies.getJSON('rentUser');        
    $.ajax({
        type: "POST",
        url: "/api/isAdmin",
        data: {
            email:  dates[0],
            password:  dates[1]
        },
        success: function (data) {
          access=data[0].access;
      
if(parseInt(access)==0)
{
    if (Cookies.get('rentUser')) {
        let dates = Cookies.getJSON('rentUser');
        $.ajax({
            type: "POST",
            url: "/api/userPremises",
            data: {
                email: dates[0],
                password: dates[1]
            },
            success: function (data) {
                let right = $('.right');
                right.html('');


                right.append('<table>');
                right.append('<tr><th>Объявление №</th><th>Город</th><th>Площадь</th><th>Цена</th><th>Описание</th></tr>');

                for (let index = 0; index < data.length; index++) {
                    right.append('<tr class="premises"><td>' + data[index].id + '</td><td>' + data[index].address + '</td><td>' + data[index].area + '</td><td>' + data[index].price + '</td><td><p  class="clip photo"  data-title="' + data[index].description + '">' + data[index].description + '</p></td><td><button id="btnShow" onclick="editItem(' + data[index].id + ');show();">Изменить</button></td><td><button onclick=deleteItem(' + data[index].id + ')>Удалить</button></td></tr>');


                }
                right.append('</table>');
            }
        })
    }

    if (Cookies.get('rentUser')) {
        let dates = Cookies.getJSON('rentUser');
        $.ajax({
            type: "POST",
            url: "/api/dataUser",
            data: {
                email: dates[0],
                password: dates[1]
            },
            success: function (data) {
                let left = $('.left');
                left.html('');
                left.append('<span>Фамилия<span>' + data[0].surname + '</span></span>');
                left.append('<span>Имя<span>' + data[0].name + '</span></span>');
                left.append('<span>Отчество<span>' + data[0].patronymic + '</span></span>');
                left.append('<span>Номер телефона<span>' + data[0].phone + '</span></span>');
                left.append('<span>Электронный адрес<span>' + data[0].email + '</span></span>');

            }
        })
    }

    if (Cookies.get('rentUser')) {
        let dates = Cookies.getJSON('rentUser');
        $.ajax({
            type: "POST",
            url: "/api/lease",
            data: {
                email: dates[0],
                password: dates[1]
            },
            success: function (data) {
                let lease = $('.lease');
                lease.html('');
                console.log(data);
                lease.append('<table>');
                lease.append('<tr><th>Объявление №</th><th>Имя</th><th>Фамилия</th><th>Город</th><th> Номер</th></tr>');
                for (let index = 0; index < data.length; index++) {
                    lease.append('<tr class="premises"><td>' + data[index].id + '</td><td>' + data[index].name + '</td><td>' + data[index].surname + '</td><td>' + data[index].address + '</td><td><p>' + data[index].phone + '</p></td></tr>');


                }
                lease.append('</table>');
            }
        })

    }

        



    let temp = $("#ptype option:selected").text();
    changeOp();
    $("#ptype").change(function () {
        temp = $("#ptype option:selected").text();
        changeOp();

    });

    function changeOp() {
        let ctype = $('#ctype');
        if (temp == 'Квартиры') {
            ctype.html('');
            ctype.append('<option>Квартира</option>');
            ctype.append('<option>Комната</option>');
        } else if (temp == 'Дома') {
            ctype.html('');
            ctype.append('<option>Дом</option>');
            ctype.append('<option>Часть дома</option>');
            ctype.append('<option>Дача</option>');
        } else if (temp == 'Коммерческая недвижимость') {
            ctype.html('');
            ctype.append('<option>Торговые площади</option>');
            ctype.append('<option>Складские помещения</option>');
            ctype.append('<option>Производственные помещения</option>');
            ctype.append('<option>Кафе, бар, ресторан</option>');
            ctype.append('<option>Объект сферы услуг</option>');
            ctype.append('<option>Отель, гостиница</option>');
            ctype.append('<option>База отдыха, пансионат</option>');
            ctype.append('<option>Помещения свободного назначения</option>');
            ctype.append('<option>Готовый бизнес</option>');
        } else if (temp == 'Офисы') {
            ctype.html('');
            ctype.append('<option>Офисные помещения</option>');
            ctype.append('<option>Офисные здания</option>');
        } else if (temp == 'Земельные участки') {
            ctype.html('');
            ctype.append('<option>Участок под жилую застройку</option>');
            ctype.append('<option>Земля коммерческого назначения</option>');
            ctype.append('<option>Земля сельскохозяйственного назначения</option>');
            ctype.append('<option>Земля рекреационного назначения</option>');
            ctype.append('<option>Земля природно-заповедного назначения</option>');
        } else if (temp == 'Гаражи') {
            ctype.html('');
            ctype.append('<option>Бокс в гаражном комплексе</option>');
            ctype.append('<option>Подземный паркинг</option>');
            ctype.append('<option>Место в гаражном кооперативе</option>');
            ctype.append('<option>Отдельно стоящий гараж</option>');
            ctype.append('<option>Место на стоянке</option>');
        }
    }


    $('#newAdd').click(function () {
        let surname = $('input[name=surname]').val();
        let name = $('input[name=name]').val();
        let patronymic = $('input[name=patronymic]').val();
        let address = $("select[name=city] option:selected").val();
        let ptype = $("select[name=ptype] option:selected").text();
        let ctype = $("select[name=ctype] option:selected").text();
        let area = $('input[name=area]').val();
        let price = $('input[name=price]').val();
        let description = $('textarea[name=description]').val();
        if (isEmpty(surname, name, patronymic, address,area, price, description)) {
            $.ajax({
                type: "POST",
                url: "/api/newAds",
                data: {
                    surname: surname,
                    name: name,
                    patronymic: patronymic,
                    address: address,
                    ptype: ptype,
                    ctype: ctype,
                    area: area,
                    price: price,
                    description: description,

                },
                success: function (data) {
                    if (data == 'Success') {
            $('.error').text('Объявление успешно добавлено').stop().fadeIn(400).delay(1000).fadeOut(400); //fade out after 3 seconds                             
                    } else {
            $('.error').text('Объявление не добавлено. Проверьте еще раз данные.').stop().fadeIn(400).delay(1000).fadeOut(400); //fade out after 3 seconds      
                        
                    }
                },
            })
        } else {
            $('.error').text('Вы заполнили не все поля').stop().fadeIn(400).delay(1000).fadeOut(400); //fade out after 3 seconds      
        }
    });

}
else{
   let tab =  $('#tabnav');
   tab.html('');
   tab.append('<li><a href="#tabs-1">Пользователи</a></li>');
   tab.append('<li><a href="#tabs-2">Объявления</a></li>');   
   $('#tabs-3').html('');
   $('#tabs-4').html('');
   if (Cookies.get('rentUser')) {
    let dates = Cookies.getJSON('rentUser');
    $.ajax({
        type: "POST",
        url: "/api/Users",
        data: {
            email: dates[0],
            password: dates[1]
        },
        success: function (data) {
            let lease = $('.left');
            lease.html('');
            console.log(data);
            lease.append('<table>');
            lease.append('<tr><th style="padding-left:50px;">id</th><th style="padding-left:80px;">Имя</th><th style="padding-left:50px;">Фамилия</th></tr>');
            for (let index = 0; index < data.length; index++) {
                lease.append('<tr class="premises"><td>' + data[index].id + '</td><td>' + data[index].name + '</td><td>' + data[index].surname + '</td><td><button onclick=deleteUser(' + data[index].id + ')>Удалить</button></td></tr>');


            }
            lease.append('</table>');
        }
    })

}
if (Cookies.get('rentUser')) {
    let dates = Cookies.getJSON('rentUser');
    $.ajax({
        type: "POST",
        url: "/api/premises",
        data: {
            email: dates[0],
            password: dates[1]
        },
        success: function (data) {
            let right = $('.right');
            right.html('');


            right.append('<table>');
            right.append('<tr><th>Объявление №</th><th>Город</th><th>Площадь</th><th>Цена</th><th>Описание</th></tr>');

            for (let index = 0; index < data.length; index++) {
                right.append('<tr class="premises"><td>' + data[index].id + '</td><td>' + data[index].address + '</td><td>' + data[index].area + '</td><td>' + data[index].price + '</td><td><p  class="clip photo"  data-title="' + data[index].description + '">' + data[index].description + '</p></td><td><button onclick=deleteItem(' + data[index].id + ')>Удалить</button></td></tr>');


            }
            right.append('</table>');
        }
    })
}
}
}
})
}
});
function editItem(id){
    window.location.hash="tabs-4";
}
function deleteItem(id) {
    $.ajax({
        type: "POST",
        url: "/api/delete",
        data: {
            id: id,

        },
        success: function (data) {
            if (data == 'Success') {
                window.location.reload();
            } else {
                alert('error');
            }
        },
    })
}
function deleteUser(id) {
    $.ajax({
        type: "POST",
        url: "/api/deleteUser",
        data: {
            id: id,

        },
        success: function (data) {
            if (data == 'Success') {
                window.location.reload();
            } else {
                alert('error');
            }
        },
    })
}
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
function show(){
    $('#cover').slideDown('slow');
  }