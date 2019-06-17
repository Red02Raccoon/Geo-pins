const { AuthenticationError } = require('apollo-server');

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
    me: authenticated((root, args, ctx) => ctx.currentUser)
  }
}