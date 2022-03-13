const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const embeds = require('../embeds/Commands/embeds.js')
const macros = require('./macros.js');
const query1 = `SELECT * FROM Users WHERE OrderID = ?`;
const query2 = `INSERT INTO Users(OrderID, DiscordID, RedeemedOn, Expiry) VALUES (?,?,?,?)`

const Discord = require("discord.js")
function embedOrder(data, index) {
    const current = data.slice(index, index + 5);
    const dataEmbed = new Discord.MessageEmbed()
        .setTitle('List of Orders')
        .setThumbnail('https://cdn.sellix.io/static/logo/single-less-border.png')
        .setTimestamp()
        .setColor('#00ff3c')
        .setDescription(`Displaying ${index + 1}-${index + current.length} out of ${data.length} orders`);
    current.forEach(order => {
        dataEmbed.addField(`Order ${order.uniqid}`, `\`\`\`Product: ${order.product_title}\nGateway: ${order.gateway} (${order.status})\nEmail: ${order.customer_email}\n${macros.displayDate(order.created_at)}\`\`\``)
    });
    return dataEmbed;
}



function filterOrders(filter, orders) {
    let filteredOrders = [];
    for (var [key, value] of Object.entries(orders)) {
        if (value.status == filter)
            filteredOrders.push(value);
    }
    return filteredOrders;
}


function isMention(mention) {
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }
        return mention
    }



}




