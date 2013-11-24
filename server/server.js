var cheerio = Npm.require('cheerio');

Meteor.methods({
    getMetrics: function (domain) {
        var response = Meteor.http.get("http://bagics.com/domain-authority.html?domain=" + domain);
        $ = cheerio.load(response.content);
        var moz_da = $($('#resId')).html();

        response = Meteor.http.get("http://bagics.com/moz-rank.html?domain=" + domain);
        $ = cheerio.load(response.content);
        var moz_rank = $($('#resId')).html();

        response = Meteor.http.get("http://bagics.com/fake-pr-check.html?domain=" + domain);
        $ = cheerio.load(response.content);
        var google_pagerank = $($('#resId')).html().replace('Page Rank- ', '');

        if ($($('.daa')).html().indexOf('Fake') >= 0) {
            google_pagerank = 'Fake ' + google_pagerank
        }

        var result = {};

        result['moz_da'] = moz_da;
        result['moz_rank'] = moz_rank;
        result['google_pagerank'] = google_pagerank;

        return result;
    },

    alive: function (requested_url, placed_url) {
        var response = Meteor.http.get(requested_url);
        $ = cheerio.load(response.content);

        var result = {};
        result['alive'] = false;

        $($("a")).each(function() {
            if ($(this).attr('href') == placed_url) {
                result['alive'] = true;
            }
        });

        return result;
    }
});