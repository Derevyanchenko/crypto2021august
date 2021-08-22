// new

$(document).ready(function () {

  // init country flags in input type 'tel'
  $.getJSON("https://api.ipgeolocation.io/ipgeo?apiKey=8b89ec03c3214360aa2696a3cad1e0f7&ip=", function (data) { 
    
    JSON.stringify(data, null, 2);
    country = data.country_code2;
        
    $("input[type=tel]").intlTelInput({
        allowDropdown:true,
        autoPlaceholder:"polite",
        separateDialCode:true,
        dropdownContainer: false,
        initialCountry: country
    });

  });

  // add flag image and country name in header 
  $.getJSON('https://api.ipgeolocation.io/ipgeo?apiKey=8b89ec03c3214360aa2696a3cad1e0f7&ip=', function (data) {
    JSON.stringify(data, null, 2);
    country_Name = data.country_name;
    country_Flag = data.country_flag;
    $("span.traders-in-country").text(country_Name);
    $("img.flag-custom.country-flag").attr("src", country_Flag);
  });

  // On scroll fix img height
  var scr = 0;

  $(window).on('scroll', function () {
  if($('.track-wrap').length) {

    if (scr < 2) {
      let imgHeight = $('.track-earnings').height();
      $('.track-wrap').height(imgHeight);
      scr++;
    }

  }
});

});

// popup methods

var modal = document.querySelector("#exlusive-offers");
     
function closeModal() {
    modal.classList.remove('show');
}

function openModal() {
    modal.classList.add('show');
}

var closeModalBtn = document.querySelector('.exit__close');
closeModalBtn.addEventListener('click', e => {
   console.log('clicked');
   closeModal();
});

var countShowPopup = 0;
document.addEventListener('mouseleave', function(e) {
  if ( e.clientY < 20  && $(window).width() > 268  && countShowPopup < 2 ) {
    openModal();
    countShowPopup++;
  } else {
    return;
  }

});

// password

///////////////password function//////////
$(function() {
  $('.toggle-gen-password').on('click', function() {
      $(this).toggleClass('is-active');
      var $field = $(this).closest('.toggle-gen-password').prev();
      if ($field.attr('type') === 'text') {
          $field.attr('type', 'password');
      } else {
          $field.attr('type', 'text');
      };
  });

  $('.field-password').val(randPassword(5, 2, 2)).change();

  $('.button-gen-password').on('click', function() {
      $('.field-password').val(randPassword(5, 2, 2)).change();
  });
});

function randPassword(letters, numbers, either) {
  var chars = [
      "abcdefghijklmnopqrstuvwxyz", // letters
      "0123456789", // numbers
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" // either
  ];

  return [letters, numbers, either].map(function(len, i) {
      return Array(len).fill(chars[i]).map(function(x) {
          return x[Math.floor(Math.random() * x.length)];
      }).join('');
  }).concat().join('').split('').sort(function() {
      return 0.5 - Math.random();
  }).join('')
}

