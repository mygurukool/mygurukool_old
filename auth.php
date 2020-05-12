<?php

$ch = curl_init();

$code = $_GET['code'];

$url = 'https://login.microsoftonline.com/mygurukool.onmicrosoft.com/oauth2/v2.0/token';

$data = array(
  'grant_type'    => 'authorization_code',
  'client_id'     => '1f4ddefc-d849-4f30-a410-73297ed98422',
  'scope'         => 'Notes.Read.All Files.ReadWrite.All',
  'code'          => $code,
  'redirect_uri'  => 'http://localhost/auth.php',
  'client_secret' => 'bD:QX/_Eae?7fOAoC2RshWDd7ICBQG6a'
);

curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec($ch);

curl_close ($ch);

// -- parse the server json response as php-array.
$response = json_decode($server_output, true);

// -- get the token
$token = $response['access_token'];

// -- send it out to the school app.
header("Location: http://localhost/student/$token");

?>
