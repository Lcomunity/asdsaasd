const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const embeds = require('../embeds/Commands/embeds.js')
const macros = require('./macros.js');
const query1 = `SELECT * FROM Users WHERE OrderID = ?`;
const query2 = `INSERT INTO Users(OrderID, DiscordID, RedeemedOn, Expiry) VALUES (?,?,?,?)`


function embedOrder(data, index)
{
    const current = data.slice(index, index + 5);
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('List of Orders')
        .setThumbnail('https://cdn.sellix.io/static/logo/single-less-border.png')
		.setTimestamp()
		.setColor('#00ff3c')
		.setDescription(`Displaying ${index + 1}-${index + current.length} out of ${data.length} orders`);
	current.forEach(order =>{
        dataEmbed.addField(`Order ${order.uniqid}`,`\`\`\`Product: ${order.product_title}\nGateway: ${order.gateway} (${order.status})\nEmail: ${order.customer_email}\n${macros.displayDate(order.created_at)}\`\`\``)
    });
	return dataEmbed;
}


function filterOrders(filter,orders)
{
    let filteredOrders = [];
    for(var [key,value] of Object.entries(orders))
    {
        if(value.status == filter)
            filteredOrders.push(value);
    }
    return filteredOrders;
}


function isMention(mention)
{
    if (mention.startsWith('<@') && mention.endsWith('>')) 
		{
			mention = mention.slice(2, -1); 
			if (mention.startsWith('!')) 
			{
				mention = mention.slice(1);
			}
			return mention
		}



}




module.exports = {
    name: "file",
    guildOnly: true,
    adminOnly: false,
    execute(message,args,db){
  
        
        
     
        


            
      


        
        
        }
    }
