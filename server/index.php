<?php

/*
header('X-Wf-Protocol-1: http://meta.wildfirehq.org/Protocol/JsonStream/0.2');
header('X-Wf-1-Plugin-1: http://meta.firephp.org/Wildfire/Plugin/FirePHP/Library-FirePHPCore/0.0.0master1106021548');
header('X-Wf-1-Structure-1: http://meta.firephp.org/Wildfire/Structure/FirePHP/FirebugConsole/0.1');
header('X-Wf-1-1-1-1: 63|[{"Type":"LOG","File":"/path/to/file","Line":10},"Hello World"]|');
header('X-Wf-1-Index: 1');
*/
/*
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
*/


// The same logging statements as url `curl -v http://firephp.org/`.
 
require_once(__DIR__ . '/node_modules/firephp-core/lib/FirePHPCore/fb.php');


fb('Hello World');

fb('Log message',FirePHP::LOG);
fb('Info message',FirePHP::INFO);
fb('Warn message',FirePHP::WARN);

fb('Message with label','Label',FirePHP::LOG);

fb(array('key1'=>'val1','key2'=>array(array('v1','v2'),'v3')),'TestArray',FirePHP::LOG);

fb(array('2 SQL queries took 0.06 seconds',array(
   array('SQL Statement','Time','Result'),
   array('SELECT * FROM Foo','0.02',array('row1','row2')),
   array('SELECT * FROM Bar','0.04',array('row1','row2'))
  )),FirePHP::TABLE);
  
fb(apache_request_headers(),'RequestHeaders',FirePHP::DUMP);



echo "Hello from FirePHP server!";

