function clearTable(data) {

    const tableBody = document.getElementById('person_table').getElementsByTagName('tbody')[0];
    var length = tableBody.rows.length;
    if (length != 0) {

        for (var i = length; i > 0; i--) {
            tableBody.deleteRow(0);
        }
    }
}

async function postFunction() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const age = document.getElementById("age").value;

    const person = { firstName: fname, sureName: lname, age: age }

    const response = await fetch("http://localhost:3000/persons/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
    });

    document.getElementById('error_response').innerHTML = "";

    getAllFunction();
}

async function getAllFunction() {
    let data = await fetch("http://localhost:3000/persons/").then((response) => response.json());
    person_table = document.getElementById('person_table').getElementsByTagName('tbody')[0];

    clearTable(data);

    if (data.length === 0) {
        document.getElementById('error_response').innerHTML = "No match!";
    }
    else {
        for (value of data) {
            person_table.insertRow().innerHTML += '<tr><td>' + value._id +
                '</td><td>' + value.firstName +
                '</td><td>' + value.sureName +
                '</td><td>' + value.age +
                '</td></tr>';
        }
    }
}

async function getByIDFunction() {
    const id = document.getElementById("id").value;
    let data = await fetch(`http://localhost:3000/persons/` + id).then((response) => response.json());
    person_table = document.getElementById('person_table').getElementsByTagName('tbody')[0];;
    
    const response = await fetch('http://localhost:3000/persons/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    console.log(data)
    clearTable(data);

    if (response.ok) {
        document.getElementById('error_response').innerHTML = "";

        person_table.insertRow().innerHTML += '<tr><td>' + data._id +
            '</td><td>' + data.firstName +
            '</td><td>' + data.sureName +
            '</td><td>' + data.age +
            '</td></tr>';
    } else {
        document.getElementById('error_response').innerHTML = "No match!";
    }
}

async function deleteFunction() {
    const id = document.getElementById("id").value;

    document.getElementById('error_response').innerHTML = "";

    const response = await fetch('http://localhost:3000/persons/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        getAllFunction();
    } else {
        document.getElementById('error_response').innerHTML = "No match!";
    }
}

async function patchFunction() {
    const id = document.getElementById("id").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const age = document.getElementById("age").value;

    const person = { firstName: fname, sureName: lname, age: age }

    document.getElementById('error_response').innerHTML = "";

    const response = await fetch("http://localhost:3000/persons/" + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
    });

    if (response.ok) {
        getAllFunction();
    }
    else {
        document.getElementById('error_response').innerHTML = "No match!";
    }
}