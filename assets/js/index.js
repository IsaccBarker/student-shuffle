function go(src) {
    var names = [];
    var data = Papa.parse(src);

    console.log(data);

    for (row of data.data) {
        names.push(row[1]);
    }

    names.sort(() => Math.random() - 0.5);
    names.shift();
    const half = Math.ceil(names.length / 2);

    const firstHalf = names.splice(0, half)
    const secondHalf = names.splice(-half)

    document.getElementById("classOneHeader").style.display = "block";
    document.getElementById("classTwoHeader").style.display = "block";

    document.getElementById("output1").innerHTML = '<p>' + firstHalf.join('<br>') + '</p>';
    document.getElementById("output2").innerHTML = '<p>' + secondHalf.join('<br>') + '</p>';
}

function handleDefault() {
    fetch('/juniorclass.csv')
        .then((out) => {
            go(out);
        })
        .catch(err => {
            throw err
        });
}

function handleFileSelect(evt) {
    console.log("User uploaded file");
    var files = evt.target.files; // FileList object

    // use the 1st file from the list
    f = files[0];
    
    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
        return function(e) { go(e.target.result) };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsText(f);
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('upload').addEventListener('change', handleFileSelect, false);
});

