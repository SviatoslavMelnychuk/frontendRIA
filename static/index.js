//get data
let arrLeft = [];
let count = 0;
//count of books
let left = document.querySelector(".left");
let leftP = document.createElement("p");
leftP.style.color = "green";
leftP.style.textAlign = "center";
left.appendChild(leftP);
let right = document.querySelector(".right");
let rightP = document.createElement("p");
rightP.style.color = "red";
rightP.style.textAlign = "center";
right.appendChild(rightP);

let req = new XMLHttpRequest();
req.open('GET', 'static/data.json', false);
req.send(null);
if (req.status == 200) {
    let books = JSON.parse(req.responseText);
    let rectangle = 0;
    if (sessionStorage.length) {
        arrLeft = sessionStorage.getItem('left').split(",");
    } else {
        rectangle = document.querySelector(".left");
        arrLeft = Object.keys(books);
    }
    //all books
    for (id in books) {
        if (arrLeft.indexOf(id) === -1) {
            rectangle = document.querySelector(".right");
        } else {
            rectangle = document.querySelector(".left");
        }

        //create items
        let item = document.createElement("div");
        item.classList.add("item");
        rectangle.appendChild(item);
        //pictures
        let pic = document.createElement("div");
        pic.classList.add("pic");
        item.appendChild(pic);
        let spanIMG = document.createElement("span");
        pic.appendChild(spanIMG);
        let img = document.createElement("img");
        img.src = books[id].img;
        spanIMG.appendChild(img);

        //title
        let title = document.createElement("div");
        title.classList.add("title");
        item.appendChild(title);
        let spanName = document.createElement("span");
        spanName.innerHTML = "<b>Название</b>: " + books[id].name;
        title.appendChild(spanName);
        let spanAuthor = document.createElement("span");
        spanAuthor.innerHTML = "<b>Автор</b>: " + books[id].author;
        title.appendChild(spanAuthor);

        //after
        let after = document.createElement("div");
        if (arrLeft.indexOf(id) === -1) {
            after.classList.add("before");
        } else {
            after.classList.add("after");
        }
        count++;
        after.id = id;
        item.appendChild(after);
        after.addEventListener("click", moveItem);
    }
    showNumber();
}

//move item
function moveItem(event) {
    let arrows = event.target;
    let item = arrows.closest(".item");
    let id = arrows.id;

    if (arrows.className === "after") {
        let right = document.querySelector(".right");
        arrLeft.splice(arrLeft.indexOf(id), 1);
        item.remove();
        right.appendChild(item);
        arrows.classList.remove("after");
        arrows.classList.add("before");
    } else {
        let left = document.querySelector(".left");
        item.remove();
        left.appendChild(item);
        arrows.classList.remove("before");
        arrows.classList.add("after");
        arrLeft.push(id);
    }
    sessionStorage.setItem('left', arrLeft);
    showNumber();
}

function showNumber() {
    let leftCount = arguments.length ? arguments[0] : arrLeft.length;
    let rightCount = arguments.length ? arguments[1] : (count - arrLeft.length);
    leftP.innerHTML = "<b>number of books in green box: " + leftCount + "</b>";
    rightP.innerHTML = "<b>number of books in red box: " + rightCount + "</b>";
}

function search() {
    let str = document.getElementById("search").value.toUpperCase();
    let items = document.getElementsByClassName("item");
    let leftNumber = 0;
    let rightNumber = 0;
    for (let i = 0; i < items.length; i++) {
        let author = items[i].querySelectorAll("div.title span");
        let startName = author[author.length - 1].innerText.lastIndexOf(":");
        let authorName = author[author.length - 1].innerText.substring(startName + 1);

        if (authorName.toUpperCase().indexOf(str) > -1) {
            items[i].style.display = "";
            (items[i].parentElement === left) ? leftNumber++ : rightNumber++;

        } else {
            items[i].style.display = "none";
        }
    }
    showNumber(leftNumber, rightNumber);
}

