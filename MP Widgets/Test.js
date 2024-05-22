function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


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
        //console.log(locationToken);

        selectedCongregationID = parseJwt(locationToken);

        console.log(selectedCongregationID);
        
        selectedCongregationID = 1234;
        
        params = params + "&@CongregationID=" + selectedCongregationID;
    }
    i++;
} 


MyCustomWidget.setAttribute("data-params", params);

document.getElementById("Attributes").innerHTML = params;	
