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
            //alert(event.description);
            //$("label[for='Title']").html(event.description);
            $('#title').html("Name: " + event.title);
            $('#time').html("Time: " + event.start + " - " + event.end);
            $('#location').html("Location: " + event.location);
            if(event.description.length > 0) {
                $('#description').html("Description: " + event.description).show();
            }
            else{
                $('#description').hide();
            }
            return false;
        },

        loading: function (bool) {
            $('#loading').toggle(bool);
        }
    });
});