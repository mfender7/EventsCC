function getJson() {
  //var checkboxes = document.getElementsByName('feeds');

  //Grab xml, pull out important data, convert to json, feed to calendar
  getHg();

  //Events from PCDP google calendar
  //For now, at least. Will wipe this section of code off the plane of this file once everyone starts using Mercury.
  //getCal();

  //cc orgs calendar as well?

  //return it!
  //return JSON.parse(JSON.stringify(json));//.replace(/(<([^>]+)>)/ig, ""));
}

function getHg() {
  var json = { events: [] };
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
  //return json;
  $('#calendar').fullCalendar('addEventSource', json);
}

function getCal() {
  var source = $.fullCalendar.gcalFeed("http://www.google.com/calendar/feeds/5a44ga7q4komvff5k57s1ilr3k@group.calendar.google.com/public/basic");
  $("#calendar").fullcalendar("addEventSource", source);
  //http://www.google.com/calendar/feeds/5a44ga7q4komvff5k57s1ilr3k@group.calendar.google.com/public/basic
  //http = new XMLHttpRequest();
  //http.open("GET",
  //    "https://www.googleapis.com/calendar/v3/calendars/5a44ga7q4komvff5k57s1ilr3k%40group.calendar.google.com/events?AIzaSyDSXN8NykKjMpEdE7lRWRM6bHMgLXQX9Io",
  //    false);
  //http.send(null);
  //data = JSON.parse(http.responseText.substring(0, http.responseText.length - 2).replace('// API callback\ninsertAgenda(', '')).feed.entry;

  jQuery.get("https://www.googleapis.com/calendar/v3/calendars/5a44ga7q4komvff5k57s1ilr3k%40group.calendar.google.com/events?AIzaSyDSXN8NykKjMpEdE7lRWRM6bHMgLXQX9Io",
  function(data) {
    console.log(data);
    console.log("SOMETHING");
  });

  /*
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
  }*/
}

function refetchJson(){
  //if(checkboxes[0].checked) {
  //if(checkboxes[1].checked) {
  $('#calendar').fullCalendar('removeEvents');//.fullCalendar('removeEventSources');  //Removes all event sources
  if($('#calendar').fullCalendar( 'clientEvents') == "") {
    $('#calendar').fullCalendar( 'addEventSource', getJson());
  } // load the new source if the Calendar is empty
  $('#calendar').fullCalendar('rerenderEvents');
}
