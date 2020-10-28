$(document).ready(function(){


	// setTimeout(function(){ $(".logo").css({"opacity":"1","transform":"scale(1)"});  }, 500);

	// $('.headerVideoLink').magnificPopup({
    //       type:'inline',
    //       midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    // });

	var width=$(document).width();

	if(width<1199){
	    // var swiper = new Swiper('.swiper-container', {
	    //   slidesPerView: 2,
	    //   spaceBetween: 30,
	    //   loop: true,
	    //   pagination: {
	    //     el: '.swiper-pagination',
	    //     clickable: true,
	    //   },
		// });
		$('.btn-nav').click(function() {
			$('.menu').toggleClass('menu-mobile');
		});
    	$('.hamburger').click(function() {
			$('.hamburger').toggleClass('is-active');
			$('.menu').toggleClass('menu-mobile');
			$('.menu-list').toggleClass('open-menu');
			$('.p-menu').toggleClass('p-menu-open');
			$('.contenido').toggleClass('p-menu-open-r');
			
			return false;
		});		



	}else{
		// var swiper = new Swiper('.swiper-container', {
	    //   slidesPerView: 3,
	    //   spaceBetween: 30,
	    //   loop: true,
	    //   pagination: {
	    //     el: '.swiper-pagination',
	    //     clickable: true,
	    //   },
	    // });
	    $('.hamburger').click(function() {
			$('.hamburger').toggleClass('is-active');
			$('.menu-list').toggleClass('open-menu');
			$('.p-menu').toggleClass('p-menu-open');
			//$('.menuresponsive').toggleClass('is-active');
			return false;
		});

	}
});