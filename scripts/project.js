/*

var elems = [];
var currentItems = [];
var currentNumber = 1;
document.addEventListener(
    'scroll',
    function(event){
        var elm = $(event.target);
        console.log(elm);
        if( $.inArray(elm, elems)){
            var currentProject = elm.attr("id");
            var currentPicture = $('#' + currentProject + ' .picture:nth-child(' + currentNumber + ')');
            var currentOffset = currentPicture.offset().top;
            
            var requiredOffset = $(window).height() / 2;
            
            if ($.inArray(currentProject, currentItems) == -1 && currentOffset <= requiredOffset) {
                currentItems.push(currentProject);
                
                var newOffset = ($(window).height() - currentPicture.height()) / 2 - currentOffset;
                $('#' + currentProject + ' .eight.columns').offset({'top': newOffset}).css('position', 'fixed');
            } else {
                $(window).bind('mousewheel', function(event) {
                    if (event.originalEvent.wheelDelta >= 0) {
                        elems = [];
                        $('#' + currentProject + ' .eight.columns').offset({'top': 0});
                    }
                    else {
                        console.log('ELSE');
                        var asd = currentPicture.height();
                        
                        console.log(asd);
                        var newOffset = currentOffset - asd;
                        
                        console.log(newOffset);
                        $('#' + currentProject + ' .eight.columns').offset({'top': newOffset});
                        currentNumber++;
                        console.log(currentNumber);
                        //alert('Scroll down');
                        setTimeout(alert, 1000);
                    }
                });
            }
        }
    },
    true
);

*/

var elems = [];

