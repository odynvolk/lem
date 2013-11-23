Template.linkShow.helpers({
currentLink: function() {
    console.log('current');
    return Links.findOne(Session.get('currentLinkId'));
},
  ownPost: function() {
    return this.userId == Meteor.userId();
  }
});
