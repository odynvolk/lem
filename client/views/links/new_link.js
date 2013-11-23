Template.linkNew.events({
  'submit form': function(e) {
    e.preventDefault();

    var link = {
        requested_url: $(e.target).find('[name=requested_url]').val(),
        contact_name: $(e.target).find('[name=contact_name]').val(),
        contact_email: $(e.target).find('[name=contact_email]').val(),
        google_pagerank: $(e.target).find('[name=google_pagerank]').val(),
        moz_da: $(e.target).find('[name=moz_da]').val(),
        moz_trust: $(e.target).find('[name=moz_da]').val(),
        maj_citation: $(e.target).find('[name=maj_citation]').val(),
        maj_trust: $(e.target).find('[name=maj_trust]').val(),
        status: $(e.target).find('[name=status]').val()
    };
    
    Meteor.call('link', link, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        
        // if the error is that the link already exists, take us there
        if (error.error === 302)
          Meteor.Router.to('linkShow', error.details)
      } else {
        Meteor.Router.to('linkShow', id);
      }
    });
  }
});