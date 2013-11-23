Template.linkPage.helpers({
  currentLink: function() {
    return Links.findOne(Session.get('currentLinkId'));
  }
});