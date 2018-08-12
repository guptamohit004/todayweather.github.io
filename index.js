$(document).ready(function (){
	$('.short1').hide();
	if(navigator.geolocation){
		var current='';
		navigator.geolocation.getCurrentPosition(function(position){
		current=position;
		var lat = current.coords.latitude;
		var lon = current.coords.longitude;
		console.log(lon);
		console.log(lat);
		var url2 =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}`;
		var url  =`https://cors.io/?https://api.darksky.net/forecast/2d7db486a356aa820a0880225993be7f/${lat},${lon}`;
		$.getJSON(url,function(data){
			var data = JSON.stringify(data);
			var json = JSON.parse(data);
			var uv = json.currently.uvIndex;
			var summary= json.currently.summary;
			var tempf= json.currently.temperature;
			const nu = (5/9) * (tempf-32);
			const tempc = nu.toPrecision(4);
			var humid = json.currently.humidity;
			var icon =json.currently.icon;
			console.log(tempc);
				$('.short1').show();
			$('#info2').html('UvIndex :' + uv);
			$('#info3').html(tempc + '&#8451');
			var yes =true;
			$('#switch').on('click',function(){
				if(yes){
					$('#info3').html(tempf + '&#8457');
					$('#switch').html('Show in Celcius');
					yes=false;
				}
				else{
					$('#info3').html(tempc + '&#8451');
					$('#switch').html('Show in Farehinet');
					yes=true;
				}
			});
			$('#info5').html(summary);
			$('#info6').html('Humidity :' + humid*100);
		});
		$.getJSON(url2,function(data){
			var data = JSON.stringify(data);
			var json = JSON.parse(data);
			var Address = json.results[0].formatted_address;
			console.log(Address);
			var dt = new Date();
			var time = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
			console.log(time);
			$('#weather').html(Address);
			$('#info1').html(time);
		});
	});
	}
});
