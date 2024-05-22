const cookies = document.cookie;
var cookie = cookies.split('; ');
var locationToken = null;
const MyCustomWidget = document.getElementById("MyCustomWidget");
var params = MyCustomWidget.getAttribute("data-params");


let i = 0;

while (i < cookie.length) {
    if (cookie[i].startsWith('tbx-ws__selected-location=')) {
        locationToken = cookie[i].split('tbx-ws__selected-location=')[1];
        //console.log(locationToken);
        params = params + "&@CongregationID='" + locationToken + "'";
    }
    i++;
} 


MyCustomWidget.setAttribute("data-params", params);

document.getElementById("Attributes").innerHTML = params;	
