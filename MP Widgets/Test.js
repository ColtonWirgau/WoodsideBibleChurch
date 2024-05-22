const cookies = document.cookie
var test = cookies.split('; ')

console.log("Cookies: ");
console.log(test);

let i = 0;

while (i < test.length) {
    if (test[i].startsWith('tbx-ws__selected-location=')) {
        console.log("Cookie " + i + ": ")
        console.log(test[i].split('tbx-ws__selected-location=')[1]);
    }
    i++;
}


var locationToken = document.cookie //localStorage.getItem("tbx-ws__selected-location");	 


const MyCustomWidget = document.getElementById("MyCustomWidget");
var params = MyCustomWidget.getAttribute("data-params");

if (locationToken !== null) {
  params = params + "&@CongregationID='" + locationToken + "'";
} 


MyCustomWidget.setAttribute("data-params", params);


document.getElementById("Attributes").innerHTML = params;	
