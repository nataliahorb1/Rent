$(function () {
login();

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
    let temp = $("#ptype option:selected").text();
    changeOp();
    $("#ptype").change(function () {
        temp = $("#ptype option:selected").text();
        changeOp();

    });

    function changeOp() {
        let ctype = $('#ctype');
        let main = $('#main');
        if (temp == 'Квартиры') {
            ctype.html('');
            main.html('');
            ctype.append('<option>Все типы</option>');
            ctype.append('<option>Квартира</option>');
            ctype.append('<option>Комната</option>');
            main.append('<span>Общая</span> <input placeholder="От" type="text" style="margin-left:30px;" name="formArea" id=""> <input placeholder="До" type="text" style="margin-left:30px;" name="toArea" ><br/>');
            main.append('<span>Цена</span> <input placeholder="От" type="text" style="margin-left:40px;" name="fromPrice" id=""> <input placeholder="До" style="margin-left:30px;" type="text" name="toPrice" ><br/>');
            main.append('<input  type="submit" onclick="search();"  value="Поиск" ><br/>');

        } else if (temp == 'Дома') {
            ctype.html('');
            main.html('');
            ctype.append('<option>Все типы</option>');
            ctype.append('<option>Дом</option>');
            ctype.append('<option>Часть дома</option>');
            ctype.append('<option>Дача</option>');
            main.append('<span>Общая пл.</span> <input placeholder="От" type="text" style="margin-left:5px;" name="formArea" id=""> <input placeholder="До" style="margin-left:30px;" type="text" name="toArea" ><br/>');
            main.append('<span>Цена</span> <input placeholder="От" type="text" style="margin-left:40px;" name="fromPrice" id=""> <input placeholder="До" type="text" style="margin-left:30px;" name="toPrice" ><br/>');
            main.append('<input  type="submit" onclick="search();" value="Поиск"><br/>');
        } else if (temp == 'Коммерческая недвижимость') {
            ctype.html('');
            main.html('');
            ctype.append('<option>Все типы</option>');
            ctype.append('<option>Торговые площади</option>');
            ctype.append('<option>Складские помещения</option>');
            ctype.append('<option>Производственные помещения</option>');
            ctype.append('<option>Кафе, бар, ресторан</option>');
            ctype.append('<option>Объект сферы услуг</option>');
            ctype.append('<option>Отель, гостиница</option>');
            ctype.append('<option>База отдыха, пансионат</option>');
            ctype.append('<option>Помещения свободного назначения</option>');
            ctype.append('<option>Готовый бизнес</option>');
            main.append('<span>Общая пл</span><input placeholder="От" type="text"  style="margin-left:12px;"  name="formArea" id=""> <input placeholder="До" style="margin-left:30px;" type="text" name="toArea" ><br/>');
            main.append('<span>Цена</span> <input placeholder="От" type="text"  style="margin-left:40px;"  name="fromPrice" id=""> <input placeholder="До" type="text"  style="margin-left:30px;"  name="toPrice" ><br/>');
            main.append('<input  type="submit" value="Поиск" ><br/>');
        } else if (temp == 'Офисы') {
            ctype.html('');
            main.html('');
            ctype.append('<option>Все типы</option>');
            ctype.append('<option>Офисные помещения</option>');
            ctype.append('<option>Офисные здания</option>');
            main.append('<span>Общая пл</span> <input placeholder="От" type="text" style="margin-left:10px;"  name="formArea" id=""> <input placeholder="До"   style="margin-left:30px;"  type="text" name="toArea" ><br/>');
            main.append('<span>Цена</span> <input placeholder="От" type="text"  style="margin-left:40px;"  name="" id=""> <input placeholder="До"  style="margin-left:30px;"  type="text" name="toPrice" ><br/>');
            main.append('<input  type="submit" onclick="search();" name="Поиск" ><br/>');
        } else if (temp == 'Земельные участки') {
            ctype.html('');
            main.html('');
            ctype.append('<option>Все типы</option>');
            ctype.append('<option>Участок под жилую застройку</option>');
            ctype.append('<option>Земля коммерческого назначения</option>');
            ctype.append('<option>Земля сельскохозяйственного назначения</option>');
            ctype.append('<option>Земля рекреационного назначения</option>');
            ctype.append('<option>Земля природно-заповедного назначения</option>');
            main.append('<span>Площадь</span> <input placeholder="От" type="text" name="formArea"  style="margin-left:15px;"  id=""> <input placeholder="До"  style="margin-left:30px;"  type="text" name="toArea" ><br/>');
            main.append('<span>Цена</span> <input placeholder="От"  style="margin-left:40px;"  type="text" name="" id=""> <input placeholder="До" type="text"  style="margin-left:30px;"  name="toPrice" ><br/>');
            main.append('<input  type="submit" onclick="search();" value="Поиск"><br/>');
        } else if (temp == 'Гаражи') {
            ctype.html('');
            main.html('');
            ctype.append('<option>Все типы</option>');
            ctype.append('<option>Бокс в гаражном комплексе</option>');
            ctype.append('<option>Подземный паркинг</option>');
            ctype.append('<option>Место в гаражном кооперативе</option>');
            ctype.append('<option>Отдельно стоящий гараж</option>');
            ctype.append('<option>Место на стоянке</option>');
            main.append('<span>Общая пл</span> <input placeholder="От"  style="margin-left:8px;"  type="text" name="fromArea" id=""> <input placeholder="До"  style="margin-left:30px;"  type="text" name="toArea" ><br/>');
            main.append('<span>Цена</span> <input placeholder="От" type="text"  style="margin-left:40px;"  name="fromPrice" id=""> <input placeholder="До" type="text"  style="margin-left:30px;"  name="toPrice" ><br/>');
            main.append('<input  type="submit" onclick="search();" value="Поиск"><br/>');
        }
    }

});


function search() {

    let address = $("select[name=city] option:selected").val();
    let ptype = $("select[name=ptype] option:selected").text();
    let ctype = $("select[name=ctype] option:selected").text();
    let fromArea = $("input[name=formArea]").val();
    let toArea = $("input[name=toArea]").val();
    let fromPrice = $("input[name=fromPrice]").val();
    let toPrice = $("input[name=toPrice]").val();
    if (isEmpty(fromArea, toArea, fromPrice, toPrice)) {
        $.ajax({
            type: "POST",
            url: "/api/search",
            data: {
                city: address,
                ptype: ptype,
                ctype: ctype,
                fromArea: fromArea,
                toArea: toArea,
                fromPrice: fromPrice,
                toPrice: toPrice
            },
            success: function (data) {
                if (data == 'Success') {
                    window.location.href = '/search';
                }
            },
        })
    } else {
        $('.error').text('Вы заполнили не все поля').stop().fadeIn(400).delay(1000).fadeOut(400); //fade out after 3 seconds      
    }

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