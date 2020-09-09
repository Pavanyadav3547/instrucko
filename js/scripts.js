$(document).ready(function(){

  // accordian
   $(".toggle").on("click", function() {
     if ($(this).hasClass("active")) {
       $(this).removeClass("active");
       $(this)
         .siblings(".inner-content")
         .slideUp(400);
       $(".toggle  i")
         .removeClass("fa-minus")
         .addClass("fa-plus");
     } else {
       $(".toggle  i")
         .removeClass("fa-minus")
         .addClass("fa-plus");
       $(this)
         .find("i")
         .removeClass("fa-plus")
         .addClass("fa-minus");
       $(".toggle").removeClass("active");
       $(this).addClass("active");
       $(".inner-content").slideUp(400);
       $(this)
         .siblings(".inner-content")
         .slideDown(400);
     }
   });


  // offerslider
  $('.offer-slider').owlCarousel({
    loop:true,
    margin:0,
    nav:true,
    navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    dots:true,
    autoplay:true,
    autoplaySpeed:400,
    responsiveClass:true,
    responsive:{
      0:{
        items:1,
        nav:false,
        dots:true,
      },
      600:{
        items:2,
        nav:true
      },
      1000:{
        items:2,
        nav:true,
        loop:true
      },
      1200:{
        items:3,
        nav:true,
        loop:true
      }
    }
  });


  var $owl = $('.instruckos-slider');
  $owl.children().each( function( index ) {
    $(this).attr( 'data-position', index ); // NB: .attr() instead of .data()
  });

  $owl.owlCarousel({
    center:true,
    loop:true,
    margin:0,
    autoplayTimeout:2500,
    nav:true,
    navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    dots:false,
    autoplay:true,
    slideBy:1,
    responsiveClass:true,
    responsive:{
      0:{
        items:3,
        nav:false,
      },
      600:{
        items:5,
      },
      1000:{
        items:7,

      }
    }
  });

  $(document).on('click', '.owl-item>div', function() {
    $owl.trigger('to.owl.carousel', $(this).data( 'position' ) );
  });


$('.testimonial-slider').owlCarousel({
    loop:true,
    margin:0,
    dots:false,
    responsiveClass:true,
    autoplay:true,
    autoplayHoverPause:true,
    autoplayTimeout:8000,
    autoplaySpeed:2000,
    nav:true,
    navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    responsive:{
        0:{
            items:1,
        },
        600:{
            items:1,
        },
        1000:{
            items:1,
        }
    }
});


  $("#request_demo").on('click',function(){
    $("#demo_modal").modal("show");
  });

    $('#demo_request_sub').on('click',function() {

    $('#demo_message').html('');

    var name = $('#name_demo').val();
    var mobile = $('#mobile_demo').val();
    var email = $('#email_demo').val();
    var language_learn = $('input[name=language_learn_demo]:checked').val();
    var country_demo = $('#country_demo').val();
    var city_demo = $('#city_demo').val();
    var email = $('#email_demo').val();

    var EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    var phonePattern = /^[0-9]*$/;


    var flag = 0;

    if(name == '' || name==null)
    {
      $('#name_error').html('Name field is required');
      flag++;
    }
    else
    {
      $('#name_error').html('');
    }

    if(mobile == '' || mobile==null || !phonePattern.test(mobile))
    {
      $('#mobile_error').html('Invalid Mobile Number');
      flag++;
    }
    else
    {
      $('#mobile_error').html('');
    }

    if(email == '' || email==null || !EmailPattern.test(email))
    {
      $('#email_error').html('Invalid Email id');
      flag++;
    }
    else
    {
      $('#email_error').html('');
    }

    if(language_learn == '' || language_learn==null)
    {
      $('#language_learn_error').html('Select prefered language');
      flag++;
    }
    else
    {
      $('#language_learn_error').html('');
    }

    if(country_demo == '' || country_demo==null)
    {
      $('#country_demo_error').html('Country field is required');
      flag++;
    }
    else
    {
      $('#country_demo_error').html('');
    }

    if(city_demo == '' || city_demo==null)
    {
      $('#city_demo_error').html('City field is required');
      flag++;
    }
    else
    {
      $('#city_demo_error').html('');
    }



    if(flag == 0)
    {
      $('#demo_message').html('Please wait');
      $(this).attr('disabled',true);
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

      var form_data = {
        name,mobile,email,language_learn,country_id:country_demo,city_id:city_demo
      };

      $.ajax({
        type:'post',
        url:'/request-demo',
        data:form_data,
        success:function(data){
          if(data!=0||data!=null)
          {
            $('#demo_frm').trigger('reset');
            $('.frm-fields').hide();
            $('#demo_message').html('<div class="alert alert-success"><h5><i class="fa fa-check-circle"></i> Thank you for your request. Someone from iNSTRUCKO will call you in the next 24 hours</h5></div>');
          }
          else
          {
            $('#demo_message').html('<div class="alert alert-danger"><h5><i class="fa fa-check-circle"></i> Something went wrong!</h5></div>');
          }
        }
      });
    }
  });

  $('#country_demo').on('change',function() {
    var country_id = $(this).val();

    if(country_id!='')
    {
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

      $.ajax({
        type:'post',
        url:'/get-cities',
        data:{country_id},
        success:function(data){
          if(data!=0||data!=null)
          {
            $('#city_demo').find('option').remove().end().append('<option value="">--Select City--</option>').append(data);
          }
        }
      });
    }
    else
    {
      $('#city_demo').find('option').remove().end().append('<option value="">--Select City--</option>');
    }
  });

  $('#country').on('change',function() {
    var country_id = $(this).val();

    if(country_id!='')
    {
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

      $.ajax({
        type:'post',
        url:'/get-cities',
        data:{country_id},
        success:function(data){
          if(data!=0||data!=null)
          {
            $('#city').find('option').remove().end().append('<option value="">--Select City--</option>').append(data);
          }
        }
      });
    }
    else
    {
      $('#city').find('option').remove().end().append('<option value="">--Select City--</option>');
    }
  });


  $('#apply_coupon').on('click',function() {
    var coupon_code = $("#coupon_code").val();

    if(coupon_code!='')
    {
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

      $.ajax({
        type:'post',
        url:'/apply-coupon',
        data:{coupon_code},
        success:function(data){
          if(data!=null)
          {
            if(data == 0)
            {
              $("#coupon_code").val('');
              alert('Invalid coupon code');
            }
            else if (data == 2)
            {
              $("#coupon_code").val('');
              alert('Invalid coupon code');
            }
            else if (data == 1)
            {
              location.reload();
            }
            else
            {
              alert('Invalid coupon code');
            }
          }
        }
      });
    }
  });

  $('#remove_coupon').on('click',function() {


      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

      $.ajax({
        type:'post',
        url:'/remove-coupon',
        data:{},
        success:function(data){
          if(data!=null)
          { if (data == 1)
            {
              location.reload();
            }
            else
            {
              alert('Something went wrong');
            }
          }
        }
      });
  });


  $('#apply_referral').on('click',function() {
    var referral_code = $("#referral_code").val();

    if(referral_code!='')
    {
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

      $.ajax({
        type:'post',
        url:'/apply-referral',
        data:{referral_code},
        success:function(data){
          if(data!=null)
          {
            if (data == 1)
            {
              location.reload();
            }
            else
            {
              $("#coupon_code").val('');
              alert('Invalid Referral Code');
            }
          }
        }
      });
    }
  });

  $('#remove_referral').on('click',function() {

      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

      $.ajax({
        type:'post',
        url:'/remove-referral',
        data:{},
        success:function(data){
          if(data!=null)
          { if (data == 1)
            {
              location.reload();
            }
            else
            {
              alert('Something went wrong');
            }
          }
        }
      });
  });


  $('.call-btn').click(function(){
    $('.popup-contact').slideToggle();
  });
  $('.close-contact-popup').click(function(){
    $('.popup-contact').hide();
  });

// call btn fixed at top of footer
  var footTop = $('.footer').offset().top;
  $(window).scroll(function(evt) {
      var y = $(this).scrollTop();
      if (y > (footTop - 900) ){
           $('.call-btn').css({position: 'absolute',top: '-50px'});
           $('.popup-contact').css({position: 'absolute',bottom:'104%'});
           $('.back-to-topbtn').css({position: 'absolute',top: '-50px'});
      }
      else{
         $('.call-btn').css({position: 'fixed',top: 'initial'});
         $('.popup-contact').css({position: 'fixed',top: 'initial',bottom:'10%'});
         $('.back-to-topbtn').css({position: 'fixed',top: 'initial'});
      }
  });
  // call btn fixed at top of footer end


  var btn = $('.back-to-topbtn')
  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
  });



  $(document).on('click', '.main-menu a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - 60
    }, 500);
  });

  $('.select-search').select2();


// faq accordian
  $(".toggle-faq.terms").on("click", function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this)
        .siblings(".faq-answer")
        .slideUp(400);
      $(".toggle-faq  i")
        .removeClass("fa-chevron-up")
        .addClass("fa-chevron-down");
    } else {
      $(".toggle-faq  i")
        .removeClass("fa-chevron-up")
        .addClass("fa-chevron-down");
      $(this)
        .find("i")
        .removeClass("fa-chevron-down")
        .addClass("fa-chevron-up");
      $(".toggle-faq").removeClass("active");
      $(this).addClass("active");
      $(".faq-answer").slideUp(400);
      $(this)
        .siblings(".faq-answer")
        .slideDown(400);
    }
  });

});
