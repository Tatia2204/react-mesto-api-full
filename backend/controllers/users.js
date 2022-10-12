const { JWT_SECRET, NODE_ENV } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const { NotFoundError } = require('../errors/NotFoundError');
const { IncorrectDataError } = require('../errors/IncorrectDataError');
const { AuthError } = require('../errors/AuthError');
const { ConflictError } = require('../errors/ConflictError');

module.exports.getAllUser = (req, res, next) => {
  Users.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.userId);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new IncorrectDataError('Некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      } return res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.getUserByIdUpdate = async (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  try {
    const user = await Users.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new IncorrectDataError('Некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.getAvatarByIdUpdate = (req, res, next) => {
  const { avatar } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationError') {
        next(new IncorrectDataError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  Users.findById(userId).then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send(user);
  })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return Users.findUserByCredentials(email, password)
    .then((user) => {
      // проверим существует ли такой email или пароль
      if (!user || !password) {
        return next(new IncorrectDataError('Неверный email или пароль.'));
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'tt-secret',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch((err) => {
      next(new AuthError(err.message));
    });
};
