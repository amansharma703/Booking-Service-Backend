/* eslint-disable max-len */
import nodemailer from "nodemailer";

export class Email {

    public sendConfirmationEmail = (email: string, seatIds: string): Promise<any> => {
        const content = `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466A;text-decoration:none;font-weight:600">Flurn Booking Service</a>
                    </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Thank you for choosing Flurn Booking Service. Your Ticket Booking is Confirm for seat no - </p>
                    <h2 style="background: #00466A;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${seatIds}</h2>
                    <p style="font-size:0.9em;">Regards,<br />Flurn Booking Service</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                </div>
            </div>
        `;
        const subject = `Flurn Booking Service: Ticket Booking Confirmation!!`;
        return this.sendMail(content, email, subject);
    };

    private sendMail = async (content: any, toEmail: string, subject: string) => {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.NODE_MAILER_CLIENT_ID,
                    pass: process.env.NODE_MAILER_CLIENT_SCERET,
                },
                logger: true
            });

            await transporter.sendMail({
                from: process.env.NODE_MAILER_CLIENT_ID,
                to: toEmail,
                subject,
                html: content,
                headers: { 'x-myheader': 'test header' }
            });
            return true;
        } catch (error) {
            throw new Error(error);
        }
    };

}
