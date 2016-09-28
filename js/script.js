$(document).ready(function () {
	
	/**********************************************************************/
	/************************* GLOBAL VARIABLES *************************/
	/*********************************************************************/
	
	var images = [];
	var cont = 1;
	var slide = $(".slide");
	var fade_time = 300;
	var delay = 1500;
	var loop_time = fade_time * 2 + 30 + delay;
	var running = true;
	var intervalSlideshow;
	
	
	
	/**********************************************************************/
	/***************************** FUNCTIONS ****************************/
	/*********************************************************************/
		
	/* BUILDING AN ARRAY WITH ALL THE IMAGES */
	$.ajax({
		url: "img",
		success: function (data) {
			$(data).find("a:contains(.jpg)").each(function () {				
				images.push($(this).attr("href"));
				slide.css("background-image", "url('img/"+images[0]+"')");
			});
		}
	});	
	

	/* SWAPS IMAGES FROM THE ARRAY IN A LOOP */	
	function imageSwap(){
		slide.fadeOut(fade_time);
		
		setTimeout(function(){
			slide.css("background-image", "url('img/"+images[cont]+"')");
			console.log(images[cont]);
		}, fade_time + 10);
		
		setTimeout(function(){
			slide.fadeIn(fade_time);
			cont++;
		}, fade_time + 20);	
		
		if(cont == images.length){
			cont = 0;
		}
	}
	
	
	/* RUNS THE SLIDESHOW */
	function runSlideshow(){
		loop_time = fade_time * 2 + 30 + delay;
		intervalSlideshow = setInterval(imageSwap, loop_time);
		running = true;
	}runSlideshow();
	
	
	/* PAUSES THE SLIDESHOW */
	function pauseSlideshow(){
		clearInterval(intervalSlideshow);
		running = false;
	}
	
	
	
	/**********************************************************************/
	/******************************* EVENTS ******************************/
	/*********************************************************************/
	
	/* RESUMES OR PAUSES THE SLIDESHOW */
	$("#btn-play, .slide").on("click", function(){
		$("#btn-play").toggleClass("pause");
		
		if(running){
			pauseSlideshow(intervalSlideshow);
		}else{			
			runSlideshow();
		}
	});
	
	
	/* CHANGES THE SPEED OF THE SLIDESHOW */
	$("#sel-speed").on("change", function(){		

		switch($("#sel-speed option:selected").val()){
			case '0': delay = 5000; // Slow speed
				   break;
			   
			case '1': delay = 1500; // Normal speed
				   break;
			   
			case '2': delay = 500; // Fast speed
				   break;
		}
		
		pauseSlideshow();
		runSlideshow();
	});
	
	
	/* CHANGES THE FADE TIME OF THE SLIDESHOW */
	$("#sel-fade").on("change", function(){		

		switch($("#sel-fade option:selected").val()){
			case '0': fade_time = 1000; // Slow speed
				   break;
			   
			case '1': fade_time = 300; // Normal speed
				   break;
			   
			case '2': fade_time = 150; // Fast speed
				   break;
		}
		
		pauseSlideshow();
		runSlideshow();
	});

});

