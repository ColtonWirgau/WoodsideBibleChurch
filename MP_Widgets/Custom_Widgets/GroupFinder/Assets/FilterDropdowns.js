//const cities = ["Algonac", "Chesterfield", "Detroit", "Downriver", "Farmington Hills", "Lake Orion", "Lapeer", "Plymouth", "Pontiac", "Romeo", "Royal Oak", "Troy", "Troy Español", "Warren", "White Lake"];

/*
function getCities() {
    const cities = [];
    const cityElements = document.querySelectorAll("#autocomplete-list div");
    
    cityElements.forEach(div => {
        cities.push(div.textContent.trim());
    });
    
    console.log("Cities");

    return cities;
}



function filterDropdown(passedID) {
    const input = document.getElementById(passedID);
    const filter = input.value.toLowerCase();
    const list = document.getElementById("autocomplete-list");
    list.innerHTML = "";
    
    if (!filter) {
        showDropdown();
        return;
    }

    cities = getCities();
    
    cities.filter(city => city.toLowerCase().includes(filter)).forEach(city => {
        const item = document.createElement("div");
        item.textContent = city;
        item.onclick = function () {
            input.value = city;
            list.innerHTML = "";
        };
        list.appendChild(item);
    });
}

function showDropdown(passedID) {
    const list = document.getElementById("autocomplete-list");
    list.innerHTML = "";
    cities.forEach(city => {
        const item = document.createElement("div");
        item.textContent = city;
        item.onclick = function () {
            document.getElementById(passedID).value = city;
            list.innerHTML = "";
        };
        list.appendChild(item);
    });
}
*/
/* NEED TO MAKE THIS WORK FOR A CLASS INSTEAD OF ID */
/*
document.addEventListener("click", function(event) {
    const input = document.getElementById('campusFilteredDropdown');
    const list = document.getElementById("autocomplete-list");
    if (!input.contains(event.target) && !list.contains(event.target)) {
        list.innerHTML = "";
    }
});
*/

/*
document.addEventListener("click", function(event) {
    document.querySelectorAll(".autocomplete-list").forEach(list => {
        const input = document.getElementById("campusFilteredDropdown");
        if (!input.contains(event.target) && !list.contains(event.target)) {
            list.innerHTML = "";
        }
    });
});
*/
