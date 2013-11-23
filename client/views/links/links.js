Template.allLinks.helpers({
  options: function() {
    return {
      sort: {submitted: -1},
      handle: allLinksHandle
    }
  }
});

Template.linksList.helpers({
  allLinks: function() {
    var i = 0, options = {sort: this.sort, limit: this.handle.limit()};
    var user = Meteor.user();
    if (user != null) {
        return Links.find({'userId': user._id}, options);
    }

    return null;
  },

  linksReady: function() {
    return this.handle.ready();
  },
  allLinksLoaded: function() {
    return this.handle.ready() &&  
      Links.find().count() < this.handle.loaded();
  }
});

Template.linksList.events({
  'click .load-more': function(e) {
    e.preventDefault();
    this.handle.loadNextPage();
  }
});