$(document).ready( function() {

    //Calculation
    window.currentNumber = 1;
    window.totalNumber = 0;
    var width = $('.one.column').width();
    var margin = $('.column').css('margin-left').slice(0, -2);
    window.offset = parseInt(width) + parseInt(margin);
    
    //Printing

    $.getJSON( 'entries.json', function(data) {
    }).done(function(data) {

        var counter = 0;
        var column = 0;
        var row = 0;
        var lastRow = 0;
        var metaKeywords;
        
        data = data.reverse();
        window.reversed = false;

        $.each(data, function (index, value) {
            postData = value;
            
            column = counter % 8;
            row = Math.floor(counter/8);

            $('.group').append('<div id="' + postData['code'] + '" class="one column" style="left: ' + window.offset * column + 'px; top: ' + window.offset * row + 'px;"><button onclick="openProject(\'' + postData['code'] + '\');" class="' + postData['code'] + '" type="button"><span class="preview"><img src="projects/' + postData['code'] + '/0.jpg" title="' + postData['title'] + '" /></span><span class="information"><h4>' + postData['title'] + '</h4><b>Proje Tipi:</b> ' + postData['type'] + '<br><b>Proje Yılı:</b> ' + postData['year'] + '</span></button><div id="project_'+postData['code']+ '" class="project"><a class="close" onclick="closeProject(\'' + postData['code'] + '\');"><img src="images/close-icon.png" /></a><div><div class="overlay"><div class="container"><div class="eight columns"><!--<h2>PROJE</h2>--><h1>' + postData['title'] + '</h1><p>' + postData['description'] + '</p><h3>Proje Detayları</h3><p><b>Proje Tipi:</b> ' + postData['type'] + '<br><b>Proje Yeri:</b> ' + postData['place'] + '<br><b>Proje Alanı:</b> ' + postData['scale'] + '&#13217<br><b>Proje Yılı:</b> ' + postData['year'] + '<br><b>İşveren:</b> ' + postData['client'] + '</p><h3>Görüntüler</h3><div class="pictures"></div></div></div></div></div></div></div>');
            
            metaKeywords = $('meta[name=keywords]').attr('content');
            $('meta[name=keywords]').attr('content', metaKeywords + ', ' + postData['title']);
            
            if (row >= lastRow) {
                lastRow = row;
                $('.group').css('height', window.offset * 4 + 'px');
            }
            counter++;
            elems.push($("#project_"+ postData['code']));
            
            
        });
        
    });
    
    //Sorting
    
    window.lastApplied = $('.usual');

    $('.usual').click(function sortUsually() {
        $('.filter').removeClass('active');
        $('#usual').addClass('active');
        $.getJSON( 'entries.json', function(data) {
        }).done(function(data) {
            
            data = data.reverse();
            
            var counter = 0;
            var column = 0;
            var row = 0;
            var lastRow = 0;
            $('.group > div').each(function() {
                column = counter % 8;
                row = Math.floor(counter/8);
                $(this).css('left', window.offset * column + 'px');
                $(this).css('top', window.offset * row + 'px');
                /*
                if (row >= lastRow) {
                    lastRow = row;
                    $('.group').css('height', window.offset * (row + 1) + 'px');
                }
                */
                $('.group').css('height', window.offset * 4 + 'px');
                counter++;
            });
        });
        window.lastApplied = $('.usual');
    });

    $('.alphabetical').click(function sortAlphabetically() {
        $('.filter').removeClass('active');
        $('#alphabetical').addClass('active');
        $.getJSON( 'entries.json', function(data) {
        }).done(function(data) {
            
            data = data.reverse();
            
            var query;
            var counter = [0, 0, 0, 0, 0, 0, 0, 0];
            var column = 0;
            var row = 0;
            var lastRow = 0;

            var keys = Object.keys(data);

            var number = 0;

            $.each(keys, function() {
                postID = keys[number];
                postData = data[postID];
                query = postData['title'].charAt(0);
                var alpha_dict = {'A': 0, 'B': 0, 'C': 1, 'Ç': 1, 'D': 1, 'E': 2, 'F': 2, 'G': 2, 'H': 2, 'I': 3, 'İ': 3, 'J': 3, 'K': 4, 'L': 4, 'M': 4, 'N': 5, 'O': 5, 'Ö': 5, 'P': 5, 'Q':6, 'R': 6, 'S': 6, 'Ş': 6, 'T': 6, 'U': 7, 'V': 7, 'W': 7, 'X': 7, 'Y': 7, 'Z': 7};
                if(alpha_dict[query] != undefined){
                    column = alpha_dict[query];
                    row = counter[column];
                    counter[column]++;
                }
                 else {
                    $('#' + postData['code']).remove();
                }
                $('#' + postData['code']).css('left', window.offset * column + 'px');
                $('#' + postData['code']).css('top', window.offset * row + 'px');
                if (row >= lastRow) {
                    lastRow = row;
                    $('.group').css('height', window.offset * (row + 1) + 'px');
                }
                number++;
            });
        });
        window.lastApplied = $('.alphabetical');
    });

    $('.chronological').click(function sortChronologically() {
        var d = new Date();
        var currentYear = d.getFullYear();
        $('.filter').removeClass('active');
        $('#chronological').addClass('active');
        $('#chronological div h4').each(function() {
            $(this).html(currentYear);
            currentYear--;
        });
        $.getJSON( 'entries.json', function(data) {
        }).done(function(data) {
            
            data = data.reverse();
            
            var query;
            var counter = [0, 0, 0, 0, 0, 0, 0, 0];
            var column = 0;
            var row = 0;
            var lastRow = 0;

            var keys = Object.keys(data);

            var number = 0;

            $.each(keys, function() {
                postID = keys[number];
                postData = data[postID];
                query = postData['year'];
                var d = new Date();
                var currentYear = d.getFullYear();
                var chrono_dict = {};
                for(i = 0; i < 8; i++) {
                    chrono_dict[currentYear - i] = i;
                }
                if(chrono_dict[query] != undefined){
                    column = chrono_dict[query];
                    row = counter[column];
                    counter[column]++;
                } else {
                    column = 7;
                    row = counter[7];
                    counter[7]++;
                }
                $('#' + postData['code']).css('left', window.offset * column + 'px');
                $('#' + postData['code']).css('top', window.offset * row + 'px');
                if (row >= lastRow) {
                    lastRow = row;
                    $('.group').css('height', window.offset * (row + 1) + 'px');
                }
                number++;
            });
        });
        window.lastApplied = $('.chronological');
    });

    $('.typological').click(function sortTypologically() {
        $('.filter').removeClass('active');
        $('#typological').addClass('active');
        $.getJSON( 'entries.json', function(data) {
        }).done(function(data) {
            
            data = data.reverse();
            
            var query;
            var counter = [0, 0, 0, 0, 0, 0, 0, 0];
            var column = 0;
            var row = 0;
            var lastRow = 0;

            var keys = Object.keys(data);

            var number = 0;

            $.each(keys, function() {
                postID = keys[number];
                postData = data[postID];
                query = postData['type'];

                if (query == 'Eğitim' || query == 'Sağlık') {
                    column = 0;
                    row = counter[0];
                    counter[0]++;
                } else if (query == 'Ticaret') {
                    column = 1;
                    row = counter[1];
                    counter[1]++;
                } else if (query == 'Kültür') {
                    column = 2;
                    row = counter[2];
                    counter[2]++;
                } else if (query == 'Konut') {
                    column = 3;
                    row = counter[3];
                    counter[3]++;
                } else if (query == 'Karma K.') {
                    column = 4;
                    row = counter[4];
                    counter[4]++;
                } else if (query == 'Endüstri') {
                    column = 5;
                    row = counter[5];
                    counter[5]++;
                } else if (query == 'Kamu' || query == 'Kentsel') {
                    column = 6;
                    row = counter[6];
                    counter[6]++;
                } else if (query == 'Ofis') {
                    column = 7;
                    row = counter[7];
                    counter[7]++;
                } else {
                    $('#' + postData['code']).remove();
                }
                $('#' + postData['code']).css('left', window.offset * column + 'px');
                $('#' + postData['code']).css('top', window.offset * row + 'px');
                if (row >= lastRow) {
                    lastRow = row;
                    $('.group').css('height', window.offset * (row + 1) + 'px');
                }
                number++;
            });
        });
        window.lastApplied = $('.typological');
    });
    
    $('#categories h3').click( function() {
        $('#categories h3').removeClass('active');
        $(this).addClass('active');
    });
});