module.exports = {
    name: "redeem",
    guildOnly: true,
    adminOnly: false,
    execute(message, args, db, client) {
        if (!args.length) return message.reply('Format is **!redeem [OrderID]**')
        const OrderID = args[0];
        const DiscordID = args[1] ? isMention(args[1]) : message.author.id;
        const DateRedeemed = new Date().getTime() / 1000;



        API.getOrder(OrderID).then(data => {
            if (!args.length) return message.reply('Format is **!redeem [OrderID]**')
            if (!data.data) throw Error('No Order Data Found!');




            data = data.data.order;
            if (data.status != "COMPLETED") return message.reply(`Order is not completed. Status is **${data.status}**`);
            db.serialize(function () {
                db.get(query1, [OrderID], function (err, row) {
                    if(row)return message.reply('License already redeemed!');
                    if (err) return message.reply(err.message)








                    const fs = require('fs');




                    const path = `./${message.author.id}.json`
                    const path1 = `./${OrderID}.json`
                    const path2 = `./${data.customer_email}.json`
                    const path3 = `./${data.ip}.json`




                    
                    if (data.product_id === "61e96d91258c9" || data.product_id === "61e96f1a835a0"|| data.product_id === "61e9712ade192"|| data.product_id === "622c6d7aa91e2"|| data.product_id === "6219428ae8e87"|| data.product_id === "62193e1a6fc90"|| data.product_id === "62194061172c2"|| data.product_id === "621ca8a729e47"|| data.product_id === "61e98732be3b0" || data.product_id === "62027d86f192f") return message.channel.send({ content: 'Please wait for Bix to get on                    '})

                    message.guild.channels.cache.forEach((channel) => {
                        if (channel.parentId != "948244716552614028") return;
                        channel.send("Please leave a vouch on <#933713774937010196> and on Sellix. It would be so appreciated <3 Go to your email and find this -> https://cdn.discordapp.com/attachments/939916717386244166/942345883255726110/image.png Leave feedback")
                    })


                    let userdata = { 
                        User: `${message.author.tag}`,
                        Userid: `${message.author.id}`, 
                        OrderID: `${OrderID}`,
                        Email: `${data.customer_email}`,
                        Ip: `${data.ip}`
                    };
                     
                    let data1 = JSON.stringify(userdata, null, 2);

                    fs.access(path2, fs.F_OK, (err) => {
                        if (err) {
                            fs.writeFileSync(`${data.customer_email}.json`, data1);
                        }




                        try {
                            fs.unlinkSync(path2)
                            fs.writeFileSync(`${data.customer_email}.json`, data1);
                        } catch (err) {
                            console.error(err)
                        }
                    })






                    fs.access(path, fs.F_OK, (err) => {
                        if (err) {
                            fs.writeFileSync(`${message.author.id}.json`, data1);
                        }




                        try {
                            fs.unlinkSync(path)
                            fs.writeFileSync(`${message.author.id}.json`, data1);
                        } catch (err) {
                            console.error(err)



                        }
                    })


                   


                    fs.access(path1, fs.F_OK, (err) => {
                        if (err) {
                            fs.writeFileSync(`${OrderID}.json`, data1);
                        }




                        try {
                            fs.unlinkSync(path1)
                            fs.writeFileSync(`${OrderID}.json`, data1);
                        } catch (err) {
                            console.error(err)
                        }
                    })



                    const role = message.member.guild.roles.cache.get(config.role_to_give)
                    message.guild.members.cache.get(DiscordID).roles.add(role);
                    if (data.product_id === "62028066dbb8a") return message.channel.send({ content: 'Thanks for buying', files: ["./selix.txt"] })
                    if (data.product_id === "61e97776de284") return message.channel.send({ content: 'Thanks for buying', files: ["./discord.txt"] })
                    if (data.product_id === "61e9894de6f37") return message.channel.send({ content: 'Thanks for buying', files: ["./30gen.txt"] })
                    if (data.product_id === "61ebeda0190e2") return message.channel.send("Thanks for buying https://anonfiles.com/Dci7ee1du5/99x_CHECKERS_rar")
                    if (data.product_id === "61fece44f404d") return message.channel.send({ content: 'Thanks for buying', files: ["./unhold.txt"] })
                    if (data.product_id === "61fd59ff26e48") return message.channel.send({ content: 'Thanks for buying', files: ["./freegc.txt"] })
                    if (data.product_id === "61e97225a394c") return message.channel.send({ content: 'Thanks for buying', files: ["./amazguid.txt"] })
                    if (data.product_id === "61e987f3c5c47") return message.channel.send({ content: 'Thanks for buying', files: ["./src.txt"] })
                    if (data.product_id === "61eb16e8ca678") return message.channel.send({ content: 'Thanks for buying', files: ["./pp.txt"] })
                    if (data.product_id === "61e9c4bcacddd") return message.channel.send({ content: 'Thanks for buying', files: ["./rblx.txt"] })
                    if (data.product_id === "61f451c7e429d") return message.channel.send({ content: 'Thanks for buying', files: ["./drop.txt"] })
                    if (data.product_id === "61eb1772da666") return message.channel.send({ content: 'Thanks for buying', files: ["./vrpp.txt"] })
                    if (data.product_id === "61fd221882aad") return message.channel.send({ content: 'Thanks for buying', files: ["./fn.txt"] })
                    if (data.product_id === "61fd638a44206") return message.channel.send({ content: 'Thanks for buying', files: ["./nike.txt"] })
                    if (data.product_id === "61f64f7209da0") return message.channel.send({ content: 'Thanks for buying', files: ["./open.txt"] })
                    if (data.product_id === "61f45e3e494f4")  return message.channel.send({ content: 'Thanks for buying', files: ["./crack.txt"] })
                    if (data.product_id === "62028272028d9") return message.channel.send({ content: 'Thanks for buying', files: ["./steam.txt"] })
                    if (data.product_id === "61f260f46d624") return message.channel.send({ content: 'Thanks for buying', files: ["./Giftcard_gen.rar"] })
                    if (data.product_id === "61f6d5a84413e") return message.channel.send({ content: 'Thanks for buying', files: ["./Advertise_Tool_-_By_Bix.rar"] })
                    if (data.product_id === "621279fa7dc1d") return message.channel.send({ content: 'Thanks for buying', files: ["./nitro_gen__checker.rar"] })
                    if (data.product_id === "622c6fa91c750") return message.channel.send({ content: 'Thanks for buying', files: ["./Discord_Spam_Tool.rar"] })
                    if (data.product_id === "61f1bbf263b9a") return message.channel.send({ content: 'Thanks for buying', files: ["./g2aa.txt"] })
                    if (data.product_id === "61fd65202735f") return message.channel.send({ content: 'Thanks for buying', files: ["./adidas.txt"] })
                    if (data.product_id === "61f1c2431a78d") return message.channel.send({ content: 'Thanks for buying', files: ["./hack.txt"] })
                    if (data.product_id === "61fd24992de9f") return message.channel.send({ content: 'Thanks for buying', files: ["./blueinsta.txt"] })
                    if (data.product_id === "61eb18d05e3da") return message.channel.send({ content: 'Thanks for buying', files: ["./gc2.txt"] })
                    if (data.product_id === "61e985c9ea09e") return message.channel.send({ content: 'Thanks for buying', files: ["./STEAM_ACHIEVEMENT_UNLOCKER.rar"] })
                    if (data.product_id === "61e9798d54d2c") return message.channel.send({ content: 'Thanks for buying', files: ["./netflix.txt"] })
                    if (data.product_id === "61e97a78aa889") return message.channel.send({ content: 'Thanks for buying', files: ["./vraud.txt"] })
                    if (data.product_id === "61e97308b4593") return message.channel.send({ content: 'Thanks for buying', files: ["./aged.txt"] })
                    if (data.product_id === "622c7159892d3") return message.channel.send({ content: 'Thanks for buying', files: ["./varried.txt"] })
                    if (data.product_id === "6207f199d11f2") return message.channel.send({ content: 'Thanks for buying', files: ["./Amazon_storecard_Gen.rar"] })
                   


                    


                });
            })




        })






    }
}
