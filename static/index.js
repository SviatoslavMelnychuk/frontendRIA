//get data
let req = new XMLHttpRequest();
req.open('GET', 'static/data.json', false);
req.send(null);
if (req.status == 200) {
    let books = JSON.parse(req.responseText);
    let left = document.querySelector(".left");

    //all books
    for (id in books) {

        //create items
        let item = document.createElement("div");
        item.classList.add("item");
        left.appendChild(item);
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
        spanName.innerHTML = "<b>Название:</b> " + books[id].name;
        title.appendChild(spanName);
        let spanAuthor = document.createElement("span");
        spanAuthor.innerHTML = "<b>Название:</b> " + books[id].author;
        title.appendChild(spanAuthor);

        //after
        let after = document.createElement("div");
        after.classList.add("after");
        item.appendChild(after);
        after.addEventListener("click", moveItem);

    }
}

//move item
function moveItem(event){
    let arrows = event.target;
    let item = arrows.closest(".item");

    if (arrows.className === "after"){
        let right= document.querySelector(".right");
        item.remove();
        right.appendChild(item);
        arrows.classList.remove("after");
        arrows.classList.add("before");
    }else{
        let left = document.querySelector(".left");
        item.remove();
        left .appendChild(item);
        arrows.classList.remove("before");
        arrows.classList.add("after");
    }

}