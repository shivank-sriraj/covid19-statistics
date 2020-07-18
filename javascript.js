function readTime() {
    let fetchedTime = new Date();
    document.getElementById("time").innerHTML = fetchedTime;
}
async function loadCountryData() {
    let fetchString = await fetch("https://api.covid19api.com/summary");
    let fetchData = await fetchString.json();
    let fetchStringIn = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
    let fetchDataIn = await fetchStringIn.json();
    let countryArray = ["United States", "Brazil", "India", "Russia", "Peru", "South Africa", "Mexico", "Chile", "United Kingdom", "Iran"];
    let countryIndex = [177, 23, 76, 138, 131, 154, 109, 34, 176, 78];
    let table = document.getElementById("country");
    for(let i=0; i<countryArray.length; i++) {
        let row = table.insertRow(i+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = countryArray[i];
        if (countryArray[i] == "India") {
            cell2.innerHTML = fetchDataIn.data.summary.total;
            cell3.innerHTML = fetchDataIn.data.summary.deaths;
        } 
        else {
        cell2.innerHTML = fetchData.Countries[countryIndex[i]].TotalConfirmed;
        cell3.innerHTML = fetchData.Countries[countryIndex[i]].TotalDeaths;
        }
    }
}
async function loadStateData() {
    let fetchString = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
    let fetchData = await fetchString.json();
    let stateArray = ["Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chattisgarh", "Dadra & Nagar Haveli, Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal"];
    let table = document.getElementById("state");
    for(let i=0; i<stateArray.length; i++) {
        let row = table.insertRow(i+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = stateArray[i];
        cell2.innerHTML = fetchData.data.regional[i].totalConfirmed;
        cell3.innerHTML = fetchData.data.regional[i].deaths;
    }
}
async function loadDistrictData() {
    let fetchString = await fetch("https://api.covid19india.org/v3/data.json");
    let fetchData = await fetchString.json();
    let districtArray = ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"];
    let table = document.getElementById("district");
    for(let i=0; i<districtArray.length; i++) {
        let row = table.insertRow(i+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = districtArray[i];
        cell2.innerHTML = fetchData.BR.districts[districtArray[i]].total.confirmed;
        if (fetchData.BR.districts[districtArray[i]].total.deceased == undefined) {
            cell3.innerHTML = "N/A";
        }
        else {
            cell3.innerHTML = fetchData.BR.districts[districtArray[i]].total.deceased;
        }
    }
}
function refresh() {
    setInterval(readTime, 1000);
    loadCountryData();
    loadStateData();
    loadDistrictData();
}
refresh();

async function fetchCoronaGlobal() {
    let fetchString = await fetch("https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats");
    let fetchData = await fetchString.json();
    document.getElementById("globalConfirmedB").innerHTML = fetchData.data.total_cases;
    document.getElementById("globalDeathsB").innerHTML = fetchData.data.death_cases;
    document.getElementById("globalRecoveredB").innerHTML = fetchData.data.recovery_cases;
}
async function fetchCoronaIndia() {
    let fetchString = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
    let fetchData = await fetchString.json();
    document.getElementById("indiaConfirmedB").innerHTML = fetchData.data.summary.total;
    document.getElementById("indiaDeathsB").innerHTML = fetchData.data.summary.deaths;
    document.getElementById("indiaRecoveredB").innerHTML = fetchData.data.summary.discharged;
}
async function fetchCoronaBihar() {
    let fetchString = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
    let fetchData = await fetchString.json();
    document.getElementById("biharConfirmedB").innerHTML = fetchData.data.regional[4].totalConfirmed;
    document.getElementById("biharDeathsB").innerHTML = fetchData.data.regional[4].deaths;
    document.getElementById("biharRecoveredB").innerHTML = fetchData.data.regional[4].discharged;
}
async function fetchCoronaRohtas() {
    let fetchString = await fetch("https://api.covid19india.org/v3/data.json");
    let fetchData = await fetchString.json();
    document.getElementById("rohtasConfirmedB").innerHTML = fetchData.BR.districts.Rohtas.total.confirmed;
    document.getElementById("rohtasDeathsB").innerHTML = fetchData.BR.districts.Rohtas.total.deceased;
    document.getElementById("rohtasRecoveredB").innerHTML = fetchData.BR.districts.Rohtas.total.recovered;
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
});