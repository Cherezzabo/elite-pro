

$(document).ready(function () {

    //Search field show/hide toggler
    var searchButton =  $('#search-button');
    var searchFormWrapper = $('.form-wrapper');
    var searchForm = $('#search-box');
    var navItems = $('#topNav .nav-item');
    var collapsingNavbar = $('#collapsingNavbar');

    searchButton.on('click', function() {
        searchButton.find('button').toggleClass('loupe cross');
        navItems.toggleClass('shrinkEffect');
        searchFormWrapper.toggleClass('displayFlexEffect');
        searchForm.toggleClass('slideInEffect');
        searchForm.children('input').toggleClass('slideInEffect').focus();
    });

    //Collapsed menu toggle
    var topNavToggler = $('.navbar-toggler');
    topNavToggler.on('click', function() {
        collapsingNavbar.toggleClass('disabled');
        topNavToggler.toggleClass('gh-svg-wrapper-toggled')
                     .prev('.collapse-button-cover')
                     .toggleClass('displayBlockEffect')
                     .toggleClass('displayBlockEffect', 500);
    });

    //Collapsed menu scroll disable
    $('.collapseMenu').on('scroll touchmove mousewheel', function(e){
      e.preventDefault();
      e.stopPropagation();
      return false;
    })

    //bxSlider Init
    var addNavSlider = $('#additionalNavSlider').bxSlider({
        mode: 'horizontal',
        minSlides: 2,
        maxSlides: 10,
        slideWidth: 50,
        slideMargin: 0,
        adaptiveHeight: true,
        moveSlides: 1,
        pager: false,
        touchEnabled: true,
        preventDefaultSwipeY: true,
        controls: true,
        hideControlOnEnd: true,
        infiniteLoop: false,
        nextSelector: '#slider-next',
        prevSelector: '#slider-prev',
        nextText: '›',
        prevText: '‹'
    });

    $('#gallerySlider').bxSlider({
        mode: 'horizontal',
        minSlides: 1,
        maxSlides: 1,
        controls: true,
        touchEnabled: true,
    });

    //Additional menu show/hide on click
    $('.nav-item').click(
        function() {
            if ($(this).attr('id') == 'link3' || $(this).attr('id') == 'link4') {
                $('#additionalNav').show(300, function() {
                    addNavSlider.reloadSlider();
                });
                
            } else {
                $('#additionalNav').hide(300);
            }
        }
    );    

    //Footer list toggler animation
    $('[data-toggle="collapse"]').on('click', function(e) {
        $(this).parent().parent().parent().find('.list-toggler').toggleClass('list-toggler-active');
    })

});