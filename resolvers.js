const { AuthenticationError } = require('apollo-server');

const Pin = require('./models/Pin');

const user = {
  _id: '1',
  name: 'Raccoon',
  email: 'red02raccoon@gmail.com',
  picture: 'http://res.cloudinary.com/red02raccoon/image/upload/v1558879385/sickfits/x36u3iprvxnctma0zqsd.jpg'
};

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) throw new AuthenticationError('You must be logged in!!!');

  return next(root, args, ctx, info);
}

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser),
    getPins: async (root, args, ctx) => {
      const pins = await Pin.find({})
        .populate("author")
        .populate("comments.author");

      return pins;
    },
  },
  Mutation: {
    createPin: authenticated(async (root, args, ctx, info) => {
      const newPin = await new Pin({
        ...args.input,
        author: ctx.currentUser._id
      }).save();

      const pinAdded = await Pin.populate(newPin, 'author');

      return pinAdded;
    })
  }
}