Template.linkShow.helpers({
currentLink: function() {
    return Links.findOne(Session.get('currentLinkId'));
},
  ownPost: function() {
    return this.userId == Meteor.userId();
  }
});
