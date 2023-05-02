import nodeMailer from "nodemailer"

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({

        service: 'gmail',
        auth: {
            user: 'ajayverma97924@gmail.com',
            pass: '6304737356'
        }
    });

    const mailOptions = {
        from: '"Ajay Verma" <ajayverma@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    console.log("messesage info : %s", mailOptions.messageId)

    await transporter.sendMail(mailOptions);
}

export default sendEmail