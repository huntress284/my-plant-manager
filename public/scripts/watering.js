// Water plant
async function water(id) {

    console.log("Plant ID to water: " + id);
    // const today = document.getElementById('waterDate').value;
    const today = document.querySelector(`[water_date= "${id}"]`).value;

    console.log(today)

    const url = 'http://localhost:3001/api/plants/water';
    const options = {
        method: 'PUT', headers: {
            'content-type': 'application/json'
        }, body: JSON.stringify({
            plantId: id,
            date: today
        })
    };
    const response = await fetch(url, options);
    if (response.ok) {
        location.reload();
    }
}

async function new_water(){

    // console.log(document.getElementById('waterDate').value)



}


async function check_water() {
    // alert('checking last waters...');
    // console.log('loaded script');

    const url = 'http://localhost:3001/api/plants';
    const options = {
        method: 'GET'
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        console.log(response.status);
    }
    const json = await response.json();

    // console.log(json);

    var date = new Date();
    var year = date.toLocaleString("default", {year: "numeric"});
    var month = date.toLocaleString("default", {month: "2-digit"});
    var day = date.toLocaleString("default", {day: "2-digit"});
    var today = year + "-" + month + "-" + day;
    // console.log("Today's date: " + today);  // Prints: 2022-05-04

    for (let i = 0; i < json.length; i++) {

        if (json[i][3] === today) {


            // console.log('you watered today!');
            // document.querySelector(`[water-time= "${json[i][0]}"]`).innerText = 'You watered today!';


            console.log("if today: " + json[i][0]);
            document.querySelector(`[water-alert= "${json[i][0]}"]`).classList.add('alert-primary');
            document.querySelector(`[water-alert= "${json[i][0]}"]`).prepend('Watered Today!')
            document.querySelector(`[water-last= "${json[i][0]}"]`).style.display = "block";

        } else if (json[i][3] === null) {
            // document.querySelector(`[water-time= "${json[i][0]}"]`).innerText = 'Never watered!';
            // console.log("if null: " + json[i][0]);


            // document.querySelector(`[water-alert= "${json[i][0]}"]`).classList.add('alert-secondary');
            // document.querySelector(`[water-last= "${json[i][0]}"]`).style.display = "block";

        } else {
            var date1 = new Date(json[i][3]);
            var date2 = new Date(today);
            var Difference_In_Time = date2.getTime() - date1.getTime();
            // To calculate the no. of days between two dates
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
            //To display the final no. of days (result)
            console.log("Total number of days between dates"
                + date1 + "and"
                + date2 + "is:"
                + Difference_In_Days);

            if (Difference_In_Days >= 7) {
                // document.querySelector(`[water-time= "${json[i][0]}"]`).innerText = "It has been " + Difference_In_Days + "days since last water";

                document.querySelector(`[water-alert= "${json[i][0]}"]`).classList.add('alert-danger');
                document.querySelector(`[water-alert= "${json[i][0]}"]`).prepend("It has been " + Difference_In_Days + " days since last water");
                document.querySelector(`[water-last= "${json[i][0]}"]`).style.display = "block";
            }
        }
    }

}