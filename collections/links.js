Links = new Meteor.Collection('links');

Links.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Meteor.methods({
  link: function(linkAttributes) {
    var user = Meteor.user(), linkWithSameLink = Links.findOne({url: linkAttributes.url});
    
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login");
    
    // ensure the link has a requested url
    if (!linkAttributes.requested_url)
      throw new Meteor.Error(422, 'Please fill out page requested');
    
    // check that there are no previous posts with the same link
    if (linkAttributes.requested_url && linkWithSameLink) {
      throw new Meteor.Error(302, 
        'This link has already been posted', 
        linkWithSameLink._id);
    }
    
    var link = _.extend(_.pick(linkAttributes, 'requested_url',  'given_url', 'contact_name', 'contact_email',
                                               'google_pagerank', 'moz_da', 'moz_da',
                                               'maj_citation', 'maj_trust', 'status'), {
      userId: user._id,
      author: user.username,
      created: new Date().getTime(),
      updated: new Date().getTime()
    });

    var linkId = Links.insert(link);
    
    return linkId;
  }
});