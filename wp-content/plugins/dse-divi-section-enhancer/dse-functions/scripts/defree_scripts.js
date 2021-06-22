
function divi_sections_enhancer_scripts_free(){


  function divi_se_scrollbar(){

    jQuery(function($){
      $(window).on("load",function(){

        jQuery('.divi_se_scrollbar').each(function(){
          var $this = $(this);
          if($(this).hasClass('dse_module')){
            $this = $(this).parents('.et_pb_section');
          }

          var $scrollbarheight = jQuery(this).attr('data-scrollbarheight');
          var $scrollbarwidth = jQuery(this).attr('data-scrollbarwidth');
          var $scrollbaraxis = jQuery(this).attr('data-scrollbaraxis');
          var $scrollbarstyle = jQuery(this).attr('data-scrollbarstyle');
          var $scrollbarautohide = jQuery(this).attr('data-scrollbarautohide');
          var $scrollbarposition = jQuery(this).attr('data-scrollbarposition');

          var $hide = ($scrollbarautohide == "true");


          $this.mCustomScrollbar({
            setHeight: $scrollbarheight,
            setWidth: $scrollbarwidth,
            axis: $scrollbaraxis,
            theme: $scrollbarstyle,
            autoHideScrollbar: $hide,
            scrollbarPosition: $scrollbarposition
          });

        });


      });
    });

  }




  function divi_se_youtube_background(){

    jQuery(function($){

      setTimeout(function(){
        var $diviSelector = $(".divi_se_youtubebg");
        if($("iframe#et-fb-app-frame").length != 0){
      		var $diviIframe = $("iframe#et-fb-app-frame").contents();
      		$diviSelector = $diviIframe.find(".divi_se_youtubebg");
      	}



        $diviSelector.each(function(){
          var $this = jQuery(this);
          if($(this).hasClass('dse_module')){
            $this = $(this).parents('.et_pb_section');
            $this.addClass('divi_se_youtubebg_parent');
          }
          var $youtubebgid = jQuery(this).attr('data-youtubebgid');
          var $youtubebgmute = (jQuery(this).attr('data-youtubebgmute') == "true");
          var $youtubebgratio = jQuery(this).attr('data-youtubebgratio');
          var $youtubebgrepeat = (jQuery(this).attr('data-youtubebgrepeat') == "true");
          var $youtubebgparallax = jQuery(this).attr('data-youtubebgparallax');
          var $youtubebghidetop = jQuery(this).attr('data-youtubebghidetop');
          $youtubebghidetop = $youtubebghidetop.replace('-', '');
          $youtubebghidetop = $youtubebghidetop.replace('px', '');
          var $youtubebgstart = jQuery(this).attr('data-youtubebgstart');
          var $youtubebgstop = jQuery(this).attr('data-youtubebgstop');
          var $youtubebgwidth = jQuery(this).attr('data-youtubebgwidth');
          var $youtubebgheight = jQuery(this).attr('data-youtubebgheight');

          var $sectionInitialHeight = $this.outerHeight();
          var $sectionwidth = $this.outerWidth();

          var $windowwidth = $(window).width();
          var $videowidth = $windowwidth;
          if($youtubebgwidth == 'section'){
            $videowidth = $sectionwidth;
          }
          var sectionheight = $this.outerHeight();
          var factor = $youtubebgheight;
          var sectionproportion = (sectionheight/$windowwidth);
          if(sectionproportion < 1){
            sectionproportion = 1;
          }
          if($windowwidth <= 768){
            sectionproportion = 1;
          }

          var multiplier = sectionproportion*factor;
          multiplier = multiplier.toFixed(2);
          $this.attr('data-multiplier', multiplier);

          $videowidth = $videowidth*multiplier;



          if($this.find('.divi_se_youtube_background_container').length == 0){
             $this.prepend('<div class="divi_se_youtube_background_container"></div>');
          }

          if($this.find('.divi_se_youtube_background_video').length == 0) {
            $this.find('.divi_se_youtube_background_container').prepend('<div class="divi_se_youtube_background_video" style="margin-top:-'+$youtubebghidetop+'px;"></div>');
          }


          if($this.find('.divi_se_youtube_black').length == 0){
            $this.find('.divi_se_youtube_background_container').append('<div class="divi_se_youtube_black"></div>');
          }



          if($windowwidth <= 768 && $youtubebgwidth == 'window'){
            $videowidth = ($videowidth*4);
            $sectionwidth = ($sectionwidth*4);

          }
          $this.find('.divi_se_youtube_background_video').css({position: 'absolute', top: 0, width: $videowidth });
          $this.find('.divi_se_youtube_background_video').css({left:-($videowidth/2 - $sectionwidth/2) });


          $this.find('.divi_se_youtube_background_container').css({width: $videowidth, height: $sectionInitialHeight});



          if($youtubebgparallax == 'yes' || $youtubebgparallax == 'mobile' && $windowwidth <= 768){
            jQuery(window).scroll(function() {
              var scroll = jQuery(window).scrollTop();
              var windowheight = jQuery(window).outerHeight();
              var sectionoffset = $this.offset();
              var sectionheight = $this.outerHeight();


              if((sectionoffset.top <= scroll && sectionoffset.top+sectionheight) > scroll){
                $this.find('.divi_se_youtube_background_container').attr('data-top', scroll);
                $this.attr('data-multiplier', multiplier);
                if($sectionwidth*multiplier >= $videowidth && $youtubebgwidth == 'window'){
                  $this.attr('data-sw', $sectionwidth*multiplier);
                  $this.attr('data-vw', $videowidth);
                  $this.find('.divi_se_youtube_background_container').css({top: 0, position: 'fixed'});
                }
                else{
                  $this.find('.divi_se_youtube_background_container').css({top: scroll-sectionoffset.top});
                }

              }
              else {
                $this.find('.divi_se_youtube_background_container').css({position: 'absolute', top: 0});
              }

            });
          }


          if($this.find('.divi_se_youtube_background_video').length != 0){


            $this.find('.divi_se_youtube_background_video').YTPlayer({
            ratio: eval($youtubebgratio),
            videoId: $youtubebgid,
            mute: $youtubebgmute,
            repeat: $youtubebgrepeat,
            width: $videowidth,
            playButtonClass: 'YTPlayer-play',
            pauseButtonClass: 'YTPlayer-pause',
            muteButtonClass: 'YTPlayer-mute',
            volumeUpClass: 'YTPlayer-volume-up',
            volumeDownClass: 'YTPlayer-volume-down',
            start: $youtubebgstart,
            pauseOnScroll: false,
            fitToBackground: false,
            playerVars: {
              iv_load_policy: 3,
              modestbranding: 1,
              autoplay: 1,
              controls: 0,
              showinfo: 0,
              wmode: 'opaque',
              branding: 0,
              autohide: 0,
              rel: 0,
              start: $youtubebgstart,
              end: $youtubebgstop,
            },
            callback: function() {

                var player = $this.find('.divi_se_youtube_background_video').data('ytPlayer').player;
                var $iframe = player.getIframe();
                var $blackheight = (2 + parseInt($iframe.height) - parseInt($youtubebghidetop));


                $this.find('.divi_se_youtube_black').after('<div class="divi_se_youtube_background_overlay"></div>');


                $this.find('.divi_se_youtube_black').css({background: '#000000', height: $blackheight});

                player.addEventListener('onStateChange', function(data){
                  if(YT.PlayerState.PLAYING){
                    setTimeout(function(){
                      $this.find('.divi_se_youtube_black').stop().animate({opacity: 0}, 1000);
                      $this.addClass('divi_se_youtube_bg');
                    }, 500);
                  }
                  if(YT.PlayerState.ENDED || YT.PlayerState.PAUSED){
                    if($this.hasClass('divi_se_youtube_bg')){
                      $this.find('.divi_se_youtube_black').css({opacity: 1});
                      $this.removeClass('divi_se_youtube_bg');
                    }
                  }
                });

            }

          });



          }

        });

      }, 500);







    });


  }





  function divi_dse_tilt_effect(){

    jQuery(function($){


      $('.divi_se_tilteffect').on('mouseenter', function(){
        $(this).parents('body').addClass('dse_overflow');
      });
      $('.divi_se_tilteffect').on('mouseleave', function(){
        $thiselem = $(this);
        setTimeout(function(){
          $thiselem.parents('body').removeClass('dse_overflow');
        }, 200);

      });

      $('.divi_se_tilteffect').each(function(){
        var $tilteffectapplyto = $(this).attr('data-tilteffectapplyto');
        var $tilteffectparallax = $(this).attr('data-tilteffectparallax');
        var $tilteffectperspective = $(this).attr('data-tilteffectperspective');
        var $tilteffectscale = $(this).attr('data-tilteffectscale');
        var $this = $(this);

        if($(this).hasClass('dse_module')){
          $this = $(this).parents('.et_pb_section');
          $this.addClass('divi_se_tilteffect_parent');
        }
        else {

        }

        if($tilteffectapplyto == 'modules') {
          $this.find('.et_pb_module').tilt({
            perspective: parseInt($tilteffectperspective),
            scale: parseInt($tilteffectscale),
          })
        }

        if($tilteffectapplyto == 'section'){
          if($tilteffectparallax == 'yes'){
            $this.addClass('divi_se_tilt_parallax');
          }
          $this.tilt({
            perspective: parseInt($tilteffectperspective),
            scale: parseInt($tilteffectscale),
          });
        }


      });



    });


  }


  function divi_dse_offcanvas(){

    jQuery(function($){
       var $selector = $('.divi_se_offcanvas').first();
       if($selector.hasClass('dse_module')){
         $selector = $('.divi_se_offcanvas').first().parents('.et_pb_section');
       }

      var $offcanvaswidth = $('.divi_se_offcanvas').first().attr('data-offcanvaswidth');
      var $offcanvasstyle = $('.divi_se_offcanvas').first().attr('data-offcanvasstyle');
      var $offcanvasopenicon = $('.divi_se_offcanvas').first().attr('data-offcanvasopenicon');
      var $offcanvasiconsize = $('.divi_se_offcanvas').first().attr('data-offcanvasiconsize');
      var $offcanvasclosedicon = $('.divi_se_offcanvas').first().attr('data-offcanvasclosedicon');
      var $offcanvasiconbackground = $('.divi_se_offcanvas').first().attr('data-offcanvasiconbackground');
      var $offcanvasiconcolor = $('.divi_se_offcanvas').first().attr('data-offcanvasiconcolor');
      var $offcanvastop = $('.divi_se_offcanvas').first().attr('data-offcanvastop');
      var $offcanvasleft = $('.divi_se_offcanvas').first().attr('data-offcanvasleft');
      var $offcanvasbuttontext = $('.divi_se_offcanvas').first().attr('data-offcanvasbuttontext');
      var $offcanvasheight = $('.divi_se_offcanvas').first().attr('data-offcanvasheight');
      var $offcanvasinsideposition = $('.divi_se_offcanvas').first().attr('data-offcanvasinsideposition');


       if($selector.length > 0){
        $selector.offCanvas({
          width : $offcanvaswidth,
          scroll : $offcanvasstyle,
          openicon : $offcanvasopenicon,
          closedicon : $offcanvasclosedicon,
          iconsize : $offcanvasiconsize,
          iconcolor : $offcanvasiconcolor,
          iconbackground : $offcanvasiconbackground,
          positiony : $offcanvastop,
          positionx : $offcanvasleft,
          buttontext : $offcanvasbuttontext,
          height : $offcanvasheight,
          insideposition : $offcanvasinsideposition,
        });
       }
    

    });




  }



  function divi_se_particles_background(){

    jQuery(function($){

      jQuery(window).on("load",function(){
        jQuery('.divi_se_particles_bg').each(function(){
          var $this = $(this);
          if($(this).hasClass('dse_module')){
            $this = $(this).parents('.et_pb_section');
            $this.addClass('divi_se_particles_bg_parent');
          }
          var $particlesdotscolor = jQuery(this).attr('data-particlesdotscolor');
          var $particleslinescolor = jQuery(this).attr('data-particleslinescolor');
          var $particlesdirectionx = jQuery(this).attr('data-particlesdirectionx');
          var $particlesdirectiony = jQuery(this).attr('data-particlesdirectiony');
          var $particlesdensity = jQuery(this).attr('data-particlesdensity');
          var $particlesradius = jQuery(this).attr('data-particlesradius');
          var $particleslinewidth = jQuery(this).attr('data-particleslinewidth');
          var $particlesparallax = jQuery(this).attr('data-particlesparallax');



          $this.particleground({
              dotColor: $particlesdotscolor,
              lineColor: $particleslinescolor,
              directionX: $particlesdirectionx,
              directionY: $particlesdirectiony,
              density: $particlesdensity,
              particleRadius: $particlesradius,
              lineWidth: $particleslinewidth,
              parallax: $particlesparallax,
          });

        });
      });

    })

  }

  return {
 
    divi_se_scrollbar: divi_se_scrollbar,
    divi_se_particles_background: divi_se_particles_background,
    divi_dse_offcanvas: divi_dse_offcanvas,
    divi_dse_tilt_effect: divi_dse_tilt_effect,
    divi_se_youtube_background: divi_se_youtube_background,
  };

}



//BUILDER
jQuery(function($) {

    jQuery(document).on('mouseenter', function(){
      if(jQuery("#et-fb-app").length != 0) {



      }
    });

});

//FRONT
jQuery(document).ready(function(){


  if(jQuery("#et-fb-app").length == 0) {

    divi_sections_enhancer_scripts_free().divi_se_particles_background();
    divi_sections_enhancer_scripts_free().divi_dse_offcanvas();
    divi_sections_enhancer_scripts_free().divi_dse_tilt_effect();
    divi_sections_enhancer_scripts_free().divi_se_youtube_background();
    divi_sections_enhancer_scripts_free().divi_se_scrollbar();
  }

})
