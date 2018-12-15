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
    })
     $('#loguot').click(function () {
    Cookies.remove('rentUser');
    window.location.reload();
  });
$(function(){ 

$.ajax({
    type: "POST",
    url: "/api/searchItem",
    data: {
       
    },
    success: function (data) {
        let card = $('#cards');
        card.html('');
        if(data.length==0){
            $('.error').text('Объявление по данному запросу не найдено').stop().fadeIn(400).delay(1000).fadeOut(400);             
        }
        for (let index = 0; index < data.length; index++) {
            card.append('<div class="card" onclick="id_item('+data[index].id+');"><img src="../img/'+ Math.round(Math.random() * (7 - 1) + 1)+'.jpg" alt=""><div class="info"><div class="types">'+data[index].ctype+'</div><div class="prices">'+data[index].price+'USD / месяц</div><div class="address"><img src="../img/location.png" alt=""><span>'+data[index].address+'</span></div></div></div>');
        }
        // <div class="card">
        //                 <img src="http://z500proekty.ru/thumbs/350x197s20/-FilesZ500-res-wizualizacje-Zx113-Zx113_view1_jpg.jpg" alt="">
        //                 <div class="info">
        //                     <div class="types">Дома</div>
        //                     <div class="prices">1000USD / месяц</div>
        //                     <div class="address"><img src="../img/location.png" alt=""><span>Киев</span></div>
                            
        //                 </div>
        //             </div>
    }
});

});

function id_item(id){
    $.ajax({
        type: "POST",
        url: "/api/id_item",
        data: {
           id:id
        },
        success: function (data) {
            if(data=='Success')
            {
                window.location.href='../item';
            }
        }
})
}