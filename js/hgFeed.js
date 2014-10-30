function getJson() {
    /**
     Grab xml, pull out important data, convert to json, feed to calendar
     **/

    var http = new XMLHttpRequest();
    //events from mercury
    http.open("GET", "getdata.php", false);
    http.send(null);
    var data = $.parseXML(http.responseText);
    var nodes = $(data).find("node");
    var json = { events: [] };
    for (var i = 0; i < nodes.length; i++) {
        json.events.push({
            id: nodes[i].id,
            title: $(nodes[i].children[0]).text(),
            start: $(nodes[i].children[16]).text(),
            end: $(nodes[i].children[17]).text(),
            description: $(nodes[i].children[2]).text(),
            location: $(nodes[i].children[31]).text(),
            editable: false
        });
    }

    //Events from PCDP google calendar
    //For now, at least. Will wipe this section of code off the plane of this file once everyone starts using Mercury.
    http = new XMLHttpRequest();
    http.open("GET",
        "http://www.google.com/calendar/feeds/5a44ga7q4komvff5k57s1ilr3k@group.calendar.google.com/public/full?alt=json-in-script&callback=insertAgenda&orderby=starttime&max-results=15&singleevents=true&sortorder=ascending&futureevents=true",
        false);
    http.send(null);
    data = JSON.parse(http.responseText.substring(0, http.responseText.length - 2).replace('// API callback\ninsertAgenda(', '')).feed.entry;
    for(var i = 0; i < data.length; i++){
      console.log(data[i].title.$t);
        json.events.push({
            title: data[i].title.$t,
            start: data[i].gd$when[0].startTime.replace("T", " ").split(".")[0],
            end: data[i].gd$when[0].endTime.replace("T", " ").split(".")[0],
            description: data[i].content.$t,
            location: data[i].gd$where[0].valueString
        });
    }

    //cc orgs calendar as well?

    //return it!
    return JSON.parse(JSON.stringify(json).replace(/(<([^>]+)>)/ig, ""));
}