//Action

function openProject(projectName) {
    $('body').css('overflow', 'hidden');
    $('#' + projectName + ' .project').css('display', 'block');
    $('#' + projectName + ' .project').css('opacity', '1');
    getPictures(projectName);
    window.currentNumber = 1;
    window.totalNumber = 0;
    var viewportWidth = $(window).width();
    if(viewportWidth > 768){
        var currentProject = projectName;
        var currentPicture = $('#' + currentProject + ' .picture:nth-child(' + window.currentNumber + ')');

        window.totalNumber = $('#' + currentProject + ' .picture').length;
        window.requiredWidth = $('.main.container').width();
        window.requiredMargin = $('.column').css('margin-left').slice(0, -2);
        window.requiredPush = parseInt(requiredWidth) + parseInt(requiredMargin);
        $('#' + currentProject + ' .picture').css({'width': window.requiredWidth + 'px', 'height': window.requiredWidth * 9 / 16 + 'px', 'opacity': '.5'});
        currentPicture.css({'display': 'block', 'opacity': '1'});
        $('#' + projectName + ' .project .eight.columns').append('<a href="#" class="prev"><img style="top: -' + window.requiredWidth * 9 / 32 + 'px; left: -70px;" src="images/icon-prev.png" /></a><a href="#" class="next"><img style="top: -' + window.requiredWidth * 9 / 32 + 'px; right: -' + window.requiredWidth + 'px;" src="images/icon-next.png" /></a>');
        showSlides(projectName);
        
    }
}

function closeProject(projectName) {
    $('body').css('overflow', 'visible');
    window.currentNumber = 0;
    $('#' + projectName + ' .project').css('display', 'none');
    $('#' + projectName + ' .pictures').css('left', '0px');
    $('.prev').remove();
    $('.next').remove();
}



function showSlides(projectName) {
   var currentProject = projectName;
    var currentPictureSet = $('#' + currentProject + ' .pictures');
    $('#' + currentProject + ' .next').click(function(){
        window.currentNumber++;

        if(window.currentNumber == window.totalNumber){
            $('#' + currentProject + ' .next').hide();
        } else {
            $('#' + currentProject + ' .next').show();
        }
        
        if(window.currentNumber == 1){
            $('#' + currentProject + ' .prev').hide();
        } else {
            $('#' + currentProject + ' .prev').show();
        }
        
        $('#' + currentProject + ' .picture').css({'width': window.requiredWidth + 'px', 'height': window.requiredWidth * 9 / 16 + 'px', 'opacity': '.5'});
        var currentPicture = $('#' + currentProject + ' .picture:nth-child(' + window.currentNumber + ')');
        currentPicture.css({'display': 'block', 'opacity': '1'});
        currentPictureSet.css('left', '-=' + window.requiredPush);
        
       // showSlides(projectName);
    });
    
    $('#' + currentProject + ' .prev').click(function(){
         window.currentNumber--;
        $('#' + currentProject + ' .picture').css({'width': window.requiredWidth + 'px', 'height': window.requiredWidth * 9 / 16 + 'px', 'opacity': '.5'});
        var currentPicture = $('#' + currentProject + ' .picture:nth-child(' + window.currentNumber + ')');
        currentPicture.css({'display': 'block', 'opacity': '1'});
        currentPictureSet.css('left', '+=' + window.requiredPush);
       
        if(window.currentNumber == 1){
            $('#' + currentProject + ' .prev').hide();
        } else {
            $('#' + currentProject + ' .prev').show();
        }
        
        if(window.currentNumber == window.totalNumber){
            $('#' + currentProject + ' .next').hide();
        } else {
            $('#' + currentProject + ' .next').show();
        }
       // showSlides(projectName);
    });
    
    
}

//Loading

function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function getPictures(projectName) {
    var i = 1;
    for(;;i++){
        if(UrlExists('projects/' + projectName + '/' + i + '.jpg')){
            $('#' + projectName + ' .pictures').append('<img class="picture" id="resim' + i + '" src="projects/' + projectName + '/' + i + '.jpg">');
        }
        else{
            return;
        }
    }
}

//Resizing

$(window).resize( function() {
    
    var width = $('.one.column').width();
    var margin = $('.column').css('margin-left').slice(0, -2);
    window.offset = parseInt(width) + parseInt(margin);
    window.lastApplied.click();
    
});