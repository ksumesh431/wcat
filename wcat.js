var fs = require('fs');

let input = process.argv.slice(2);
let options = [];
let filepaths = [];
for (let i = 0; i < input.length; i++) {
    if (input[i].charAt(0) == "-") {
        options.push(input[i]);
    } else {
        filepaths.push(input[i]);
    }

}

//edge case for path doesnt exists
for (let i = 0; i < filepaths.length; i++) {
    if (!fs.existsSync(filepaths[i])) {
        console.log(filepaths[i], " does not exist error");
        return;
    }
}

let allFilesContent = "";
for (let i = 0; i < filepaths.length; i++) {
    allFilesContent += fs.readFileSync(filepaths[i]);
    allFilesContent += "\r\n";
}

//console.log(allFilesContent);

let allContentArray = allFilesContent.split("\r\n");  // arranges the content of allFiles content "LINE BY LINE" in array
console.log(allContentArray)
console.log("```````````````````````````````````")
console.log("```````````````````````````````````")


let isSpresent = options.includes("-s");
let isNpresent = options.includes("-n");
let isBpresent = options.includes("-b");

if (isSpresent) {
    let length = allContentArray.length;
    for (let i = 0; i < length; i++) {
        if (allContentArray[i] == "" && allContentArray[i - 1] == "") {
            allContentArray[i] = null;
        } else if (allContentArray[i] == "" && allContentArray[i - 1] == null) {
            allContentArray[i] = null;
        }
        // if(allContentArray[i]==""){
        //     allContentArray[i]=null;
        // }
    }

    let temp = [];
    for (let i = 0; i < allContentArray.length; i++) {
        if (allContentArray[i] != null) {
            temp.push(allContentArray[i])
        }
    }
    allContentArray = temp;
    // console.log(allContentArray)
}

let final = "";
if (isNpresent && isBpresent) {
    if (options.indexOf("-b") < options.indexOf("-n")) {
        final = "-b";
    } else {
        final = "-n";
    }
} else if (isNpresent) {
    final = "-n";
} else if (isBpresent) {
    final = "-b";
}
if (final != "") {
    if (final == "-n") {
        addNumToAll(allContentArray);
    } else {
        addNumToContent(allContentArray);
    }
}


function addNumToAll(arr) {
    for (let i = 0; i < arr.length; i++) {
        let strArray = arr[i].split("");
        strArray.unshift(i + " ");
        arr[i] = strArray.join("");
    }
}
function addNumToContent(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != '') {
            let strArray = arr[i].split("");
            strArray.unshift(count + " ");
            arr[i] = strArray.join("");
            count++;
        }
    }


}


console.log("```````````````````````````````````")
console.log("```````````````````````````````````")
console.log("```````````````````````````````````")
for (let i = 0; i < allContentArray.length; i++) {
    console.log(allContentArray[i]);
}