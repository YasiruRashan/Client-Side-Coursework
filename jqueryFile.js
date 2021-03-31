$(function() {        /* function of the selectMenu for selecting the type of the property. */
	  $("#property").selectmenu();
});

$(function() {          /* function of the spinner for selecting the minimum no of beds. */
	$("#minimum").spinner({
		min: 0,
		max: 4,   /* Maximum value for the minimum no of beds is 4 */
		spin: function(event, ui) {
			$(this).change();
		}
	});
});

$(function() {       /* function of the spinner for selecting the maximum no of beds. */
	$("#maximum").spinner({
		min: 0,
		max: 7,   /* Maximum value for the maximum no of beds is 7 */
		spin: function(event, ui) {
			$(this).change();
		}
	});
});

$(function() {          /* function of the selectMenu for selecting the range of date. */
	  $("#date").selectmenu();
});


$(function() {        /* function of the slider  for selecting the price range. */
	$("#price").slider({
		range:true,
		min: 211000,
		max: 950000,
		values: [ 55, 250 ],
		slide: function( event, ui ){
			$("#quantity").val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );
		}
	});
	
	$("#quantity").val(" £" + $(" #price").slider( "values", 0 ) + " - £" + $("#price").slider( "values", 1 ) );
});


$(function() {    /* function for the search button to get the relevant results*/
	
	$( "#Search" ).on("click", function(){
		
		var propType = $("#property").val();
	    var maxBed =  $("#minimum").val();
        var minBed =  $("#maximum").val();
		var date =  $("#date").val();
		var minPrice = $("#price").slider("option", "values")[0];
		var maxPrice = $("#price").slider("option", "values")[1];

		
		var output="<ul>";
		   for (var i in data.properties) {
			   if (( propType == data.properties[i].type) || (propType=="Any"))
			   if (( minBed >= data.properties[i].bedrooms && maxBed <= data.properties[i].bedrooms ))
			   if (( date == data.properties[i].added.month) || (date=="AnyDate"))
			   if (( data.properties[i].price >= minPrice && data.properties[i].price <= maxPrice ))
			   {
				   {
					   {
						   {
							output+= "<br>" +"<h2><li>"  + data.properties[i].location +"</li></h2>" +"<img src=" + data.properties[i].picture + ">" +
							"<p>" + data.properties[i].description +"</p>"+"<b>"+"Price : " + "<b>" +"$" + data.properties[i].price + "</b>" +"<br>"+
							 "<button><a href='" + data.properties[i].url + "'>More info</a></button>";
						} } } } }
			 output+="</ul>";
			 document.getElementById( "session1" ).innerHTML = output;
		   });
	});

	/* creating add property function in the property page */
	
	$(function() {
		$( ".add" ).on("click", function(){
			
			try {
				$(this).attr('disabled', true);
				
				var addedPropId = $(this).closest("p").attr("id");
				
				var favProperty =JSON.parse(localStorage.getItem("favourites"));
				
				if( favProperty == null) {
					favProperty = [];
				}
				
				if(favProperty != null) {          /* this condition checks that if the user had selected the same property twice */
					for ( var i = 0; i < favProperty.length; i++) {
						
						if ( addedPropId == favProperty[i]) {
							
							alert("ERROR: You have already selected this property"); 
							favProperty = [];
						}
					}
				}
				
				favProperty.push(addedPropId);     /*Creating a local storage to store the added properties.*/
				
				localStorage.setItem("favourites", JSON.stringify(favProperty));
				
			}
			
			catch (e) {           /*check whether the local storage is full or not */
				if (e==QUOTA_EXCEEDED_ERR) {
					console.log("Error: Local storage is full");
				}
				
				else {
					console.log("ERROR: Saving to local storge.");
				}
			}
		});
	});
	
	/* Creating remove property function in the property page.*/
		
	$(function() {
		$( ".remove" ).on("click", function(){
			
				$(this).attr('disabled', true);
				
				var removedPropId = $(this).closest("p").attr("id");
				
				 favProperty =JSON.parse(localStorage.getItem("favourites"));
				
				
				if( favProperty != null) {  
					for ( var k = 0; k < favProperty.length; k++) {
						
						if ( removedPropId == favProperty[k]) {
							
							alert("This Property is removed from the favourite list succesfully.");
							
							delete favProperty[k];
							
							localStorage.setItem("favourites", JSON.stringify(favProperty));
							
							favProperty[k] = [];
						}
					}
				}
				
				if(favProperty == null) {   /*This condition checks that if the user not selected any property*/
					alert("You didn't select any  property to the favourite list.");
				}
			});
		});
		
	/* Creating view property function in the search page.*/
			
		
	$(function() {
		$( ".view" ).on("click", function(){
			
			console.log("Restoring  data from the local storage.....");
			
			favProperty=JSON.parse(localStorage.getItem("favourites"));
			
			var output = "<ol>";
			
			if (favProperty != null) {
				
				for (var i = 0; i < data.properties.length; i++) {
					for (j = 0; j < favProperty.length; j++) {
						
						if (data.properties[i].id == favProperty[j]) {
							
							output+= "<br>" + "<h4><li>" + data.properties[i].location  + "<br>" +"Property Type: "+ data.properties[i].type + "<br>" + "<b>"+"Price : " + "<b>" +"$" + data.properties[i].price + "</li></h4>"+ "<img src=" + data.properties[i].picture + ">"+   
							 "</b>" + "<br>" + "<button><a href=' " + data.properties[i].url + "'>Go to the Page</a></button>";
						}
					}
				}
			}
			output+="</ol>";
			
			document.getElementById( "session2" ).innerHTML = output;
		
		});
	});
	
	/* Creating clear property function in the search page.*/
	
	$(function() {
		$( ".clear" ).on("click", function(){
			
			$("#session2").remove();
			
			favProperty=JSON.parse(localStorage.getItem("favourites"));
			
			localStorage.clear();
			
		});
		
	});		
					
	
	
	
	
	
	
	
	
							
							
									
				
									
	
							