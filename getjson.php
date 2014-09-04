<?php
	$hgFeed = file_get_contents("http://hg.gatech.edu/feed/309051/xml/automatic");
	//$hgFeed = str_replace(array("\n", "\r", "\t"), '', $hgFeed);
	//$hgFeed = trim(str_replace('"', "'", $hgFeed));
	$xml = simplexml_load_string($hgFeed);
	echo $xml;
	$json = json_encode($xml);
	$obj = json_decode($json, true);
	$json = $obj['node'];
	$result = array();
	foreach($json as $item)
		$result[] = array('title' => $item['author'], 'start' => $item['start'], 'end' => $item['end'], 'url' => "hg.gatech.edu/node/" . $item['@attributes']['id'], 'description' => $item['body']);
		//echo $item['@attributes']['id'];
	//echo json_encode($result);
	//var_dump($array);
	
?>