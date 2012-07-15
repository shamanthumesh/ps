(function($){
		    //get canvas and context
		    var editor = document.getElementById("editor"),
		        context = editor.getContext("2d"),
		        //create/load image
		        image = $("<img/>", {
		            src: "img/Justin_Bieber.jpg",
		            load: function() {
		                context.drawImage(this, 0, 0);
		            }
		    }),
				tools = {
					rotate: function(conf) {
				    //save current image before rotating
				    $("<img/>", {
				        src: editor.toDataURL(),
				        load: function() {
				            //rotate canvas
				            context.clearRect(0, 0, editor.width, editor.height);
				            context.translate(conf.x, conf.y);
				            context.rotate(conf.r);
				            //redraw saved image
				            context.drawImage(this, 0, 0);
				        }
				    });
				},
				rotateL: function() {
				    var conf = {
				        x: 0,
				        y: editor.height,
				        r: -90 * Math.PI / 180
				    };
				    tools.rotate(conf);
				},
				rotateR: function() {
				    var conf = {
				        x: editor.width,
				        y: 0,
				        r: 90 * Math.PI / 180
				    };
				    tools.rotate(conf);
				},
				greyscale: function() {
				    //get image data
				    var imgData = context.getImageData(0, 0, editor.width, editor.height),
				        pxData = imgData.data,
				        length = pxData.length;
				    for(var x = 0; x < length; x+=4) {
				        //convert to grayscale
				        var r = pxData[x],
				            g = pxData[x + 1],
				            b = pxData[x + 2],
				            grey = r * .3 + g * .59 + b * .11;
				        pxData[x] = grey;
				        pxData[x + 1] = grey;
				        pxData[x + 2] = grey;
				    }
				    //paint grayscale image back
				    context.putImageData(imgData, 0, 0);
				}

				};
				$("#toolbar").children().click(function(e) {
				    e.preventDefault();
				    //call the relevant function
				    tools[this.id].call(this);
				});
		    //more code to follow here...
		})(jQuery);