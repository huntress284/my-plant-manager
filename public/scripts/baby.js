// async function addBaby() {
//     let plantID = document.getElementById("plantId");
//     let plantName = document.getElementById("plantInput");
//     let parsed = parseInt(plantID.value);
//     let nameParse = toString(plantName.value);
//
//     // Alert box
//     if (plantID.value == "" || plantName.value == "") {
//         alert("Ensure you input a value in both fields!");
//     } else {
//         console.log(
//             `plantID : ${plantID.value}, name: ${plantName.value}`
//         );
//         console.log(typeof nameParse);
//         // Adds plant to DB with ID and PlantName
//         const url = 'http://localhost:3001/api/plants';
//         const options = {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify({
//                 plantId: parsed,
//                 plantName: plantName.value
//             })
//         };
//         const response = await fetch(url, options);
//         if (response.ok) {
//             // Calls photo form
//             document.getElementById('form2').submit();
//         }
//     }
// }
// async function removeBaby() {
//     id = document.querySelector('#toDelete').dataset.uuid;
//     console.log("Plant ID to delete: " + document.querySelector('#toDelete').dataset.uuid);
//     const url = 'http://localhost:3001/api/nursery';
//     const options = {
//         method: 'DELETE',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify({
//             plantId: id
//         })
//     };
//     const response = await fetch(url, options);
//     if (response.ok) {
//         location.reload();
//     }
// }