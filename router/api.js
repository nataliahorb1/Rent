var express = require('express');
var router = express.Router();
let http = require('http');
let mysql = require('mysql');
let client = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'rent'
});
let urlencodedParser = require('body-parser').urlencoded({extended: false});
var tem = null;
router.post("/search", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    if(request.body.ctype=='Все типы')
    {
        client.query('SELECT * FROM premises WHERE address="'+request.body.city+'" AND ptype="'+request.body.ptype+'" AND price>"'+request.body.fromPrice+'" AND price<"'+request.body.toPrice+'" AND area>"'+request.body.fromArea+'" AND area<"'+request.body.toArea+'"', function(error, result, fields){
            console.log(error);
            if(error==null)
           {
               tem = result;
               response.send('Success');
           }
        
        });
    }
    else{
        client.query('SELECT * FROM premises WHERE address="'+request.body.city+'" AND ptype="'+request.body.ptype+'" AND ctype="'+request.body.ctype+'" AND price>"'+request.body.fromPrice+'" AND price<"'+request.body.toPrice+'" AND area>"'+request.body.fromArea+'" AND area<"'+request.body.toArea+'"', function(error, result, fields){
            console.log(error);
            if(error==null)
           {
            tem = result;
            
            response.send('Success');
           }
        
        });
    }
    
});
router.post("/searchItem", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);

    response.send(tem);
});

router.post("/login", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    client.query('SELECT * FROM landlord WHERE email="'+request.body.email+'" AND password="'+request.body.password+'"', function(error, result, fields){
            if(result.length>0){
                response.send('Success');   
            }
            else{
               response.send('Error');
            }
    });
});
let id_item;
router.post("/id_item", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    id_item = request.body.id;
    console.log(id_item);
    response.send('Success');
});
router.get("/item", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    client.query('SELECT * FROM premises WHERE id="'+id_item+'"', function(er, res, fi){
        
        client.query('SELECT * FROM landlord WHERE id='+res[0].id_landlord+'', function(error, result, fields){
            let obj = Object.assign(res[0],result[0],{id_item:id_item})  
            console.log(obj);
            
            response.send(obj);
            
       });
      
   });
});

router.post("/dataUser", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    client.query('SELECT * FROM landlord WHERE email="'+request.body.email+'" AND password="'+request.body.password+'"', function(error, result, fields){
            if(result.length>0){
                response.send(result);
            }
            else{
            }
    });
});
router.post("/lease", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    client.query('SELECT * FROM landlord WHERE email="'+request.body.email+'" AND password="'+request.body.password+'"', function(error, result, fields){
            if(result.length>0){
                     let obj  = {};
                     console.log(result);
                    client.query('SELECT tenant.phone,tenant.address FROM tenant, lease,landlord WHERE tenant.id=lease.id_tenant AND lease.id_landlord="'+result[0].id+'" AND  landlord.email="'+request.body.email+'" AND landlord.password="'+request.body.password+'"', function(error, result, fields){
                        obj = result;
                        console.log(result);
                    });
                    client.query('SELECT tenant.id,tenant.phone,tenant.address, individual.surname,individual.name,individual.patronymic FROM individual,tenant, lease,landlord WHERE individual.id_tenant=tenant.id AND tenant.id=lease.id_tenant AND lease.id_landlord="'+result[0].id+'" AND  landlord.email="'+request.body.email+'" AND landlord.password="'+request.body.password+'"', function(error, result, fields){
                    // for (let index = 0; index < obj.length; index++) {
                    //     obj[index] = Object.assign(obj[index],result[index]); 
                    // }
                        console.log(result);
                    response.send(result);
                        
                 });
            }
            else{
            }
    });
});
router.post("/userPremises", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    client.query('SELECT * FROM landlord WHERE email="'+request.body.email+'" AND password="'+request.body.password+'"', function(error, result, fields){
            if(result.length>0){
                client.query('SELECT * FROM premises WHERE id_landlord="'+result[0].id+'"', function(er, res, fi){
                     
                    console.log(res);
                    
                    response.send(res);
                });
            }
            else{
            }
    });
});
router.post("/isAdmin", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    client.query('SELECT access FROM landlord WHERE email="'+request.body.email+'" AND password="'+request.body.password+'"', function(error, result, fields){
            if(result.length>0){
                     
                    console.log(result);
                    
                    response.send(result);
            }
            else{
            }
    });
});
router.post("/Users", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    client.query('SELECT * FROM landlord WHERE NOT access=1', function(error, result, fields){
            if(result.length>0){
                     
                    console.log(result);
                    
                    response.send(result);
            }
            else{
            }
    });
});
router.post("/premises", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
                client.query('SELECT * FROM premises', function(er, res, fi){
                     
                    console.log(res);
                    
                    response.send(res);
                });
});

