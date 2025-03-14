var selectedRow = null
function onFormSubmit() {
if (validate()) {
var formData = readFormData();
if (selectedRow == null)
insertNewRecord(formData);
else
updateRecord(formData);
resetForm();
}
}
function readFormData() {
var formData = {};
formData["fullName"] = document.getElementById("fullName").value;
formData["email"] = document.getElementById("email").value;
formData["salary"] = document.getElementById("salary").value;
formData["city"] = document.getElementById("city").value;
return formData;
}
function insertNewRecord(data) {
var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
var newRow = table.insertRow(table.length);
cell1 = newRow.insertCell(0);
cell1.innerHTML = data.fullName;
cell2 = newRow.insertCell(1);
cell2.innerHTML = data.email;
cell3 = newRow.insertCell(2);
cell3.innerHTML = data.salary;
cell4 = newRow.insertCell(3);
cell4.innerHTML = data.city;
cell4 = newRow.insertCell(4);

cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
<a onClick="onDelete(this)">Delete</a>`;
}
function resetForm() {
document.getElementById("fullName").value = "";
document.getElementById("email").value = "";
document.getElementById("salary").value = "";
document.getElementById("city").value = "";
selectedRow = null;
}
function onEdit(td) {
selectedRow = td.parentElement.parentElement;
document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
document.getElementById("email").value = selectedRow.cells[1].innerHTML;
document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
selectedRow.cells[0].innerHTML = formData.fullName;
selectedRow.cells[1].innerHTML = formData.email;
selectedRow.cells[2].innerHTML = formData.salary;
selectedRow.cells[3].innerHTML = formData.city;
}
function onDelete(td) {
if (confirm('Biztos törölni akkarod?')) {
row = td.parentElement.parentElement;
document.getElementById("employeeList").deleteRow(row.rowIndex);
resetForm();
}
}
function validate() {
    let isValid = true;
    
    if (document.getElementById("fullName").value.trim() === "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        document.getElementById("fullNameValidationError").classList.add("hide");
    }
    
    if (document.getElementById("email").value.trim() === "") {
        isValid = false;
        document.getElementById("emailValidationError").classList.remove("hide");
    } else {
        document.getElementById("emailValidationError").classList.add("hide");
    }
    
    if (document.getElementById("city").value.trim() === "") {
        isValid = false;
        document.getElementById("cityValidationError").classList.remove("hide");
    } else {
        document.getElementById("cityValidationError").classList.add("hide");
    }
    
    let salary = document.getElementById("salary").value.trim();
    if (salary === "" || isNaN(salary) || parseFloat(salary) < 100) {
        isValid = false;
        document.getElementById("salaryValidationError").classList.remove("hide");
    } else {
        document.getElementById("salaryValidationError").classList.add("hide");
    }
    
    return isValid;
}


document.addEventListener("DOMContentLoaded", function () {
    var table = document.getElementById("employeeList");
    var headers = table.getElementsByTagName("TH");

    for (let i = 0; i < headers.length; i++) {
        headers[i].addEventListener("click", function () {
            sortTable(i);
        });
    }
});

function sortTable(columnIndex) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
    table = document.getElementById("employeeList");
    switching = true;
    dir = "asc"; // Kezdetben növekvő sorrend

    while (switching) {
        switching = false;
        rows = table.rows;
        
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[columnIndex];
            y = rows[i + 1].getElementsByTagName("TD")[columnIndex];

            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount++;
        } else {
            if (switchCount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
function myFunction() {
    var input, filter, table, tr, td, i, j, txtValue, found;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("employeeList");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) { // Kezdjük az 1. indextől, hogy kihagyjuk a fejlécet
        found = false;
        td = tr[i].getElementsByTagName("td");
        
        for (j = 0; j < td.length; j++) { // Végigmegyünk az adott sor összes oszlopán
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        
        if (found) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

// Web Storage
function saveToLocalStorage() {
    localStorage.setItem("testKey", "Ez egy teszt adat");
    alert("Adat elmentve!");
}
function loadFromLocalStorage() {
    document.getElementById("storage-result").innerText = localStorage.getItem("testKey") || "Nincs adat";
}

// Web Workers
let worker;
function startWorker() {
    if (typeof(Worker) !== "undefined") {
        if (!worker) {
            worker = new Worker("worker.js");
            worker.onmessage = function(event) {
                document.getElementById("worker-result").innerText = event.data;
            };
        }
        worker.postMessage("start");
    } else {
        alert("Böngésződ nem támogatja a Web Workereket.");
    }
}

// Server-Sent Events
if (typeof(EventSource) !== "undefined") {
    const source = new EventSource("server.php");
    source.onmessage = function(event) {
        document.getElementById("sse-result").innerText = event.data;
    };
} else {
    document.getElementById("sse-result").innerText = "A böngésződ nem támogatja az SSE-t.";
}

// Geolocation API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            document.getElementById("geo-result").innerText = `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`;
        });
    } else {
        alert("A böngésződ nem támogatja a Geolocation API-t.");
    }
}

// Drag and Drop API
function allowDrop(event) {
    event.preventDefault();
}
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}
function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

// Canvas
window.onload = function() {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(10, 10, 100, 50);
};