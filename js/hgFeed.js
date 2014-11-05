function getJson() {
  var json = { events: [] };
  var checkboxes = document.getElementsByName('feeds');
  if(checkboxes[0].checked) {
    //Grab xml, pull out important data, convert to json, feed to calendar
    getHg(json);
  }

  if(checkboxes[1].checked) {
    //Events from PCDP google calendar
    //For now, at least. Will wipe this section of code off the plane of this file once everyone starts using Mercury.
    getCal(json);
  }
  //cc orgs calendar as well?

  //return it!
  return JSON.parse(JSON.stringify(json));//.replace(/(<([^>]+)>)/ig, ""));
}

function getHg(json) {
  var http = new XMLHttpRequest();
  //events from mercury
  http.open("GET", "getdata.php", false);
  http.send(null);
  var data = $.parseXML(http.responseText);
  var nodes = $(data).find("node");
  for (var i = 0; i < nodes.length; i++) {
    json.events.push({
      id: nodes[i].id,
      title: $(nodes[i].children[0]).text(),
      start: $(nodes[i].children[16]).text(),
      end: $(nodes[i].children[17]).text(),
      description: $(nodes[i].children[2]).text(),
      location: $(nodes[i].children[31]).text(),
      editable: false,
      backgroundColor: "CadetBlue" //color
    });
  }
}

function getCal(json) {
  http = new XMLHttpRequest();
  http.open("GET",
      "http://www.google.com/calendar/feeds/5a44ga7q4komvff5k57s1ilr3k@group.calendar.google.com/public/full?alt=json-in-script&callback=insertAgenda&orderby=starttime&max-results=15&singleevents=true&sortorder=ascending&futureevents=true",
      false);
  http.send(null);
  data = JSON.parse(http.responseText.substring(0, http.responseText.length - 2).replace('// API callback\ninsertAgenda(', '')).feed.entry;
  for(var i = 0; i < data.length; i++){
    json.events.push({
      id: Math.floor(Math.random()*10000),
      title: data[i].title.$t,
      start: data[i].gd$when[0].startTime.split(".")[0].replace("T", " "),
      end: data[i].gd$when[0].endTime.split(".")[0].replace("T", " "),
      description: data[i].content.$t,
      location: data[i].gd$where[0].valueString,
      backgroundColor: "DarkKhaki"
    });
  }
}

function refetchJson(){
  $('#calendar').fullCalendar('removeEvents');//.fullCalendar('removeEventSources');  //Removes all event sources
  if($('#calendar').fullCalendar( 'clientEvents') == "") {
    $('#calendar').fullCalendar( 'addEventSource', getJson());
  } // load the new source if the Calendar is empty
  $('#calendar').fullCalendar('rerenderEvents');
}