router.get("/temp", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
        response.send(tem);
});
router.post('/delete',urlencodedParser, function(request,response){
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    client.query('DELETE FROM premises WHERE id='+request.body.id+'', function(error, result, fields){
        if(error==null)
        {
            response.send('Success');
        }
        else{
            response.send('Error');
        }
    });
});
router.post('/deleteUser',urlencodedParser, function(request,response){
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    client.query('DELETE FROM landlord WHERE id='+request.body.id+'', function(error, result, fields){
        if(error==null)
        {
            response.send('Success');
        }
        else{
            response.send('Error');
        }
    });
});
router.post("/newAds", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
     console.log(request.body);
   client.query("SELECT id FROM landlord WHERE surname='"+request.body.surname+"' AND name='"+request.body.name+"' AND patronymic='"+request.body.patronymic+"'", function(error,result,fields){
       
        if(result.length!=0)
        {
            // INSERT INTO `premises`(`id`, `id_landlord`, `address`, `area`, `floor`, `price`, `description`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7])
            client.query('INSERT INTO `premises`(`id_landlord`, `address`,`ptype`,`ctype`, `area`, `price`, `description`) VALUES ('+result[0].id+',"'+request.body.address+'","'+request.body.ptype+'","'+request.body.ctype+'",'+request.body.area+','+request.body.price+',"'+request.body.description+'")', function(error, result, fields){
                    response.send('Success');
            });
        }
        else{
            response.send('Error');
        }
   });
});
router.post("/tenantIndividual", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
     console.log(request.body);
      client.query("SELECT id_tenant FROM `individual` WHERE surname='"+request.body.surname+"' AND name='"+request.body.name+"'", function(error,result,fields){
       console.log(error);
        if(result.length!=0)
        {
            client.query('INSERT INTO `lease`(`id_premises`, `id_tenant`,`id_landlord`) VALUES ('+request.body.id+',"'+result[0].id_tenant+'","'+response.body.id_landlord+'")');
              client.query('DELETE FROM premises WHERE id='+request.body.id+'');
              response.send('Success');
        }
         else
        {
             client.query('INSERT INTO `tenant`(`phone`, `address`) VALUES ("'+request.body.phone+'","'+request.body.address+'")');
             client.query("SELECT id FROM `tenant` WHERE phone='"+request.body.phone+"' AND address='"+request.body.address+"'", function(r,s,o){
                client.query('INSERT INTO `individual` (`id_tenant`,`surname`, `name`, `patronymic`) VALUES ('+s[0].id+',"'+request.body.surname+'","'+request.body.name+'","'+request.body.patronymic+'")', function(err, res, field){
       console.log(err);
                 
                });
                 client.query('INSERT INTO `lease`(`id_premises`, `id_tenant`,`id_landlord`) VALUES ('+request.body.id+',"'+s[0].id+'","'+request.body.id_landlord+'")');
                   client.query('DELETE FROM premises WHERE id='+request.body.id+'');
              response.send('Success');
                   
            });
            
        }
   });
  
});
router.post("/tenantEntity", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
     console.log(request.body);
      client.query("SELECT id_tenant FROM `entity` WHERE title='"+request.body.title+"' AND ITN='"+request.body.ITN+"'", function(error,result,fields){
       console.log(error);
        if(result.length!=0)
        {
              client.query('INSERT INTO `lease`(`id_premises`, `id_tenant`,`id_landlord`) VALUES ('+request.body.id+',"'+result[0].id_tenant+'","'+response.body.id_landlord+'")');
              client.query('DELETE FROM premises WHERE id='+request.body.id+'');
              response.send('Success');
        }
         else
        {
             client.query('INSERT INTO `tenant`(`phone`, `address`) VALUES ("'+request.body.phone+'","'+request.body.address+'")');
             client.query("SELECT id FROM `tenant` WHERE phone='"+request.body.phone+"' AND address='"+request.body.address+"'", function(r,s,o){
                client.query('INSERT INTO `entity` (`id_tenant`,`title`, `ITN`, `manager`) VALUES ('+s[0].id+',"'+request.body.title+'","'+request.body.ITN+'","'+request.body.manager+'")', function(err, res, field){
       console.log(err);
                 
                });
                     client.query('INSERT INTO `lease`(`id_premises`, `id_tenant`,`id_landlord`) VALUES ('+request.body.id+',"'+s[0].id+'","'+request.body.id_landlord+'")');
                   client.query('DELETE FROM premises WHERE id='+request.body.id+'');
              response.send('Success');
            });
            
        }
   });
   
});
router.post("/register", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
            client.query("INSERT INTO `landlord`(`surname`, `name`, `patronymic`, `phone`, `email`, `password`, `access`) VALUES ('"+request.body.surname+"','"+request.body.name+"','"+request.body.patronymic+"','"+request.body.phone+"','"+request.body.email+"','"+request.body.password+"',0)", function(error, result, fields){
                if(error==null)
                {
                    response.send('Success');
                }
            });
       
});
module.exports = router;