const tok = localStorage.getItem("mpp-widgets_AuthToken");	 
document.getElementById("Token").innerHTML = tok;	


const MyCustomWidget = document.getElementById("MyCustomWidget");
const params = MyCustomWidget.getAttribute("data-params");

document.getElementById("Attributes").innerHTML = params;	
