const form = document.getElementById('register-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = form.elements['name'].value;
  const email = form.elements['email'].value;
  const password = form.elements['password'].value;
  const dob = form.elements['dob'].value;
  const age = getAge(dob);
  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }
  const user = {name, email, password, dob};
  saveUser(user);
  console.log(`Name: ${name}\nEmail: ${email}\nPassword: ${password}\nDate of Birth: ${dob}`);
});

function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function loadUser() {
  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    form.elements['name'].value = user.name;
    form.elements['email'].value = user.email;
    form.elements['password'].value = user.password;
    form.elements['dob'].value = user.dob;
  }
}

loadUser();