// old
getParameter = function (name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

$(function() {

  var terms = getParameter('terms');
  if (terms != null && terms != ""){
    var privacy_link_html = '<li><a href="privacy.html" class="smooth-scroll" target="_blank" >Privacy Policy</a></li> <li><a href="terms.html" class="smooth-scroll" target="_blank">Terms</a></li> <li><a href="abuse_report.html" class="smooth-scroll" target="_blank">Report&nbsp;Abuse/Spam</a></li>';
    var footer_links = document.querySelector('.footer-links');
    footer_links.innerHTML = footer_links.innerHTML + privacy_link_html;
  }

  // Expert slider init
  if($('.expert-slider').length) {
    $('.expert-slider').bxSlider({
      slideWidth: 350,
      hideControlOnEnd: true,
      touchEnabled: true,
      pager: true,
      infiniteLoop: false,
      minSlides: 1,
      maxSlides: 3,
      moveSlides: 1,
      nextText: '<img src="./img/slider-arrow.svg" alt="Slider Right Arrow" />',
      prevText: ''
    });
  }

  // Investors slider init
  if($('.investors-slider').length) {
    $('.investors-slider').bxSlider({
      slideWidth: 370,
      controls: false,
      touchEnabled: true,
      pager: true,
      infiniteLoop: false,
      minSlides: 1,
      maxSlides: 3,
      moveSlides: 1
    });
  }

  // if($('.track-wrap').length) {
  //   let imgHeight = $('.track-earnings').height();
  //   $('.track-wrap').height(imgHeight);
  // }


  // Success modal
  if($('.banner form').length) {
    // $('.banner form').validate();

    $('.banner form').submit(function(e){
      e.preventDefault();
      
      if(!$('.banner form input.error').length) {
        $('.banner .modal-wrap').fadeIn();
        $('.banner .modal-wrap').attr('style', 'display:flex;');
        $('body').addClass('prevent-scroll');
      }
    });

    $('.banner .modal .close-modal').on('click', function(e){
      e.preventDefault();

      $(this).closest('.modal-wrap').fadeOut();
      $('body').removeClass('prevent-scroll');
    });
  }


  if($('#modal-test').length) {
    $('#modal-test').on('click', function(e) {
      e.preventDefault();

      $('#exlusive-offers').fadeIn();
      $('#exlusive-offers').attr('style', 'display:flex;');
      $('body').addClass('prevent-scroll');
    });
  }

  if($('.banner .video-play').length) {
    $('.banner .video-play').on('click', function(){

      // click
      console.log('clicked');
      var video = Wistia.api("5zvgldo8ki");
      video.play();
      $('.video-placeholder').attr('style', 'left: -100%;');
    });
  }

  // Smooth scrolling
  if($('.smooth-scroll').length) {
    $('.smooth-scroll').on('click', function(e) {
      if (this.hash !== "") {
        e.preventDefault();

        let hash = this.hash,
            scroll = $(hash).offset().top - $('header').height();

        $('html, body').animate({
          scrollTop: scroll
        }, 800);
      }
    });
  }

  // Calculate
  if($('#investment').length) {
    $('#investment').on('change', function() {
      let val = this.value,
          profit = (val * 5.6).toFixed(2);
      if(!isNaN(val) && val !== '') {
        $('#profit').text(profit);
        $('#profit').closest('h5').addClass('show-result');
      } else {
        $('#profit').text('00,000');
        $('#profit').closest('h5').removeClass('show-result');
      }
    });
  }

  var today = new Date();
  $('.today-warn').text((today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear());


  function initCountdown() {
    var countdownSpan = $('#time');
    var countdownMinSpan = $('#modal-hours');
    var countdownSecSpan = $('#modal-minutes');
    var countdownSpanVal = countdownSpan.text();
    var mmSsArray = countdownSpanVal.split(":");
    var mm = parseInt(mmSsArray[0]);
    var ss = parseInt(mmSsArray[1]);
    if (mm === 0 && ss === 0)
      return;
    if (ss === 0) {
      mm--;
      ss = 59;
    } else
      ss--;
    var isSecondsSingleDigit = Math.floor(ss / 10) === 0 ? true : false;

    var newCountdownSpanVal = '';
    var newCountdownSecSpanVal = '';
    if (isSecondsSingleDigit) {
      newCountdownSpanVal = "0" + mm.toString() + ":" + "0" + ss.toString();
      newCountdownSecSpanVal = "0" + ss.toString();
    } else {
      newCountdownSpanVal = "0" + mm.toString() + ":" + ss.toString();
      newCountdownSecSpanVal = ss.toString();
    }

    countdownSpan.text(newCountdownSpanVal);
    if($('.modal .timer').length) {
      countdownMinSpan.text("0" + mm.toString());
      countdownSecSpan.text(newCountdownSecSpanVal);
    }

    setTimeout(function () {
      initCountdown();
    }, 1000)
  }


  if($('#time').length) {
    initCountdown();
  }

  // On resize
  $(window).resize(function () {
    if($('.track-wrap').length) {
      let imgHeight = $('.track-earnings').height();
      $('.track-wrap').height(imgHeight);
    }
  });


});