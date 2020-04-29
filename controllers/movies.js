const User = require('../models/user');

module.exports = {
  getById: async (req, res) => {
  const { login } = req.params;
  console.log(login)
  const user = await User.findOne({ login })

  if(user){
     res.json(user)
  } else{
       return res.json({status: "fail", message: 'User not found'});
  }
},

getAll: async (req, res) => {
  const user = await User.find()

  if(user){
    res.json({status: "success", message: user})
  } else {
    return res.json({status: "fail", message: 'User not found'});
  }
},

updateById: async (req, res, next) => {
  const { login } = req.params;
  const access = req.user.role;
  const user = await User.findOne({ login });

  let password = "";
  let role = "";
  if(user){
    if(req.body.password){
    password = req.body.password;
    } else {
      password = user.password
    };

    if(req.body.role){
      role = req.body.role;
    } else {
      role = user.role
    };
  }

  if(user && access == 'admin'){
    user.password = password;
    user.role = role;
    await user.save();
    res.json({status:"success", user});
  } else {
    return res.json({status: "fail", message: 'User not found'});
  }
},

deleteById:
async (req, res, next) => {
  const { login } = req.params;
  const role = req.user.role;
  const user = await User.findOne({ login });

  if(role == 'admin' && user.role != 'admin'){
    await User.deleteOne({ login });
    res.json({status: "success", message: 'User deleted successfully ' + login})
  } else {
    return res.json({status: "fail", message: `User did npt delete`});
  }
},

create: async (req, res) => {
  let newUser = new User({
    login: req.body.login,
    password: req.body.password,
    role: req.body.role
  });
  const { login } = req.body
  const user = await User.findOne({ login });
  const role = req.user.role;

  if(user){
    res.json({status: "fail", message: 'Such user already exists'})
  }

  if(role == 'admin'){
    await newUser.save();
    res.json({status: "success", message: "User added successfully!", newUser});
  } else {
    res.json({status: "fail", message: 'User did not add'});
  }
}
};
