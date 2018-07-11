let req = new XMLHttpRequest();
req.open('GET',
    'static/data.json', false);
req.send(null);
if(req.status == 200) {
        let books = JSON.parse(req.responseText);
        for( id in books){
            let item =
            console.log(books[id]);
        }
}