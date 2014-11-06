function setATE(event){
  $('._start').html(event.start.format('MM-DD-YYYY HH:mm:ss'));
  $('._end').html(event.end.format('MM-DD-YYYY HH:mm:ss'));
  $('._summary').html(event.title);
  //$('._description').append(event.description);
  $('._location').html(event.location);
}
