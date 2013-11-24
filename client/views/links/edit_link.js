Template.linkEdit.helpers({
  link: function() {
    return Links.findOne(Session.get('currentLinkId'));
  }
});

Template.linkEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentLinkId = Session.get('currentLinkId');

    var linkProperties = {
        requested_url: $(e.target).find('[name=requested_url]').val(),
        given_url: $(e.target).find('[name=given_url]').val(),
        google_pagerank: $(e.target).find('[name=google_pagerank]').val(),
        contact_name: $(e.target).find('[name=contact_name]').val(),
        contact_email: $(e.target).find('[name=contact_email]').val(),
        moz_da: $(e.target).find('[name=moz_da]').val(),
        moz_trust: $(e.target).find('[name=moz_trust]').val(),
        maj_citation: $(e.target).find('[name=maj_citation]').val(),
        maj_trust: $(e.target).find('[name=maj_trust]').val(),
        status: $(e.target).find('[name=status]').val(),
        note: $(e.target).find('[name=note]').val()
    };

    Links.update(currentLinkId, {$set: linkProperties}, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Meteor.Router.to('linkPage', currentLinkId);
      }
    });
  },

  'click .get-metrics': function (e) {
    e.preventDefault();

    var a = document.createElement('a');
    a.href = $('input[name=requested_url]').val();

    Meteor.call('getMetrics', a.hostname, function (error, result) {
        var currentLinkId = Session.get('currentLinkId');
        Links.update(currentLinkId, {$set: result}, function (error) {
            if (error) {
                throwError(error.reason);
            } else {
                Meteor.Router.to('linkEdit', currentLinkId);
                $(".alert").show();
            }
        });
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this entry?")) {
      Links.remove(Session.get('currentLinkId'));
      Meteor.Router.to('linksList');
    }
  }
});
