allLinksHandle = Meteor.subscribeWithPagination('allLinks', 25);

Deps.autorun(function() {
  Meteor.subscribe('singleLink', Session.get('currentLinkId'));
});
