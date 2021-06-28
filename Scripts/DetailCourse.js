lst_review = []
$(document).ready(function(){
    q = window.location.href.split('?tag=')[1]
    $.ajax({
        url : "https://116.109.74.221:8000/api/course?course_tag="+q,
        type : "GET",
        contentType:"application/json",
        dataType:"json",
        success : function (result){
            document.getElementById('image').innerHTML = '<a href="single-company-profile.html"><img src="'+result[0].course_image+'" alt=""></a>'
            document.getElementById('headertitle').innerHTML = '<h3>'+result[0].course_title+'</h3>'+
                        '<h5>'+result[0].offer_by+'</h5>'+
                        '<ul>'+
                           ' <li><a href="single-company-profile.html"><i class="icon-material-outline-business"></i> King</a></li>' +
                            '<li>'+gen_star(result[0].rating)+'</li>' +
                            '<li><img class="flag" src="images/flags/gb.svg" alt="">'+result[0].language+'</li>' +
                            '<li><div class="verified-badge-with-title">Verified</div></li>' +
                        '</ul>'
            document.getElementById('about').innerHTML = '<h3 class="margin-bottom-25">About this course</h3>'+
            '<p>'+result[0].about.split('SHOW')[0]+'</p>'
            document.getElementById('meta').innerHTML = '<ul>' +
                                '<li>' +
                                    '<i class="icon-material-outline-speaker-notes"></i>'+
                                    '<span>Subtitle</span>' +
                                    '<h5>'+result[0].subtitle+'</h5>'+
                                '</li>'+
                                '<li>'+
                                    '<i class="icon-material-outline-person-pin"></i>'+
                                ' <span>Already Enrolled</span>'+
                                ' <h5>'+result[0].enrolled+'</h5>'+
                            ' </li>'+
                                '<li>'+
                                    '<i class="icon-material-outline-local-atm"></i>'+
                                    '<span>Salary</span>'+
                                    '<h5>$35k - $38k</h5>'+
                                '</li>'+
                            ' <li>'+
                                    '<i class="icon-material-outline-access-time"></i>'+
                                    '<span>Date Posted</span>'+
                                    '<h5>2 days ago</h5>'+
                                '</li>'+
                        ' </ul>'
            //Handling related course
            $.ajax({
                url:'https://116.109.74.221:8000/api/relatedcourse?keyword='+result[0].keyword,
                type : "GET",
                contentType:"application/json",
                dataType:"json",
                success : function (data){
                    for(var i = 0; i<data.length; i ++){
                        document.getElementById('relatedcourse').innerHTML += '<a id="'+data[i].course_tag+'" onclick="detailCourse(this)" style="cursor:pointer" class="job-listing">'+

                    
                                '<div class="job-listing-details">'+
                                
                                    '<div class="job-listing-company-logo">'+
                                        '<img src="'+data[i].course_image+'" alt="">'+
                                    '</div>'+

                                
                                    '<div class="job-listing-description">'+
                                    ' <h4 class="job-listing-company">'+data[i].offer_by+'</h4>'+
                                        '<h3 class="job-listing-title">'+data[i].course_title+'</h3>'+
                                ' </div>'+
                                '</div>'+

                            
                            ' <div class="job-listing-footer">'+
                                    '<ul>'+
                                    ' <li><i class="icon-material-outline-location-on"></i> San Francisco</li>'+
                                        '<li><i class="icon-material-outline-business-center"></i> Full Time</li>'+
                                        '<li><i class="icon-material-outline-account-balance-wallet"></i> $35000-$38000</li>'+
                                        '<li><i class="icon-material-outline-access-time"></i> 2 days ago</li>'+
                                    '</ul>'+
                                '</div>'+
                                '</a>'
                            if(i == 3){
                                break
                            }
                    }
                    
                }
            })
            //review
            star = 0
            lst_review.push(result[0].review)
            handlChangePage(0)
            //
            document.getElementById('direct').innerHTML = '<a href="'+result[0].course_url+'" class="apply-now-button popup-with-zoom-anim" target="_blank">Go to class <i class="icon-material-outline-arrow-right-alt"></i></a>'
           
        }
    });
   
})


function gen_star(star){
    if(star < 5 && star > 4){
        return '<div class="star-rating" data-rating="'+star+'"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span><span class="star half"></span></div>'
    }
    if(star < 4 && star > 3){
        return '<div class="star-rating" data-rating="'+star+'"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star half"></span><span class="star empty"></span></div>'
    }
    if(star < 3 && star > 2){
        return '<div class="star-rating" data-rating="'+star+'"><span class="star"></span><span class="star"></span><span class="star half"></span><span class="star empty"></span><span class="star empty"></span></div>'
    }
    if(star < 2 && star > 1){
        return '<div class="star-rating" data-rating="'+star+'"><span class="star"></span><span class="star half"></span><span class="star empty"></span><span class="star empty"></span><span class="star empty"></span></div>'
    }

    switch(star) {
        case 5:
            return '<div class="star-rating" data-rating="5.0"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span></div>'
            break;
        case 4:
            return '<div class="star-rating" data-rating="4.0"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span><span class="star empty"></span></div>'
            break;
        case 3:
            return '<div class="star-rating" data-rating="4.0"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star empty"></span><span class="star empty"></span></div>'
            break
        case 2:
            return '<div class="star-rating" data-rating="2.0"><span class="star"></span><span class="star"></span><span class="star empty"></span><span class="star empty"></span><span class="star empty"></span></div>'
            break
        case 1:
            return '<div class="star-rating" data-rating="1.0"><span class="star"></span><span class="star empty"></span><span class="star empty"></span><span class="star empty"></span><span class="star empty"></span></div>'
            break 
        default:
            return star
            break
      }
}

function handlChangePage(num_pos){
    document.getElementById('review').innerHTML = ''
    start = lst_review[0].length - num_pos;
    end =  start - 5;
    for(var review_index = start-1 ; review_index >= end; review_index--){
        document.getElementById('review').innerHTML += '<li>'+
            '<div class="boxed-list-item">'+
                '<div class="item-content">'+
                    '<h4>'+lst_review[0][review_index].reviewer+'</h4>'+
                    '<div class="item-details margin-top-10">'+
                        gen_star(lst_review[0][review_index].star)+
                        '<div class="detail-item"><i class="icon-material-outline-date-range"></i>'+lst_review[0][review_index].review_date+'</div>'+
                ' </div>'+
                    '<div class="item-description">'+
                        '<p>'+lst_review[0][review_index].review_text+'</p>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</li>'
    }
}

function previousPageFunc(obj){
    offsetPrev = document.getElementById('previousClick').getAttribute('value');
    offsetNext = document.getElementById('nextClick').getAttribute('value');
    if(offsetPrev != 0){
      $('.loading').show()
      handlChangePage(offsetPrev-5)
      document.getElementById('previousClick').setAttribute('value', parseInt(offsetPrev) - 5)
      document.getElementById('nextClick').setAttribute('value', parseInt(offsetNext) - 5)
    }
  }
function nextPageFunc(obj){
    offsetPrev = document.getElementById('previousClick').getAttribute('value');
    offsetNext = document.getElementById('nextClick').getAttribute('value');
    if(offsetNext < lst_review[0].length){
      $('.loading').show()
      handlChangePage(offsetNext);
      document.getElementById('previousClick').setAttribute('value', parseInt(offsetPrev) + 5)
      document.getElementById('nextClick').setAttribute('value', parseInt(offsetNext) + 5)
    }
    
}