<?php
	$hgFeed = file_get_contents("http://hg.gatech.edu/feed/309051/xml/automatic");
	echo $hgFeed;
?>