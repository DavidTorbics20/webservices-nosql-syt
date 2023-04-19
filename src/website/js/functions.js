function clearTable(data) {      
            
    const tableBody = document.getElementById('person_table').getElementsByTagName('tbody')[0];
    var length = tableBody.rows.length;
    if (length != 0){

        for (var i = length; i > 0; i--){
            tableBody.deleteRow(0);
        }
    }
}

async function postFunction() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const age = document.getElementById("age").value;

    const person = { firstName: fname, sureName: lname, age: age }

    const response = await fetch("http://localhost:3000/persons", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
    });

    getAllFunction();
}

async function getAllFunction() {
    let data = await fetch("http://localhost:3000/persons").then((response) => response.json());
    person_table = document.getElementById('person_table').getElementsByTagName('tbody')[0];

    clearTable(data);

    for (value of data) {
        console.log(value)
        person_table.insertRow().innerHTML += '<tr><td>' + value._id +
                                  '</td><td>' + value.firstName +
                                  '</td><td>' + value.sureName +
                                  '</td><td>' + value.age +
                                  '</td></tr>';
    }
}

async function getByIDFunction() {
    const id = document.getElementById("id").value;
    let data = await fetch(`http://localhost:3000/persons/` + id).then((response) => response.json());
    person_table = document.getElementById('person_table').getElementsByTagName('tbody')[0];;

    clearTable(data);
    console.log(data);

    if (id == ""){
        document.getElementById('error_response').innerHTML = "No match!";
    }
    else {
        document.getElementById('error_response').innerHTML = "";
    
        person_table.insertRow().innerHTML += '<tr><td>' + data._id +
                                    '</td><td>' + data.firstName +
                                    '</td><td>' + data.sureName +
                                    '</td><td>' + data.age +
                                    '</td></tr>';
    }

    // if person with this id does not exist write "person does not exist"
}

async function deleteFunction() {
    const id = document.getElementById("id").value;

    if (id == ""){
        document.getElementById('error_response').innerHTML = "No match!";
    }
    else {
        document.getElementById('error_response').innerHTML = "";

        const response = await fetch('http://localhost:3000/persons/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    getAllFunction();

    // if person with this id does not exist write "person does not exist"
}

async function patchFunction() {
    const id = document.getElementById("id").value;            
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const age = document.getElementById("age").value;

    const person = { firstName: fname, sureName: lname, age: age }

    
    if (id == ""){
        document.getElementById('error_response').innerHTML = "No match!";
    }
    else {
        document.getElementById('error_response').innerHTML = "";

        
        const response = await fetch("http://localhost:3000/persons/" + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        });
    }

    getAllFunction();

    // if person with this id does not exist write "person does not exist"
}