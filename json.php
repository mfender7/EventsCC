<?php
    $data = $_POST['events'];
    $jsonFile = fopen('events.json','w+');
    fwrite($jsonFile,$data);
    fclose($jsonFile);
    echo "Done";
?>