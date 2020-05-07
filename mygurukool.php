<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 1000');
	header("X-Frame-Options: SAMEORIGIN");
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
		header("X-Frame-Options: SAMEORIGIN");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
    }
    exit(0);
}
$entityBody = file_get_contents('php://input');
$result = json_decode($entityBody);

$dom = new DOMDocument();	

@$dom->loadHTML($result->data);
//$dom->loadHTML($result->data);
?>

<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;700&display=swap" rel="stylesheet">
<!-- Bootstrap core CSS -->

<link href="css/all.min.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<div class="card-body">
	<div class="row">
		<div class="col-12">
		<button type="button" class="btn btn-submit turnin"><i class="fas fa-check"></i> Turn In</button>
		</div>
		<div class="card-header col-12">
			<ul>
<?php    
$pdf_youtube_link = '';
foreach ($dom->getElementsByTagName('p') as $item) {
?>
	
			<li>
			<?php
				if(isset($item->firstChild->tagName) && $item->firstChild->tagName !== 'a') {
					echo $item->nodeValue;
				}
			?>
			</li>
		
		<?php
			if(isset($item->firstChild->tagName) && $item->firstChild->tagName == 'a') {
				$pdf_youtube_link = $item->firstChild;
			}
		?>
		

<?php
}
?>	
			</ul>
		</div>
<div class="col-12" style="margin-top:5px">
	
	<?php
		foreach($pdf_youtube_link->attributes as $attr){
			if(strpos($attr->value,"youtu")!== false){
	?>
			<iframe width="50%" height="150" src="<?php echo $attr->value?>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
	<?php
			}
			else {
	?>
		<h3><?php echo $pdf_youtube_link->nodeValue?> 	<a href="<?php echo $attr->value?>" target="_blank" download><i class="fas fa-download"></i>Download</a><a href="#?" class="btn btn-primary" style="float:right" onClick={this.handleSubmitClick}>Submit</a></h3>
	<?php
			}
		}
	?>
	
		
	
</div>
	
	</div>
</div>