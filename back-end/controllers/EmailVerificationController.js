const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const nodemailer = require('nodemailer');

const DateServices = require("../services/DateServices");
const AccountServices = require("../services/AccountServices");
const CartServices = require("../services/CartServices");
const EmailVerificationServices = require("../services/EmailVerificationServices");
const UnverifiedAccountServices = require("../services/UnverifiedAccountServices");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log(`${DateServices.getTimeCurrent()} Connected email verificatiion controller to database successfully! ^-^`);
    } catch (err) {
        console.error(`${DateServices.getTimeCurrent()} Email verificatiion controller connection to database failed! Error: ${err}`);
    }
}

connectToDB();

app.use(express.json());

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, //true for port 465, false for other ports
    secure: false,
    auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_PASSWORD,
    }
});

class EmailVerificationController {

    static async addEmailVerification(req, res) {
        try {
            // Get email from body of request
            const Email = req.body.Email;

            // Create new email verification
            const NewEmailVerification = await EmailVerificationServices.createEmailVerification(Email);

            // Send code to user by email
            try {
                // Get code from new email verification
                const NewCode = NewEmailVerification.Code;

                await transporter.sendMail({
                    from: '"EZ-Laptop 💻" <ezlaptop.contact@gmail.com>',
                    to: Email,
                    subject: `🔑 ${NewCode} - Mã xác nhận của bạn 📧`,
                    text: `Mã xác nhận của bạn là: ${NewCode}`,
                    html: `<div dir="ltr" style="margin:0px;width:100%;background-color:#f3f2f0;padding:0px;padding-top:8px">
    <table role="presentation"
           valign="top" border="0"
           cellspacing="0"
           cellpadding="0"
           width="512"
           align="center"
           style="margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px;width:512px;max-width:512px;padding:0px;">
        <tbody>
        <tr>
            <td>
                <table role="presentation"
                       valign="top"
                       border="0"
                       cellspacing="0"
                       cellpadding="0"
                       width="100%"
                       style="background-color:#ffffff">
                    <tbody>
                    <tr>
                        <td style="padding:12px;text-align: center">
                            <table role="presentation"
                                   valign="top"
                                   border="0"
                                   cellspacing="0"
                                   cellpadding="0"
                                   width="100%"
                                   style="min-width:100%">
                                <tbody>
                                <tr>
                                    <td align="left" valign="middle">
                                        <a href="#"
                                           style="color:#FFB433;display: inline-block;text-decoration: none;width:188px"
                                           target="_blank">
                                            <img src="https://iili.io/36i8OX4.png" alt="EZ-Laptop logo"
                                                 style="outline:none;height:62px;width:188px" width="188" height="62"
                                                 data-bit="iit"/>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 24px;padding-right: 24px;padding-bottom: 24px">
                            <table role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0"
                                   width="100%">
                                <tbody>
                                <tr>
                                    <td>
                                        <p style="margin:0;font-weight: 400; font-size:16px;line-height:1.6">
                                            Nhập mã 6 chữ số bên dưới để xác nhận danh tính và nhận quyền truy cập tài
                                            khoản của bạn.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top:24px">
                                        <h1 style="margin:0; font-weight:500">
                                            <strong>${NewCode}</strong>
                                        </h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top:24px">
                                        <p style="margin:0;font-weight: 400; font-size:16px;line-height:1.6">
                                            Cảm ơn bạn đã giúp chúng tôi bảo mật tài khoản của bạn.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top:24px">
                                        <p style="margin:0;font-weight: 400; font-size:16px;line-height:1.6">
                                            Đội ngũ EZ - Laptop
                                        </p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#f3f2f0;padding:24px">
                            <table role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0"
                                   width="100%" style="font-size:12px;line-height:1.6">
                                <tbody>
                                <tr>
                                    <td style="margin:0px;padding-bottom:8px">
                                        Thư này được gửi tới <a href="mailto:${Email}" target="_blank">${Email}</a>
                                        <span>Nếu bạn có câu hỏi hay khiếu nại nào? Vui lòng <a href="#"
                                                                                                style="border:none;margin:0px;padding:0px;text-decoration: none;color:rgb(109,109,109);font-weight:bold"
                                                                                                target="_blank">liên hệ với chúng tôi</a>.</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="margin:0px;padding-bottom:8px">
                                        <a href="#" style="color:#FFB433;display: inline-block;text-decoration: none"
                                           target="_blank">
                                            <img src="https://iili.io/36i8OX4.png" alt="EZ-Laptop logo"
                                                 style="outline:none;display:block;height:48px;width:132px" height="48"
                                                 width="132" data-bit="iit"/>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        @2025 công ty EZ - Laptop, 402-A20, Ký túc xá khu A, ĐHQG-TP.HCM
                                        <br>
                                        <span>EZ - Laptop và nhãn hiệu EZ - Laptop là thương hiệu đã được đăng ký của EZ - Laptop</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        </tbody>
    </table>
</div>`
                });

                // Mail log
                console.log(`${DateServices.getTimeCurrent()} Email is sent to ${Email} successfully! ^-^`);

            } catch (err) { //Report an error
                res.status(400);
                console.error(`${DateServices.getTimeCurrent()} Can't send email! Error: ${err}`);
            }

            // Delete code after 30 seconds/
            const CodeID = NewEmailVerification._id;
            setTimeout(async () => {
                await EmailVerificationServices.deleteCodeByID(CodeID);
                console.log(`${DateServices.getTimeCurrent()} Code is deleted after 60 seconds successfully! ^-^`);
            }, 60000);

            return res.status(201).json(NewEmailVerification);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add email verification! Error: ${err}`)
        }
    }

    static async checkCode(req, res) {
        try {
            const Email = req.body.Email;
            const Code = req.body.Code;

            // Get confirm result
            const ConfirmResult = await EmailVerificationServices.compareCode(Email, Code);

            if (!ConfirmResult) {
                return res.status(401).error("Invalid code");
            } else {
                // Get authentication method
                const AuthenticationMethod = req.body.Method;

                if (AuthenticationMethod !== 'sign-up') {
                    if (AuthenticationMethod !== 'reset-password') {
                        return res.status(405).send({
                            Message: `Invalid method! Error: ${err}`
                        });
                    } else {
                        // Reset password
                        try {
                            // Allow account to be updated
                            const AccountFound = await AccountServices.findAccountByEmail(Email);
                            const NewInfo = await AccountServices.updateAccount(AccountFound._id, {AllowUpdate: true});
                            return res.status(202).json({
                                Verify: true,
                                AllowUpdate: NewInfo.AllowUpdate
                            });
                        } catch (err) {
                            console.log(`${DateServices.getTimeCurrent()} Can't reset password for ${Email} Error: ${err}`)
                            return res.status(400).send({
                                Message: `Can't reset password for ${Email}!`,
                                Error: err
                            })
                        }
                    }
                } else {
                    //Sign up
                    try {
                        // Create new account and cart
                        const NewAccount = await UnverifiedAccountServices.convertToVerifiedAccount(Email);
                        const NewCart = await CartServices.createCart({CustomerID: NewAccount._id});
                        // Delete unverified account
                        const NumberOfAccountsRemoved = await UnverifiedAccountServices.deleteUnverifiedAccountsByEmail(Email);
                        return res.status(202).json({
                            Verify: true,
                            Account: NewAccount,
                            Cart: NewCart,
                            NumberOfAccountsRemoved: NumberOfAccountsRemoved
                        });
                    } catch (err) {
                        return res.status(400).send({
                            Message: `Can't sign up! Error: ${err}`
                        });
                    }
                }
            }
        } catch (err) {
            res.status(400)
            console.error(`${DateServices.getTimeCurrent()} Can't check code! Error: ${err}`)
        }
    }
}

module.exports = EmailVerificationController;