const User = require('../models/user');

module.exports = {

  //User registration
 register: (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !username.trim()) {
      res.json({success: false, message: "You must provide a username"});
    } else {
      if(!email || !email.trim()) {
        res.json({success: false, message: "You must provide an email"});
        console.log(email);
      } else {
        if(!password || !password.trim()) {
          res.json({success: false, message: "You must provide a Password"});
          console.log(email);
        } else {
          const newUser = new User({
            username,
            email,
            password
          });

          User.registerUser(newUser, (err, user) => {
            if(err) {
                if(err.code === 11000) {
                  res.json({success: false, message: "Email already exist"});

                } else {
                  if(err.errors) {

                    if(err.errors.email) {
                      res.json({success: false, message:  err.errors.email.message});

                    } else if (err.errors.username) {
                      res.json({success: false, message:  err.errors.username.message});

                    } else if (err.errors.password) {
                      res.json({success: false, message:  err.errors.password.message + password});
                    }

                  } else {
                          res.json({success: false, message:  "Registration failed"});
                  }
                }
            } else {
                  res.json({success: true, message: "You are now Registered"});
            }
          });
        }
      }
    }
  },


  //Check Email
  checkEmail: (req, res) => {
    const { email } = req.params;

    if(!email || !email.trim()) {
      res.json({success: false, message: "You must provide an email"});
  } else {

    User.findOne({email: email}, (err, user) => {
      if(err) {
          res.json({success: false, message:err});
      } else if (user) {
        res.json({success: false, message: "Email is already taken"});
      } else {
        res.json({success: true, message: "Email is available"});
      }
    })
  }
},


//Check usernname
checkUsername: (req, res) => {
  const { username } = req.params;

  if(!username || !username.trim()) {
    res.json({success: false, message: "You must provide an username"});
} else {

  User.findOne({username: username}, (err, user) => {
    if(err) {
        res.json({success: false, message:err});
    } else if (user) {
      res.json({success: false, message: "Username is already taken"});
    } else {
      res.json({success: true, message: "Username is available"});
    }
  })
}
}

}
