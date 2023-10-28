const nodemailer = require("nodemailer");
const { env } = require("process");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
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

    const { firstName, lastName, email, phoneNumber,
        preferredDate, contactTime, desiredService, message } = body;

    const info = await transporter.sendMail({
        from: '"Vector Mail Bot" <vectormailbot@gmail.com>',
        to: "vectorglass@comcast.net",
        subject: `New Contact From: ${firstName}`,
        text: `First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}
        Phone number: ${phoneNumber}
        Preferred date: ${preferredDate}
        Best time to contact: ${contactTime}
        Desired service: ${desiredService}
        Message: ${message}`,
        html: `<style>*{font-family:verdana;}.data-span{font-weight:100;}</style>
        <h3>First Name: <span class="data-span">${firstName}</span></h3>
        <h3>Last Name: <span class="data-span">${lastName}</span></h3>
        <h3>Email: <span class="data-span">${email}</span></h3>
        <h3>Phone number: <span class="data-span">${phoneNumber}</span></h3>
        <h3>Preferred date: <span class="data-span">${preferredDate}</span></h3>
        <h3>Best time to contact: <span class="data-span">${contactTime}</span></h3>
        <h3>Desired service: <span class="data-span">${desiredService}</span></h3>
        <h3>Message: <span class="data-span">${message}</span></h3>`,
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email sent.' }),
    };
}