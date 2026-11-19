document.getElementById('MyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Form Submitted");

    const fullname = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const biography = document.getElementById('about').value;
    const birthdayValue = document.getElementById('date').value;
    const typephonenumber = document.getElementById('type-phone-number').value;
    const phonenumber = document.getElementById('phone-number').value;
    const selectedgender = document.querySelector('input[name="gender"]:checked');
    const remember = document.getElementById('remember').checked;
    const TnC = document.getElementById('TnC').checked;

    if (!fullname || !email) {
        alert("you need a username and email.");
        return;
    }

    if (!birthdayValue) {
        alert("You need to enter your birthday.");
        return;
    }

    const today = new Date();
    const birthDate = new Date(birthdayValue);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        alert("You need to be 18.");
        return;
    }

    if (!selectedgender) {
        alert("You must check one of the gender!");
        return;
    }

    const formData = {
        name: fullname,
        email: email,
        password: password,
        birthday: birthdayValue,
        age: age,
        biography: biography,
        typephonenumber: typephonenumber,
        phonenumber: phonenumber,
        remember: remember,
        TnC: TnC,
        selectedgender: selectedgender.value
    };

    console.log(formData);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "submit.json", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const message = document.getElementById('MyForm');
            const response = JSON.parse(xhr.responseText);
            message.textContent = response.message;
        } else if (xhr.readyState === 4) {
            alert('Error submitting form.');
        }
    };
    xhr.send(JSON.stringify(formData));
});
