var carouselWidth = $('.carousel-inner')[0].scrollWidth;
var cardWidth = $('.carousel-item').width();
var scrollPosition = 0;
var cardsPerView = window.innerWidth >= 1200 ? 3 : (window.innerWidth >= 769 ? 2 : 1);

// Cập nhật khi thay đổi kích thước màn hình
$(window).on('resize', function(){
    cardWidth = $('.carousel-item').width();
    cardsPerView = window.innerWidth >= 1200 ? 3 : (window.innerWidth >= 769 ? 2 : 1);
    carouselWidth = $('.carousel-inner')[0].scrollWidth;
});

$('.carousel-control-next').on('click', function(){
    if(scrollPosition < (carouselWidth - (cardWidth * cardsPerView))){
        scrollPosition = scrollPosition + cardWidth;
    } else {
        scrollPosition = 0; // Quay lại đầu
    }
    $('.carousel-inner').animate({scrollLeft: scrollPosition}, 600);
});

$('.carousel-control-prev').on('click', function(){
    if(scrollPosition > 0){
        scrollPosition = scrollPosition - cardWidth;
    } else {
        scrollPosition = carouselWidth - (cardWidth * cardsPerView); // Cuộn đến cuối
    }
    $('.carousel-inner').animate({scrollLeft: scrollPosition}, 600);
});