let id_item;
let id_landlord;
$(function(){
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
   $('#btnClose').click(function () {
    $('#cover').slideUp('slow');
  });
       $('#btnCloser').click(function () {
    $('#cover').slideUp('slow');
  });  
     $('#btnClose1').click(function () {
    $('#cover').slideUp('slow');
  });
$('ul.tabs li:first').addClass('active');
$('.block article').hide();
$('.block article:first').show();
$('ul.tabs li').on('click',function(){
$('ul.tabs li').removeClass('active');
$(this).addClass('active')
$('.block article').hide();
var activeTab = $(this).find('a').attr('href');
$(activeTab).show();
    return false;
});
    $.ajax({
        type: "GET",
        url: "/api/item",
        data: {
    
        },
        success: function (data) {
            $('.item').html('');
            id_item= data.id_item;
            id_landlord= data.id_landlord;            
            console.log(data);
            $('.item').append(`
            <div class="leftItem">
                <img src='../img/`+ Math.round(Math.random() * (7 - 1) + 1)+`.jpg' alt="">
                <div class="infoLandlord">
                    <h5 style="font-size:15px;">Информация арендодателя</h5>
                    <span class="surnameLandlord" style="color:#A4A4A4; border:1px solid #A4A4A4; width:170px;height:30px;margin-bottom:10px;margin-top:10px;"><i style="font-size:22px;" class="fa fa-user fa-1x" aria-hidden="true"></i> <span style="padding:13.5px;margin-left:28px;position:relative;top:1.4px;border-left:1px solid  #A4A4A4;">`+data.surname+` `+data.name+`</span></span>
                    <span class="phoneLandlord"  style="color:#A4A4A4; border:1px solid #A4A4A4; width:170px;"><i  class="fa fa-mobile fa-2x" aria-hidden="true"></i> <span style="margin-left:30px;position:relative; top:-5.6px; padding: 14px; border-left:1px solid  #A4A4A4; ">`+data.phone+`</span></span>
                </div>
            </div>
            <div class="infoItem">
                <span class="itemType" >Тип недвижимости<span>`+data.ctype+`</span></span>
                <span class="itemAddress">Расположение недвижимости<span>`+data.address+`</span></span>
                <span class="itemDescription">Описание<br> <span>`+data.description+`</span></span>
                <span class="itemPrice">`+data.price+`USD / месяц <button onclick='show();'>Оформить заказ</button></span>
            </div>
        `);

        }
})

});

function show(){
  $('#cover').slideDown('slow');
}
 
function tenantIndividual(){
        let name  = $('#tab1>input[name=name]').val();
         let surname  = $('#tab1>input[name=surname]').val();
         let patronymic  = $('#tab1>input[name=patronymic]').val();
         let phone  = $('#tab1>input[name=phone]').val();
         let address  = $('#tab1>input[name=address]').val();
    if(isEmpty(name,surname,patronymic,phone,address))
    {
    $.ajax({
        type: "POST",
        url: "/api/tenantIndividual",
        data: {
            id_landlord:id_landlord,
            id:id_item,
            name:name,
            surname:surname,
            patronymic:patronymic,
            phone:phone,
            address:address
        },
        success: function (data) {
            if(data=='Success'){
                    $('.error').text('Вы арендовали недвижемость. В течении нескольких дней с вами свяжется арендодатель.').stop().fadeIn(400).delay(1000).fadeOut(400); //fade out after 3 seconds                      
            }
        }
    })
    }
    else
    {
                    $('.error').text('Вы заполнили не все поля').stop().fadeIn(400).delay(1000).fadeOut(400); //fade out after 3 seconds      
    }
}
 function tenantEntity(){
       let title  = $('#tab2>input[name=title]').val();
         let ITN  = $('#tab2>input[name=ITN]').val();
         let manager  = $('#tab2>input[name=manager]').val();
         let phone  = $('#tab2>input[name=phone]').val();
         let address  = $('#tab2>input[name=address]').val();
         if(isEmpty(title,ITN,manager,phone,address))
         {
$.ajax({
        type: "POST",
        url: "/api/tenantEntity",
        data: {
            id_landlord:id_landlord,
            id:id_item,
            title:title,
            ITN:ITN,
            manager:manager,
            phone:phone,
            address:address
        },
        success: function (data) {
 if(data=='Success'){
                    $('.error').text('Вы арендовали недвижемость. В течении нескольких дней с вами свяжется арендодатель.').stop().fadeIn(400).delay(1000).fadeOut(400); //fade out after 3 seconds                      
            }
              
        }
})
         }
         else{
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