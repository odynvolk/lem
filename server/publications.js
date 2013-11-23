Meteor.publish('allLinks', function(limit) {
  return Links.find({}, {sort: {submitted: -1}, limit: limit});
});

Meteor.publish('singleLink', function(id) {
  return id && Links.find(id);
});
