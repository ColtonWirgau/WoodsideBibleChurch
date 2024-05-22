const cookies = document.cookie;
var cookie = cookies.split('; ');
var locationToken = null;

let i = 0;

while (i < cookie.length) {
    if (cookie[i].startsWith('tbx-ws__selected-location=')) {
        console.log("Cookie " + i + ": ")
        //console.log(cookie[i].split('tbx-ws__selected-location=')[1]);
        locationToken = cookie[i].split('tbx-ws__selected-location=')[1];
        console.log(locationToken);
    }
    i++;
} 


const MyCustomWidget = document.getElementById("MyCustomWidget");
var params = MyCustomWidget.getAttribute("data-params");

if (locationToken !== null) {
  params = params + "&@CongregationID='" + locationToken + "'";
} 


MyCustomWidget.setAttribute("data-params", params);


document.getElementById("Attributes").innerHTML = params;	
