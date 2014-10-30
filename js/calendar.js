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
            $('#title').html("Name: " + event.title);
            $('#time').html("Time: " + event.start + " - " + event.end);
            $('#location').html("Location: " + event.location);
            $(this).css('background-color', 'red');
            if(event.description.length > 0) {
                $('#description').html("Description: " + event.description).show();
            }
            else{
                $('#description').hide();
            }
            return false;
        },

        dayClick: function(date, event, view){
          $('#calendar').fullCalendar('changeView', 'agendaDay');
        },

        loading: function (bool) {
            $('#loading').toggle(bool);
        }
    });
});
