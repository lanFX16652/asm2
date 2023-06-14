import User from "../models/userModel";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";



// const signUp = async (req, res, next) => {
//     console.log("Called to signUp function");
//     const {firstname, lastname, email, password} = req.body;

//     //Check if there is a user with the same email
//     const foundUser = await userWebRoute.findOne({email});
//     console.log("Found User: ", foundUser);
//     if (foundUser) {
//         return res.status(403).json({
//             error: {message: "Email is already used"}
//         })
//     }

//     //Create a new User
//     //const newUser = new User ({firtname, lastname, email, password});
//     //console.log("new user", newUser);
//     //newUser.save()

//     //Encode a token
//     const token = encodedToken(newUser._id)
// };

// const register = (req, res, next) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     const fullname = req.body.fullname;
//     const phoneNumber = req.body.phoneNumber;
//     const email = req.body.email;
//     User.findOne({ email: email })
//         .then(userDoc => {
//             if (userDoc) {
//                 return res.redirect('/register');
//             }
//             return bcrypt.hash(password, 12);
//         })
//         .then(hashedPassword => {
//             const user = new User({
//                 username: username,
//                 password: hashedPassword,
//                 fullname: fullname,
//                 phoneNumber: phoneNumber,
//                 email: email,
//                 // cart: { items: [] }
//             });
//             return user.save();
//         })
//         .then(result => {
//             res.redirect('/login');
//         })
//         .catch(err => {
//             console.log(err);
//         });

//     res.setHeader('Authorization', token);
//     return res.status(201).json({ success: true })
// }

const signJWT = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

const logIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: "Email/Mat Khau khong hop le" })
            };

            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        const accessToken = signJWT(user.toObject())
                        res.json({ accessToken, user });
                    } else {
                        return res.status(400).json({ message: "Email/Mat Khau khong hop le" })
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: "Server khong hoat dong" })
                })
        })
};


const adminLogIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: "Email/Mat Khau khong hop le" })
            };

            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        if (!user.isAdmin) {
                            return res.status(400).json({ message: "Ban khong phai admin" })
                        }

                        const accessToken = signJWT(user.toObject())
                        res.json({ accessToken, user });
                    } else {
                        return res.status(400).json({ message: "Email/Mat Khau khong hop le" })
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: "Server khong hoat dong" })
                })
        })
};

const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        //Create new user
        const newUser = await new User({
            username: req.body.username,
            password: hashed,
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
        })

        //Save to DB
        const user = await newUser.save();
        const accessToken = signJWT(user.toObject())

        res.json({ accessToken, user: user });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

// const logIn = async (req, res) => {
//     try{
//         const user = await User.findOne({username: req.body.username});
//         if(!user){
//             res.status(404).json("Wrong username!");
//         }
//         const validPassword = await bcrypt.compare(
//             req.body.password,
//             user.password
//         );
//         if(!validPassword) {
//             res.status(404).json("Wrong password!")
//         }
//         if(user && validPassword) {
//             res.status(200).json(user)
//         }
//     }catch(err){
//         res.status(500).json(err);
//     }
// }

const postSignup = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.redirect("/signup");
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        username: username,
                        password: hashedPassword,
                        fullName: fullName,
                        phoneNumber: phoneNumber,
                        email: email,
                    });
                    return user.save();
                })
            // .then(result => {
            //     res.redirect("/login");
            // });
        })
        .catch(err => {
            console.log(err)
        })
}

const postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: "Not found user" })
            } else {
                bcrypt
                    .compare(password, user.password)
                    .then(doMatch => {
                        if (doMatch) {
                            req.session.isLoggedIn = true;
                            // console.log(req.session.isLoggedIn);
                            req.session.user = user;
                            req.session.save(err => {
                                console.log(err);
                                // res.redirect("/");
                            })

                            res.status(200).json({
                                message: "Success",
                                user: user
                            });
                        } else {
                            res.status(400).json({ message: "Password is not correct!" })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        // res.redirect("/login")
                    })
            }
        })
        .catch(err => console.log(err))

};

const logOut = (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
        req.session = null;
        // req.session.isLoggedIn = false;
        // req.session.user = null;
        res.status(200).json({ user: null });
        // res.redirect("/login");
    });
}

// module.exports = { register, logIn, logOut };
// export { register, postSignup, postLogin, logOut, logIn };
export { register, logIn, logOut, adminLogIn }

//https://viblo.asia/p/nodejs-bat-dau-voi-authentication-ORNZq6n3l0n