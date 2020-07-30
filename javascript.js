function readTime() {
    let fetchedTime = new Date();
    document.getElementById("time").innerHTML = fetchedTime;
}
async function refresh() {
    setInterval(readTime, 1000);
    let fetchStringG = await fetch("https://api.covid19api.com/summary");
    let fetchDataG = await fetchStringG.json();
    let fetchString = await fetch("https://api.covid19india.org/v4/data.json");
    let fetchData = await fetchString.json();
    //Load Country Data Begins...
    {
        let countryArray = ["United States", "Brazil", "India", "Russia", "South Africa", "Mexico", "Peru", "Chile", "United Kingdom", "Iran"];
        let countryIndex = [177, 23, 76, 138, 154, 109, 131, 34, 176, 78];
        let table = document.getElementById("country");
        for(let i=0; i<countryArray.length; i++) {
            let row = table.insertRow(i+1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = countryArray[i];
            if (countryArray[i] == "India") {
                cell2.innerHTML = fetchData.TT.total.confirmed;
                cell3.innerHTML = fetchData.TT.total.deceased;
            } 
            else {
            cell2.innerHTML = fetchDataG.Countries[countryIndex[i]].TotalConfirmed;
            cell3.innerHTML = fetchDataG.Countries[countryIndex[i]].TotalDeaths;
            }
        }
    }
    //Load Country Data Ends...
    //Load State Data Begins...
    {
        let stateArray = ["Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chattisgarh", "Delhi", "Dadra & Nagar Haveli, Daman & Diu", "Goa", "Gujarat", "Himachal Pradesh", "Haryana", "Jharkhand", "Jammu & Kashmir", "Karnataka", "Kerala", "Ladakh", "Maharashtra", "Meghalaya", "Manipur", "Madhya Pradesh", "Mizoram", "Nagaland", "Odisha", "Punjab", "Puducherry", "Rajasthan", "Sikkim", "Telangana", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
        let stateIndex = ["AN", "AP", "AR", "AS", "BR", "CH", "CT", "DL", "DN", "GA", "GJ", "HP", "HR", "JH", "JK", "KA", "KL", "LA", "MH", "ML", "MN", "MP", "MZ", "NL", "OR", "PB", "PY", "RJ", "SK", "TG", "TN", "TR", "UP", "UT", "WB"];
        let table = document.getElementById("state");
        for(let i=0; i<stateArray.length; i++) {
            let row = table.insertRow(i+1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = stateArray[i];
            cell2.innerHTML = fetchData[stateIndex[i]].total.confirmed;
            if (fetchData[stateIndex[i]].total.deceased == undefined) {
                cell3.innerHTML = "N/A";
            }
            else {
                cell3.innerHTML = fetchData[stateIndex[i]].total.deceased;
            }
        }
    }
    //Load State Data Ends...
    //Load District Data Begins...
    {
        let districtArray = ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"];
        let table = document.getElementById("district");
        for(let i=0; i<districtArray.length; i++) {
            let row = table.insertRow(i+1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = districtArray[i];
            cell2.innerHTML = fetchData.BR.districts[districtArray[i]].total.confirmed;
            cell3.innerHTML = fetchData.BR.districts[districtArray[i]].total.deceased;
        }
    }
    //Load District Data Ends...
}
refresh();

async function fetchCoronaGlobal() {
    let fetchString = await fetch("https://api.covid19api.com/summary");
    let fetchData = await fetchString.json();
    document.getElementById("globalConfirmed").innerHTML = fetchData.Global.TotalConfirmed;
    document.getElementById("globalDeaths").innerHTML = fetchData.Global.TotalDeaths;
    document.getElementById("globalRecovered").innerHTML = fetchData.Global.TotalRecovered;
}
async function fetchCoronaIndia() {
    let fetchString = await fetch("https://api.covid19india.org/v4/data.json");
    let fetchData = await fetchString.json();
    document.getElementById("indiaConfirmed").innerHTML = fetchData.TT.total.confirmed;
    document.getElementById("indiaDeaths").innerHTML = fetchData.TT.total.deceased;
    document.getElementById("indiaRecovered").innerHTML = fetchData.TT.total.recovered;
}
async function fetchCoronaBihar() {
    let fetchString = await fetch("https://api.covid19india.org/v4/data.json");
    let fetchData = await fetchString.json();
    document.getElementById("biharConfirmed").innerHTML = fetchData.BR.total.confirmed;
    document.getElementById("biharDeaths").innerHTML = fetchData.BR.total.deceased;
    document.getElementById("biharRecovered").innerHTML = fetchData.BR.total.recovered;
}
async function fetchCoronaRohtas() {
    let fetchString = await fetch("https://api.covid19india.org/v4/data.json");
    let fetchData = await fetchString.json();
    document.getElementById("rohtasConfirmed").innerHTML = fetchData.BR.districts.Rohtas.total.confirmed;
    document.getElementById("rohtasDeaths").innerHTML = fetchData.BR.districts.Rohtas.total.deceased;
    document.getElementById("rohtasRecovered").innerHTML = fetchData.BR.districts.Rohtas.total.recovered;
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
});