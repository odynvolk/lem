Meteor.Router.add({
  '/': {to: 'allLinks', as: 'home'},
  '/all': 'allLinks',

  '/links/:_id': {
    to: 'linkPage',
    and: function(id) { Session.set('currentLinkId', id); }
  },
  
  '/links/:_id/edit': {
    to: 'linkEdit',
    and: function(id) { Session.set('currentLinkId', id); }
  },
  
  '/new': 'linkNew'
});

Meteor.Router.filters({
  'requireLogin': function(page) {
    if (Meteor.user())
      return page;
    else if (Meteor.loggingIn())
      return 'loading';
    else
      return 'accessDenied';
  },
  'clearErrors': function(page) {
    clearErrors();
    return page;
  }
});

Meteor.Router.filter('requireLogin', {only: ['linkNew', 'linkEdit']});
Meteor.Router.filter('clearErrors');
