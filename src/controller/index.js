const UserDB = require('./../models');

const GetHomeController = async (req, res) => {
  const userDb = await new UserDB();
  const users = await userDb.getUsers();

  res.render('index', {
    users: users,
  });
  return;
};

const PostHomeController = async (req, res) => {
  const userDb = await new UserDB();

  const data = req.body;

  if (data.firstName.trim() === '' || data.lastName.trim() === '') {
    res.redirect('/');
    return;
  }

  const payload = {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
  };

  await userDb.setNewUser(payload);

  res.redirect('/');
  return;
};

const DeleteHomeController = async (req, res) => {
  const userDb = await new UserDB();

  const data = req.body;

  if (
    typeof data.firstName === 'undefined' ||
    typeof data.lastName === 'undefined'
  ) {
    res.redirect('/');
    return;
  }

  const payload = {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
  };

  await userDb.deleteUser(payload);

  res.redirect('/');
  return;
};

module.exports = {
  GetHomeController,
  PostHomeController,
  DeleteHomeController,
};
