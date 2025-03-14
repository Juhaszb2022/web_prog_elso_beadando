<?php
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
header("Connection: keep-alive");

echo "data: " . date('H:i:s') . "\n\n";
flush();
?>
