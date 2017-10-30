<meta charset="utf-8">
<title><?php echo $title_for_layout; ?></title>
<meta name="description" content="<?php echo $description_for_layout; ?>" />
<meta name="author" content="oyoyo">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- OGP -->
<meta property="og:description" content="PekoPekoは移動販売車を見つけるのにぴったりなサイトです。">
<meta property="og:url" content="http://index.com/">
<meta property="og:image" content="http://index.com/assets/image/ogimage.png">
<meta property="og:site_name" content="index">

<?php // 自動リダイレクトの指定があった場合は、指定秒数後にリダイレクトを行うmetaタグを挿入 ?>
<?php if(isset($autoRedirectSecond) && isset($autoRedirectUrl)) { ?>
<meta http-equiv="refresh" content="<?php echo $autoRedirectSecond ?> ; URL=<?php echo $autoRedirectUrl ?>">
<?php } ?>

<!-- favicon -->
<link rel="shortcut icon" href="/favicon.ico">
<!-- CSS -->
<link rel="stylesheet" href="/assets/css/style.css">
<!-- JS Viewport -->
<script>
var ua = navigator.userAgent;
var getDevice = (function(){
    if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
        document.write('<meta name="viewport" content="width=device-width,initial-scale=1">');
    }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
        return false;
    }else{
		document.write('<meta name="viewport" content="width=device-width,initial-scale=1">');
	}
})();

</script>
