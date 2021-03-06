var map;
var latitude;
var longitude;

function init(){
    var accessToken = "pk.eyJ1IjoiaXNoaWp1IiwiYSI6ImNpaGRpNXh3MTAwMm11OW00Mmd5NHE1bXkifQ.5VJtYHibmT3X-aEQSKz1Ag";
    map = L.map('map').setView([latitude,longitude], 15);
    L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token='+accessToken).addTo(map);
    L.marker([latitude,longitude]).addTo(map).bindPopup("<b>Vous etes ici</b>");

    var $link = '<a href="#" class="link">chat</a>';
    $.get("membres.json",function (data){
	for(var $i = 0;$i < data.membres.length;$i++){
	    var $chaine = "";	    
		    $chaine += data.membres[$i].nom + "<br /> " + data.membres[$i].prenom + "<br />" + data.membres[$i].age + " ans <br />" + $link;
		    L.marker(data.membres[$i].coordinates).addTo(map) .bindPopup($chaine); 
		}
    });
    var chat_click=0;
    $('body').on('click', '.link', function() {
	if(chat_click == 0){
	    $(".top").css("height","80%");
	    $("#chat").css("bottom","0");
	    $("#chat").css("width","100%");
	    $("#chat").css("height","19%");
	    $("#chat").css("background-color","teal");
	    chat_click=1;
	}else{
	    $(".top").css("height","100%");
	    $("#chat").css("width","0");
	    $("#chat").css("height","0");
	    chat_click=0;
	}
    });
    $("#map").click(function(){
	if (chat_click == 1){
	    $(".top").css("height","100%");
	    $("#chat").css("width","0");
	    $("#chat").css("height","0");
	    chat_click=0;
	}
    });
    
}   
var ok;
window.onload = function(){
    geolocate();
    ok = true;
}

function geolocate(){
    if(navigator.geolocation){
	navigator.geolocation.watchPosition(showPosition);
    }else{
	console.log("erreur");
    }
}

function showPosition(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    if (ok)
    {
	init();
	ok = false;
    }
}
