const cookies = document.cookie;
var cookie = cookies.split('; ');
var locationToken = null;
var selectedCongregationID = null;
const MyCustomWidget = document.getElementById("MyCustomWidget");
var params = MyCustomWidget.getAttribute("data-params");


let i = 0;

while (i < cookie.length) {
    if (cookie[i].startsWith('tbx-ws__selected-location=')) {
        locationToken = cookie[i].split('tbx-ws__selected-location=')[1];
        console.log("LocationToken");
        console.log(locationToken);
        
        const tokenPayload = atob(locationToken);
        
        console.log("Payload");
        console.log(tokenPayload);

        const locationJSON = JSON.parse(tokenPayload);

        console.log("JSON");'
        console.log(locationJSON);
        //console.log(tokenPayload.location_id);

        
        //params = params + "&@CongregationID=" + selectedCongregationID;
    }
    i++;
} 


//MyCustomWidget.setAttribute("data-params", params);

document.getElementById("Attributes").innerHTML = params;	
