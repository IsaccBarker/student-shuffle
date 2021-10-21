function handleFileSelect(evt) {
    console.log("User uploaded file");
    var files = evt.target.files; // FileList object

    // use the 1st file from the list
    f = files[0];
    
    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
        return function(e) {
            var names = [];
            var data = Papa.parse(e.target.result);

            console.log(data);

            for (row of data.data) {
                names.push(row[1]);
            }

            names.sort(() => Math.random() - 0.5);
            names.shift();
            const half = Math.ceil(names.length / 2);

            const firstHalf = names.splice(0, half)
            const secondHalf = names.splice(-half)

            document.getElementById("output1").innerHTML = firstHalf.join('<br>');
            document.getElementById("output2").innerHTML = secondHalf.join('<br>')
        };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsText(f);
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('upload').addEventListener('change', handleFileSelect, false);
});

