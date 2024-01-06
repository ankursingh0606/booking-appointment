// instead of storing data in local storage store it in crudcrud.com
// to store data on crudcrud.com: make a POST request to crudcrud.com using axios 
// check crudcrud resource and see if request was sucessful or not, whether you can see data or not
// on page reload everything is lost, to get data which have been saved on crudcrud.com: make a GET request to crudcrud.com using axios
// show data saved on crudcrud.com on screen

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('my-form');
    form.addEventListener('submit', saveToAPI);
    function saveToAPI(e) {
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
        axios.get("https://crudcrud.com/api/0dd3d9a74fc444caafb9d662c247a93f/UserData")
            .then((response) => {
                const existingData = response.data;
                existingData.forEach(obj => showOnScreen(obj));
            })
            .catch((error) => {
                console.log(error);
            });
        axios.post("https://crudcrud.com/api/0dd3d9a74fc444caafb9d662c247a93f/UserData", obj)
            .then((result) => {
                showOnScreen(obj);
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function showOnScreen(obj) {
        const parElmnt = document.getElementById('users');
        const childElnt = document.createElement('li');
        childElnt.textContent = obj.name + ' - ' + obj.email;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            if (obj._id) {
                axios.delete(`https://crudcrud.com/api/0dd3d9a74fc444caafb9d662c247a93f/UserData/${obj._id}`)
                    .then(() => {
                        parElmnt.removeChild(childElnt);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                console.log("No _id property found in the object.");
            }
        };
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => {
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
