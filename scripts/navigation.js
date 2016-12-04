//classie.js

( function( window ) {

'use strict';

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

window.classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

})( window );

//Menu

var menuLeft = document.getElementById( 'menu' );
var showLeftPush = document.getElementById( 'showLeftPush' ),
body = document.body;

showLeftPush.onclick = function() {
    classie.toggle( this, 'active' );
    classie.toggle( body, 'menu-push-toright' );
    classie.toggle( menuLeft, 'menu-open' );
    disableOther( 'showLeftPush' );
};

function disableOther( button ) {
    if( button !== 'showLeftPush' ) {
        classie.toggle( showLeftPush, 'disabled' );
    }
}

$(document).ready( function() {

    var pageAddress;
    var pageName;

    $('.menu ul li a').click( function() {
        $('.menu ul li a').removeClass('active');
        $(this).addClass('active');
        $('.container > div').removeClass('open');
        pageAddress = $(this).attr('href').slice(1);
        if (pageAddress == 'projeler') {
            pageName = 'projects';
        } else if (pageAddress == 'kurumsal') {
            pageName = 'about';
        } else if (pageAddress == 'ekibimiz') {
            pageName = 'team';
        } else if (pageAddress == 'iletisim') {
            pageName = 'contact';
        }
        $('#' + pageName).addClass('open');
        $('#showLeftPush').click();
    });
});

//Opacity Changer

$('#showLeftPush').click(function() {
    $('.main.container').toggleClass('passive');
});

//Map-Ready

function mapSize() {
    var mapWidth = $('#contact').width();
    var mapHeight = $(window).height() / 2;
    $('#map').parent().css({'width': mapWidth + 'px', 'height': mapHeight + 'px'}); //Dimensions solved.
    $('#map').css({'width': mapWidth - 10 + 'px', 'margin-left': '5px'}); //Shadow problem solved.
} mapSize();

$(window).resize( function() {
    mapSize();
});