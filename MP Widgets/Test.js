const locationToken = document.cookie //localStorage.getItem("tbx-ws__selected-location");	 

const MyCustomWidget = document.getElementById("MyCustomWidget");
var params = MyCustomWidget.getAttribute("data-params");

if (locationToken !== null) {
  params = params + "&@CongregationID='" + locationToken + "'";
} 


MyCustomWidget.setAttribute("data-params", params);


document.getElementById("Attributes").innerHTML = params;	
