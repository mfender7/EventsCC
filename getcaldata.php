<?php
 require_once 'google-api-php-client/autoload.php';

 $api_key = 'AIzaSyDSXN8NykKjMpEdE7lRWRM6bHMgLXQX9Io';
 $calendar_id = '5a44ga7q4komvff5k57s1ilr3k@group.calendar.google.com';
 $client = new Google_Client();
 $client->setApplicationName("EventsCC");
 $client->setDeveloperKey($api_key);
 $client->setClientId('1055372748447-qncdhbojl3q78gatk3khu87cl8dsrqc4.apps.googleusercontent.com');
 $client->setClientSecret('SMxPbWR_zHlhxK04QHuEeFU2');


 $service = new Google_Service_Calendar($client);
 $calendarListEntry = $service->calendarList->get($calendar_id);

 echo $calendarListEntry->getSummary();
?>
