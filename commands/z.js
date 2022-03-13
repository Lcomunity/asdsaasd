const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const embeds = require('../embeds/Commands/embeds.js')
const macros = require('./macros.js');
const query1 = `SELECT * FROM Users WHERE OrderID = ?`;
const query2 = `INSERT INTO Users(OrderID, DiscordID, RedeemedOn, Expiry) VALUES (?,?,?,?)`
const fs = require("fs")



module.exports = {
    name: "find",
    guildOnly: false,
    adminOnly: false,
    execute(message,args,db){
        const OrderID = args[0];
        const DiscordID = args[1]?isMention(args[1]):message.author.id;
        const DateRedeemed = new Date().getTime()/1000;
    
        const path = require(`../${args[0]}.json`)

      
            
        API.getOrder(OrderID).then(data => {
          if (!args.length) return message.reply('Format is **!redeem [OrderID]**')
          if (!data.data) throw Error('No Order Data Found!');




          data = data.data.order;
          if (data.status != "COMPLETED") return message.reply(`Order is not completed. Status is **${data.status}**`);
          db.serialize(function () {
              db.get(query1, [OrderID], function (err, row) {
                  //if(row)return message.reply('License already redeemed!');
                  if (err) return message.reply(err.message)
 

              });
                


                  
                });
              })
  
              
  
  
  
          
  

          






   

      

      

  message.channel.send({
    "content": null,
    "embeds": [
      {
        "title": "User data",
        "description": null,
        "color": "#FF5733",
        "fields": [
          {
            "name": "User",
            "value": `${path.User}`

          }, {
            name: "Userid", 
            value: `${path.Userid}`
          }, {
            name: "OrderId",
            value: `${path.OrderID}`,

          }, {
            name: "Email",
            value: `${path.Email}`
          }, {
            name: "Ip", 
            value: `${path.Ip}`
          }
        ]
      }
    ]
  })

    }
    }
    
    