var deleteButton = document.querySelectorAll(".delete-button");
var deleteID = "";

// Element Selector
const messageContainer = document.getElementById("messageContainer");

// Fetch Card
fetch("/api/cars").then((response) => {
    response.json().then((data) => {
        const cardContainer = document.getElementById("card-container");

        data.forEach((car) => {
            const card = document.createElement("div");
            card.className = "card mx-2 my-2";
            card.style = "width:31%";
            card.innerHTML = `<img src="images/car.png" class="card-img-top mx-auto mt-4" alt=""
        style="width: 80%;">
        <div class="card-body">
            <p class="text-xs">${car.name}/${car.size}</p>
            <p class="text-sm font-bold">Rp ${formatCurrency(car.cost)} / hari</p>
            <div class="flex flex-row items-center">
                <img src="images/clock.png" alt="">
                    <p class="ml-2 mb-0 text-xs">Updated at ${formatDate(car.updated_at)}</p>
            </div>

            <div class="flex justify-between mt-3 mb-2">

                <!-- Delete Button -->
                <button class="py-2 delete-button" key=${car.id}>
                    <div class="flex flex-row justify-center items-center">
                        <img src="images/trash.png" alt="">
                            <p class="ml-2 mb-0 text-sm">Delete</p>
                    </div>
                </button>

                <!-- Edit Button -->
                <button class="py-2 edit-button ml-2">
                    <a href="edit/${car.id}" class="no-decoration text-white">
                        <div class="flex flex-row justify-center items-center">
                            <img src="images/edit.png" alt="">
                                <p class="ml-2 mb-0 text-sm">Edit</p>
                        </div>
                    </a>
                </button>
            </div>
        </div>`;

            cardContainer.appendChild(card);
        });
    }).then(() => {
        deleteButton = document.querySelectorAll(".delete-button");
        // for (let i = 0; i < deleteButton.length; i++) {
        //     deleteButton[i].addEventListener("click", () => {
        //         modal.style.display = "block";
        //         deleteID = deleteButton[i].getAttribute("key");
        //         console.log(deleteID);
        //     });
        // }
        deleteButton.forEach((button) => {
            button.addEventListener("click", () => {
                modal.style.display = "block";
                deleteID = button.getAttribute("key");
                console.log(deleteID);
            });
        });
    });
})

// Fetch Message
fetch("/status").then((response) => {
    response.json().then((data) => {
        messageContainer.innerHTML = "";
        const div = document.createElement("div");
        if (data.message == "Data Berhasil Disimpan" || data.message == "Data Berhasil Diupdate") {
            div.classList.add("text-white", "px-16", "py-3", "no-border");
            div.style.backgroundColor = "#73CA5C";
            div.style.borderRadius = "2px";
            div.innerHTML = data.message;
        }
        else if (data.message == "Data Berhasil Dihapus") {
            div.classList.add("text-white", "px-16", "py-3", "no-border");
            div.style.backgroundColor = "#000000";
            div.style.borderRadius = "2px";
            div.innerHTML = data.message;
        }
        messageContainer.appendChild(div);
    })
})


function formatCurrency(value) {
    // Create a new Intl.NumberFormat instance for a locale that uses dot as thousands separator
    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    // Use the formatter to format the value
    return formatter.format(value);
}

function formatDate(dateString) {
    const date = new Date(dateString);

    // Options for formatting the date part
    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);

    // Options for formatting the time part
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date).replace(':', '.');

    return `${formattedDate}, ${formattedTime}`;
}

// Modals
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

cancelDeleteBtn.onclick = function () {
    modal.style.display = "none";
}

confirmDeleteBtn.addEventListener("click", function () {
    modal.style.display = "none";
    fetch(`/api/cars/${deleteID}`, {
        method: "DELETE",
    }).then((response) => {
        response.json().then((data) => {
            console.log(data);
            window.location.reload();
        })
    }).catch((err) => {
        console.log(err);
    });
});
