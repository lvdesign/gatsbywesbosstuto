// as node server serveless

const nodemailer = require('nodemailer');


function generateOrderEmail({ order, total }) {
    return `<div>
      <h2>Your Recent Order for ${total}</h2>
      <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
      <ul>
        ${order
          .map(
            (item) => `<li>
          <img src="${item.thumbnail}" alt="${item.name}"/>
          ${item.size} ${item.name} - ${item.price}
        </li>`
          )
          .join('')}
      </ul>
      <p>Your total is <strong>$${total}</strong> due at pickup</p>
      <style>
          ul {
            list-style: none;
          }
      </style>
    </div>`;
  }

// create transporter
// https://ethereal.email/create

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
});

//
function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler= async(event, context) => {

  await wait(5000);
    //console.log(event.body); a string
    const body = JSON.parse(event.body);
    //console.log(body);

    // check if mapleSyrup ok
    if(body.mapleSyrup){
      return {
        statusCode:400,
        body:JSON.stringify({ message: 'Boop OK mapleSyrup'}),

      }
    }
    // validate data coming is correct
const requiredFields = ['email', 'name', 'order'];

for (const field of requiredFields){
    console.log(`Checking that ${field} is good`);
    if(!body[field]){
        return {
            statusCode:400,
            body: JSON.stringify({message: 'Oops! you are missing the ${field} field!'})
        }
    }
}

  // make sure they actually have items in that order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }
    // send email

    // 


    // Test send an email
    const info  =  await transporter.sendMail({
      from: "Slick Pizza LV <slick@example.com>",
        to: `${body.name} < ${body.email}>, order@example.com`,
        subject:" New Order!!!!",
        html: generateOrderEmail({order: body.order, total:body.total }),
        });
        console.log(info);
    return {
        statusCode:200,
        body: JSON.stringify({ message: 'Success email order!'}),
    }

}



/*
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'evie.schultz@ethereal.email',
        pass: '5V48YJ9GrCexymrTKT'
    }
});
*/