const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequest = require('../errors/BadRequest');
const AccessError = require('../errors/AccessError');

const postCard = (req, res, next) => {
  const { name, link, createdAt, likes } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, createdAt, likes, owner })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Проблема с валидацией на сервере'));
      } else {
        next(error);
      }
    });
};
const removeCard = (req, res, next) => {
  const cardId = req.params.id;
  const id = req.user._id;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с данным id не найдена');
      }
      if (card.owner.toString() !== id) {
        throw new AccessError('Недостаточно прав');
      } else {
        Card.findByIdAndRemove(cardId)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((error) => {
            if (error.name === 'CastError') {
              next(new BadRequest('Карточка отсутствует'));
            } else {
              next(error);
            }
          });
      }
    })
    .catch(next);
};

const findCard = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((error) => {
      next(error);
    })
    .catch(next);
};

/*

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.status(201).send(card);
    })
    .catch(next);
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};
*/
const addLike = (req, res, next) => {
  const cardId = req.params.id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Карточка с данным id не найдена');
      }
      res.status(200).send(data);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Карточка отсутствует'));
      } else {
        next(error);
      }
    });
};

const removeLike = (req, res, next) => {
  const cardId = req.params.id;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Карточка с данным id не найдена');
      }
      res.status(200).send(data);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Карточка отсутствует'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  postCard,
  findCard,
  removeCard,
  addLike,
  removeLike,
};
