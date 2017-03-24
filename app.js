var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
$("#submit").click(function() {
    var search = $("#search").val().trim();
    var beginDate = $("beginDate").val().trim();
    var endDate = $("#endDate").val().trim();
    var articleNum = $("#articleNum").val().trim();
    endDate = parseInt(endDate);
    beginDate = parseInt(endDate);
    articleNum = parseInt(articleNum);
    var resultsBox = $("<div>");
    url += '?' + $.param({
        'api-key': "cc67ec052d4d4415aaf0a05c9e60f242",
        'q': search,
        'begin_date': beginDate,
        'end_date': endDate
    });
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(response) {
        for (var i = 0; i < articleNum; i++) {
            var url = response.response.docs[i].web_url;
            var title = response.response.docs[i].headline.main;
            var by = response.response.docs[i].byline.original;
            var section = response.response.docs[i].section_name;
            var pubdate = response.response.docs[i].pub_date;
            var articleResults = $("<div>");
            articleResults.prepend("<a href=" + url + ">" + url + "</a>");
            articleResults.prepend("<p>" + pubdate + "</p>");
            articleResults.prepend("<p> Section: " + section + "</p>");
            articleResults.prepend("<p>" + by + "</p>");
            articleResults.prepend("<h2><div id='artnum'>" + (articleNum + 1)+
                "</div>" + title + "</h2>");


            articleResults.addClass("articleSearch");

            resultsBox.append(articleResults);
        }
    });
    $(".panel-body").html(resultsBox);
});