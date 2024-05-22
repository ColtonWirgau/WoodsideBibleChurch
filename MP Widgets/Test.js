const tok = localStorage.getItem("mpp-widgets_AuthToken");	 
//document.getElementById("Token").innerHTML = tok;	

const MyCustomWidget = document.getElementById("MyCustomWidget");
var params = MyCustomWidget.getAttribute("data-params");

if (tok !== null) {
  params = params + "&@UserToken='" + tok + "'";
} 


MyCustomWidget.setAttribute("data-params", params);


document.getElementById("Attributes").innerHTML = params;	
