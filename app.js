var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var api = "cc67ec052d4d4415aaf0a05c9e60f242"
$("#submit").click(function(event) {
    event.preventDefault();
    var search = $("#search").val().trim();
    var beginDate = $("#beginDate").val();
    var endDate = $("#endDate").val();
    var articleNum = $("#articleNum").val();
    beginDate = "&begin_date=" + beginDate + "0101"
    endDate = "&end_date=" + endDate + "1231"
    console.log(beginDate.length);
    console.log(endDate.length);
    articleNum = parseInt(articleNum);
    if (beginDate.length==20) {
        console.log("it worked");
    }
    else{
        beginDate = "";
    }
    if (endDate.length==18) {
        console.log(endDate);
    }
    else{
        endDate = "";
    }
    console.log(beginDate);
    console.log(endDate);
    var resultsBox = $("<div>");
    url = ("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + api + "&q=" + search + beginDate + endDate);
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(response) {
        console.log(response);
        for (var i = 0; i < articleNum; i++) {
            var url = response.response.docs[i].web_url;
            var title = response.response.docs[i].headline.main;
            var section = response.response.docs[i].section_name;
            var pubdate = response.response.docs[i].pub_date;
            var articleResults = $("<div>");
            articleResults.prepend("<a href=" + url + ">" + url + "</a>");
            articleResults.prepend("<p>" + pubdate + "</p>");
            articleResults.prepend("<p> Section: " + section + "</p>");
            if(response.response.docs[i].byline && response.response.docs[i].byline.original){
            articleResults.prepend("<p>" + response.response.docs[i].byline.original + "</p>");
        }
            articleResults.prepend("<h2><span class='label label-default artnum'>" + (i + 1) +
                "</span>  " + title + "</h2>");


            articleResults.addClass("articleSearch");

            resultsBox.append(articleResults);
        }
    });
    $("#topart").html(resultsBox);
});
$("#clear").click(function(event) {
    event.preventDefault();
    $("#topart").empty();
})