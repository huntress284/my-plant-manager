async function add_note(x, y) {

    console.log("id of button: " + x)
    console.log("note for specific: " + y)



    // const note = document.querySelector(`[data-noteID= "${x}"]`).value;
    const note = document.getElementById('theNote').value;
    // // note
    // console.log("should be: " + note);

    const url = 'http://localhost:3001/api/plants/notes';
    const options = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            plantId: x,
            note: note
        })
    };
    const response = await fetch(url, options);
    if (response.ok) {
        location.reload();
    }

}