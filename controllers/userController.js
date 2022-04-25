require('dotenv').config();
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');

const sendEmail = async (email, uniqueString) => {
    const user = 'lushplantsapp@gmail.com';
    const pass = 'lush2022';
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user,
            pass
        }
    });
    const mailOptions = {
        from: user,
        to: email,
        subject: "Hi There! We're Lush, please confirm your e-mail adress.",
        html: `<table>
    <thead>
      <tr>
        <th colspan="2"><img src="https://images.pexels.com/photos/793012/pexels-photo-793012.jpeg" alt="plant" width="600" height="350"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="2"><h1 style="color: rgba(0, 0, 0, 0.79); font-size: 2rem; text-align: center;" >Welcome to Lush App</h1></td>
      </tr>
      <tr>
        <td colspan="2"><h2 style="color: rgba(0, 0, 0, 0.79); font-size: 1rem; text-align: center;">Please click <a style="color: rgba(0, 0, 0, 0.557);" href="https://lushplants.herokuapp.com/api/verify/${uniqueString}">here</a> to confirm your email adress.</h2></td>
      </tr>
    </tbody>
    </table>
        `
    };
    await transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Message sent');
        }
    })
};

const userController = {
    verifyEmail: async (req, res) => {
        const { uniqueString } = req.params;
        const user = await User.findOne({ uniqueString });
        if (user) {
            user.emailVerified = true;
            await user.save();
            
            res.redirect("https://lushplants.herokuapp.com/signin");
        } else {
            res.json({
                success: false,
                response: 'We could not verify your email'
            });
        }
    },
    verifyToken: async (req, res) => {
        if (!req.err) {
            res.json({
                success: true,
                response: {
                    id: req.user.id,
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                    profileurl: req.user.profileurl,
                    email: req.user.email,
                    admin: req.user.admin,
                    from: 'token'
                },
                message: 'Welcome back ' + req.user.firstName
            })
        } else {
            res.json({
                success: false,
                message: 'Please, sign in again'
            });
        }
    },
    signUp: async (req, res) => {
        const { firstName, lastName, email, password, country, profileurl, from } = req.body;
        // console.log(req.body)
        try {
            const user = await User.findOne({ email });
            const passwordHash = bcryptjs.hashSync(password, 10);
            const uniqueString = crypto.randomBytes(15).toString('hex');
            if (user) {
                if (user.from.indexOf(from) !== -1) {
                    res.json({
                        success: false,
                        from: 'signup',
                        message: 'Looks like you are already signed up. Please, sign in'
                    });
                } else {
                    user.from.push(from);
                    user.password.push(passwordHash);
                    if (from === 'signup') {
                        user.uniqueString = uniqueString;
                        await user.save();
                        await sendEmail(email, user.uniqueString);
                        res.json({
                            success: true,
                            from,
                            message: 'A confirmation email has been sent to you. Please confirm it to proceed with Sign In'
                        });
                    } else {
                        user.save();
                        res.json({
                            success: true,
                            from,
                            message: 'You can now sign in with ' + from
                        });
                    }
                }
            } else {
                const user = await new User({
                    firstName,
                    lastName,
                    email,
                    password: [passwordHash],
                    country,
                    profileurl,
                    addresses: [],
                    emailVerified: false,
                    uniqueString,
                    admin: false,
                    from: [from],
                });
                await user.save();
                if (from === 'signup') {
                    await sendEmail(email, user.uniqueString);
                    res.json({
                        success: true,
                        from,
                        message: 'We sent you an email to verify your account. Please check your inbox!'
                    });
                } else {
                    res.json({
                        success: true,
                        from,
                        message: 'Your account with ' + from + ' has been successfully created!'
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                message: 'Oh Snap! An error has occured, please try again'
            });
        }
    },
    signIn: async (req, res) => {
        const { email, password, from } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                res.json({
                    success: false,
                    message: 'We could not find an account with that email address. Please, sign up'
                });
            } else {
                const userData = {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    profileurl: user.profileurl,
                    admin: user.admin,
                    from: user.from
                };
                const passwordMatch = user.password.some(pass => bcryptjs.compareSync(password, pass));
                const token = jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })
                if (from !== 'signin') {
                    if (passwordMatch) {
                        await user.save();
                        res.json({
                            success: true,
                            from,
                            response: {
                                token,
                                user: userData
                            },
                            message: 'Welcome back ' + userData.firstName,
                        });
                    } else {
                        res.json({
                            success: false,
                            from,
                            message: 'It looks like you never signed up with  ' + from + 'before. Please  Sign Up with ' + from
                        });
                    }
                } else {
                    if (user.emailVerified) {
                        if (passwordMatch) {
                            res.json({
                                success: true,
                                from,
                                response: {
                                    token,
                                    user: userData
                                },
                                message: 'Welcome back ' + userData.firstName,
                            });
                        } else {
                            res.json({
                                success: false,
                                from,
                                message: 'Something went wrong... Username and password do not match',
                            })
                        }
                    } else {
                        res.json({
                            success: false,
                            from,
                            message: 'To complete the signup you need to confirm your email address by clicking on the link in the confirmation email we sent to you.  '
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                message: 'Oh snap! Something went wrong... Try again in a few seconds'
            });
        }
    },
    signOut: async (req, res) => {
        res.json({
            success: true,
            message: 'Session closed'
        });
    },
};

module.exports = userController;
