		var key;
$(document).ready(function (){
	$('.short1').hide();
	if(navigator.geolocation){
		var current='';
		navigator.geolocation.getCurrentPosition(function(position){
		current=position;
		var lat = current.coords.latitude;
		var lon = current.coords.longitude;
		console.log(lat);
		console.log(lon);
		var url2 =`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search.json?q=${lat},${lon}&apikey=hGgL7KDJ3gXtoTeb5i2EeBKWVQGny6ah`;
		$.getJSON(url2,function(data){
			var data = JSON.stringify(data);
			var json = JSON.parse(data);
			key = json.Key;
			console.log(key);
			var Address = `${json.LocalizedName},${json.AdministrativeArea.LocalizedName},${json.Country.LocalizedName}`;
			var newDate = new Date(Date.now());
    		var datee = `${newDate.toDateString()} ${newDate.toTimeString()}`;
    		console.log(datee);
    		$('#weather').html(Address);
			$('#time').html(datee);
		var url  =`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=hGgL7KDJ3gXtoTeb5i2EeBKWVQGny6ah&language=en&details=true`;
		$.getJSON(url,function(data){
			var data = JSON.stringify(data);
			var json = JSON.parse(data);
			var summary = json[0].WeatherText;
			var TempC = json[0].Temperature.Metric.Value;
			var TempF = json[0].Temperature.Imperial.Value;
			if(json[0].isDayTime)
				var Day = "Day";
			else
				var Day = "Night";
			var wind=`${json[0].Wind.Direction.Degrees} in ${json[0].Wind.Direction.Localized} `;
			var uv = json[0].UVIndex;
			var Pressure = `${json[0].Pressure.Metric.Value} ${json[0].Pressure.Metric.Unit} `
			var Cloud = json[0].CloudCover;
			var Visibilty=`${json[0].Visibility.Metric.Value} ${json[0].Visibility.Metric.Unit}`; 
			var WindS =`${json[0].Wind.Speed.Metric.Value}  ${json[0].Wind.Speed.Metric.Unit} `;
			$('.short1').show();
			$('#info1').html(Day);
			$('#info2').html('UvIndex :' + uv);
			$('#info3').html(TempC + '&#8451');
			var yes =true;
			$('#switch').on('click',function(){
				if(yes){
					$('#info3').html(TempF + '&#8457');
					$('#switch').html('Show in Celcius');
					yes=false;
				}
				else{
					$('#info3').html(TempC + '&#8451');
					$('#switch').html('Show in Farehinet');
					yes=true;
				}
			});
			$('#info5').html(summary);
			$('#info6').html('Pressure: ' + Pressure);
			$('#info7').html('Wind Direction: ' + wind);			
			$('#9').html('Cloud Cover: ' + Cloud);
			$('#10').html('Visibility:  ' + Visibilty);
			$('#info8').html('Wind Speed: ' + WindS);
		});
	});
	});
	}
});
