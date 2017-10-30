window.jQuery = window.$ = require('jquery');
const imagesLoaded = require('imagesloaded');
imagesLoaded.makeJQueryPlugin($);
const matchHeight = require('jquery-match-height');
const velocity = require('velocity-animate');

/////////////////////// Execution ///////////////////////
;(function($) {

//要素宣言
var $window = $(window),
	$body = $("body");

//フラグ宣言
var is_index = false,
	is_store_detail = false;

//各ページの判定
function pageFlags(){
	if($body.hasClass('page-index')){
		is_index = true;
	}else if($body.hasClass('page-store_detail')){
		is_store_detail = true;
	}
}

//全ページ処理
function allpagesFunc(){
	// loading
	function loadingFunc(){

		var $loading = $(".loading"),
			$loading_box = $(".loading-box"),
			$loading_box_bar = $(".loading-box-bar"),
			$loading_box_item = $(".loading-box_item");

		var imgNum = imagesLoaded('body').images.length,
			loadedImg = 0,
			progressNowPosition = 0;

			Timer = setInterval(progressMonitor, 1000/50);
			imagesLoaded('body').on('progress', function(){
				loadedImg++;
			});

		function progressMonitor(){
			var progressPosition = (loadedImg/imgNum) * 100;
			progressNowPosition += (progressPosition-progressNowPosition) * 0.1;
			$loading_box_bar.css('width', progressNowPosition+'%');
			if(progressNowPosition >= 100){
				clearInterval(Timer);
				//読み込みボックスを丸ごと
				$loading_box.velocity({
					display:"none",
					duration: 1000,
					easing: 'easeInQuad',
				});
				//画面遷移時のアニメーション fadeをかける
				$loading.velocity({
					opacity: 0,
				},{
					display:"none",
					duration: 1000,
					easing: 'easeInQuad'
				});
			}
			// イージング計算を完了させる
			if(progressNowPosition > 99.9){
				progressNowPosition = 100;
			}
		}
	}

	// modal
	function modalFunc(){

		function modal() {
			$('.modal').velocity('stop').velocity({
				opacity: 1,
			},{
				duration: 330,
				display: 'block',
				easing: 'ease-in-out'
			});
			return false;
		}
		function modal_close() {
			$('.modal').velocity('stop').velocity({
				opacity: 0,
			},{
				duration: 330,
				display: 'none',
				easing: 'ease-in-out'
			});
			return false;
		}

		var $header_menu = $(".header-menu");

		$header_menu.on('click', function(e) {
			e.preventDefault();
			if( !$(this).hasClass("-active") ){
				modal();
			}else{
				modal_close();
			}
			$(this).toggleClass("-active");
		});
	}

	loadingFunc()
	modalFunc()

}

$(function(){

	pageFlags()
	allpagesFunc();

	if(is_index){

		//Def
		function time_func(){
			var nowHM = new Date();
			var nowHour = nowHM.getHours();
			var nowMin = nowHM.getMinutes();

			//Time
			if(nowHour < 10){
				nowHour = "0"+nowHour;
			}
			if(nowMin < 10){
				nowMin = "0"+nowMin;
			}
			var now = nowHour + ':' + nowMin;
			$(".js-top-hero-inr-time_date").text(now);

			//Time Message
			var msg01 = '『ブランチしよう。』';
			var msg02 = '『ランチしよう。』';
			var msg03 = '『お昼はたべたかな？遅いお昼かな？』';
			var msg04 = '『閉店中の時間です。』';
			var $msgArea = $('.js-top-hero-inr-message');


			if(nowHour >= 10 && nowHour <= 12){
				$msgArea.text(msg01);
			}
			else if(nowHour >= 12 && nowHour <= 14){
				$msgArea.text(msg02);
			}
			else if(nowHour >= 14 && nowHour <= 16){
				$msgArea.text(msg03);
			}else{
				$msgArea.text(msg04);
			}
		}

		function boxHeight_func(){
			var windowHeight = $(window).height();
			var boxHeight = $('.top-hero-inr').height();
			var paddingTop = windowHeight - boxHeight -20 + "px";
			$('.top-hero-inr').css({"padding-top":paddingTop});
			$('.loading-box_item').css({"top":paddingTop});
		}

		function matchHeight_func(){
			$(".pickup-list-item_title").matchHeight();
			$(".pickup-list-item_txt").matchHeight();
			$(".blog-list-item_title").matchHeight();
			$(".blog-list-item_txt").matchHeight();
		}

		//Do
		time_func();
		matchHeight_func();
		boxHeight_func();

	}else if( is_store_detail ){

		//サムネイル　スライダー処理
		$(".slick-slide").css({"display":"block"});
		$(".store_detail-thumbs-list").slick({
			arrows: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			centerMode: true,
			centerPadding: '160px',
			variableWidth: true
		});

		//背景画像高さ取得処理
		var dl_height = $(".store_detail-about-inr-dl").outerHeight();
		$(".store_detail-about-inr").css({"height":dl_height + 18 + "px"});
	}
});

})(jQuery);
