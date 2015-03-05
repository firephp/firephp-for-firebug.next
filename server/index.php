<?php

header('X-Wf-Protocol-1: http://meta.wildfirehq.org/Protocol/JsonStream/0.2');
header('X-Wf-1-Plugin-1: http://meta.firephp.org/Wildfire/Plugin/FirePHP/Library-FirePHPCore/0.0.0master1106021548');
header('X-Wf-1-Structure-1: http://meta.firephp.org/Wildfire/Structure/FirePHP/FirebugConsole/0.1');
header('X-Wf-1-1-1-1: 63|[{"Type":"LOG","File":"/path/to/file","Line":10},"Hello World"]|');
header('X-Wf-1-Index: 1');


header('X-ChromeLogger-Data: ' . json_encode(array(
	"version" => "1.1.1",
	"columns" => array(
		"log",
		"backtrace",
		"type"
	),
	"rows" => array(
		array(
			"Hello from the server"
		), "server.js:1:12", ""
	)
)));


echo "Hello from FirePHP server!";

