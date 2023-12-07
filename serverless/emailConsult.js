const nodemailer = require("nodemailer");
const { env } = require("process");
console.log(env.EMAIL_ACCOUNT, env.EMAIL_PASSWORD);

const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
        user: env.EMAIL_ACCOUNT,
        pass: env.EMAIL_PASSWORD,
    },
});

exports.handler = async (event) => {
    let body;
    try {
        body = JSON.parse(event.body);
    } catch (parseError) {
        console.error('Invalid JSON format: ', parseError);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'JSON Error.', parseError }),
        };
    }

    const { name, email, phone, consultDay, consultTime } = body;

    try {
        await transporter.sendMail({
            from: '"Stover Mailer" <stover-mailer@tayven-stover.com>',
            to: "tayvenstover@gmail.com",
            subject: `SCR Contact: ${name}`,
            text: `Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Consult Day: ${consultDay}
            Consult Time: ${consultTime}`,
            html: `<style>*{font-family:verdana;}.data-span{font-weight:100;}</style>
            <h3>Name: <span class="data-span">${name}</span></h3>
            <h3>Email: <span class="data-span">${email}</span></h3>
            <h3>Phone: <span class="data-span">${phone}</span></h3>
            <h3>Consult Day: <span class="data-span">${consultDay}</span></h3>
            <h3>Consult Time: <span class="data-span">${consultTime}</span></h3>`,
        })
    
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent.' }),
        }
    } catch(error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error sending email.', error: error }),
        }
    }
}