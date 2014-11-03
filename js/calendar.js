$(function () {
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
        events: json,

        eventClick: function (event) {

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

          /*
          $(this).css('background-color', 'red');
          $('#title').html("Name: " + event.title);
          $('#time').html("When: " + event.start._i.replace("T", " ") + " - " + event.end._i.replace("T", " "));
          $('#location').html("Location: " + event.location);
          console.log($(this));
          $('#hidId').val($(this));
          $('#hidCol').val(event.backgroundColor);
          //event.backgroundColor = 'darkred';
          $('#calender').fullCalendar( 'rerenderEvents' );
          if(event.description.length > 0) {
              $('#description').html("Description: " + event.description).show();
          }
          else{
              $('#description').hide();
          }
          return true;
          */
        },

        dayClick: function(date, event, view){
          $('#calendar').fullCalendar('changeView', 'agendaDay');
          $('#calendar').fullCalendar('gotoDate', date);
        },

        loading: function (bool) {
            $('#loading').toggle(bool);
        }
    });
});
