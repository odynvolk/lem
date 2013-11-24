Links = new Meteor.Collection('links');

Links.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Meteor.methods({
  link: function(linkAttributes) {
    var user = Meteor.user();
    
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login");
    
    // ensure the link has a requested url
    if (!linkAttributes.requested_url)
      throw new Meteor.Error(422, 'Please fill out page requested');

    var link = _.extend(_.pick(linkAttributes, 'requested_url',  'placed_url', 'given_url', 'alive',
                                               'contact_name', 'contact_email',
                                               'google_pagerank', 'moz_da', 'moz_da',
                                               'maj_citation', 'maj_trust', 'note'), {
      userId: user._id,
      author: user.username,
      created: new Date().getTime(),
      updated: new Date().getTime()
    });

    var linkId = Links.insert(link);
    
    return linkId;
  }
});