// store data in local storage
// show data on screen

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('my-form');
    form.addEventListener('submit', saveToLocalStorage);
    function saveToLocalStorage(e) {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const date = e.target.date.value;
        const time = e.target.time.value;
        const obj = {
            name,
            email,
            phone,
            date,
            time,
        };
        form.reset();
        localStorage.setItem('userData', JSON.stringify(obj));
        showOnScreen(obj);
    }
    function showOnScreen(obj) {
        const parElmnt = document.getElementById('users');
        const childElnt = document.createElement('li');
        childElnt.textContent = obj.name + ' ' + obj.email + ' ' + obj.phone + ' ' + obj.date + ' ' + obj.time;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            localStorage.removeItem('userData');
            parElmnt.removeChild(childElnt);
        };
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => {
            localStorage.removeItem('userData');
            parElmnt.removeChild(childElnt);
            document.getElementById('name').value = obj.name;
            document.getElementById('email').value = obj.email;
            document.getElementById('phone').value = obj.phone;
            document.getElementById('date').value = obj.date;
            document.getElementById('time').value = obj.time;
        };
        childElnt.appendChild(deleteBtn);
        childElnt.appendChild(editBtn);
        parElmnt.appendChild(childElnt);
    }
});