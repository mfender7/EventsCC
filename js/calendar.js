$(function () {
    $('#addthisevent').hide();
    var json = getJson();
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'

        },
        defaultView: 'agendaWeek',
        // US Holidays
        minTime: "08:00:00",
        maxTime: "21:00:00",
        googleCalendarApiKey: "AIzaSyC2o4On2bRlY1TH7Ny0g9eeRaUS3y0mMtk",
        events:
        {
          googleCalendarId: '5a44ga7q4komvff5k57s1ilr3k@group.calendar.google.com',
          className: 'gcal-event'
        },

        eventClick: function (event) {
          setATE(event);
          $('#addthisevent').show();
          $('#atedrop1').show();
          addthisevent.refresh();
          //event.backgroundColor = 'red';
          if($('#hidId').val() != ""){
            var id = parseInt($('#hidId').val());
            var col = $("#hidCol").val();
            $('#calendar').fullCalendar('clientEvents', function(event){
              if(event.id == id) {
                event.backgroundColor = col;
                $('#calendar').fullCalendar('updateEvent', event);
              }
            });
          }
          $('#hidId').val(event.id);
          $('#hidCol').val(event.backgroundColor);
          event.backgroundColor = 'red';
          $('#calendar').fullCalendar('updateEvent', event);

          $('#title').html(event.title);
          $('#time').html(event.start.format('MMM D h:mm a') + " - " + event.end.format('MMM D h:mm a'));
          $('#location').html(event.location);
          $('#description').html(event.description);
        },

        dayClick: function(date, event, view){
          $('#calendar').fullCalendar('changeView', 'agendaDay');
          $('#calendar').fullCalendar('gotoDate', date);
        },

        loading: function (bool) {
            $('#loading').toggle(bool);
        },

        eventMouseover: function (data, event, view) {
           tooltip = '<div class="tooltiptopicevent" style="width:auto;height:auto;background:#feb811;position:absolute;z-index:10001;padding:10px 10px 10px 10px ;  line-height: 200%;">' + 'title: ' + data.title + '</br>' + 'start: ' + data.start.format('MMM D h:mm a') + '</br>end: ' + data.end.format('MMM D h:mm a') + '</br>location: ' + data.location + '</div>';
           $("body").append(tooltip);
           $(this).mouseover(function (e) {
             $(this).css('z-index', 10000);
             $('.tooltiptopicevent').fadeIn('500');
             $('.tooltiptopicevent').fadeTo('10', 1.9);
            }).mousemove(function (e) {
              $('.tooltiptopicevent').css('top', e.pageY + 10);
              $('.tooltiptopicevent').css('left', e.pageX + 20);
            });
        },

        eventMouseout: function (data, event, view) {
          $(this).css('z-index', 8);
          $('.tooltiptopicevent').remove();
        }
    });
    getHg();
});
