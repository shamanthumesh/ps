require.config({
    baseUrl : "./js",
    paths : {
        "libs/jQuery" : "libs/jquery.min",
        "canvas" : "canvas"
    }
});

require(['libs/jQuery','canvas'], function(){
   var Slides = {
      container : $('#slides'),

      totalSlides : '',

      translateAmount : 0,

      currentSlide : 0,

      slideWidth : '',

      init : function(totalSlides) {
         if ( !totalSlides ) throw new Error('Please pass the total number of slides.');
         Slides.totalSlides = totalSlides;

         Slides.loadContent();
         Slides.setSlideWidth();
         Slides.keyPress();

         // If the page loads, and a slide is specified in the hash,
         // go directly to that hash.
         if ( /#slide-\d{1,3}/i.test( location.hash ) ) {
            Slides.currentSlide = location.hash.split('-')[1];
            Slides.goto( Slides.currentSlide );
         }
      },

      loadContent : function() {
         Slides.container.hide();
         for ( var i = 0; i < Slides.totalSlides; i++ ) {
            $('<div id="#slide-' + i + '"></div>')
               .load('slides/' + i + '.html')
               .appendTo(Slides.container);
            }
         Slides.container.show();
      },

      keyPress : function() {
         $(document.body).keydown(function(e) {
            // if left or right arrow key is pressed
            if ( e.keyCode === 39 || e.keyCode === 37 ) {
               e.preventDefault();
               ( e.keyCode === 39 ) ? Slides.nextslide() : Slides.prevslide();
            }
         });
      },

      setSlideWidth : function() {
         var each = Slides.container.children( 'div' );
         Slides.slideWidth = each.width() + ~~( each.css('margin-right').split('px')[0] );
      },

      nextslide : function( ) {
            if(Slides.currentSlide < Slides.totalSlides -1 ){      
            Slides.translateAmount -= Slides.slideWidth;
            Slides.updateHash( ++Slides.currentSlide );
            Slides.animate();
            Slides.updateInfo();
         }      
      },

     prevslide : function() {
        // No more left to go back.
         if ( Slides.translateAmount === 0 ) return;
         Slides.translateAmount += Slides.slideWidth;
         Slides.updateHash( --Slides.currentSlide );
         Slides.animate();
         Slides.updateInfo();
      },

      updateInfo : function(){
         var num = this.currentSlide + "/" + this.totalSlides;
         var slideNum = parseInt(this.currentSlide) + 1;
         var CurrenPageId = document.getElementById("CurrenPageId");
         CurrenPageId.innerHTML = " Slide "  + slideNum + " of " + this.totalSlides;
      },

      goto : function(slide) {
         Slides.translateAmount = -Slides.slideWidth * slide; 
         Slides.container.animate({
            left : Slides.translateAmount
         }, 1000);

         Slides.animate();
     },

     animate : function() {
        Slides
         .container
         .children()
            .css( { '-webkit-transform' : 'translateX(' + Slides.translateAmount + 'px)', '-moz-transform' : 'translateX(' + Slides.translateAmount + 'px)', 'transform' : 'translateX(' + Slides.translateAmount + 'px)'});
     },

     updateHash : function( direction ) {
        // Update current Slides and hash.
         location.hash = '#slide-' + Slides.currentSlide;
     }

   };

   // All right; let's do this. 
   Slides.init(6);

});
