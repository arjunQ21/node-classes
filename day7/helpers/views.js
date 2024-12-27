import { readFileSync, writeFileSync } from "fs";


function getCurrentViews () {
    // read content of file in string
    const content = readFileSync("views.json", { encoding: "utf-8" })
    // convert that string to js object
    const parsedContent = JSON.parse(content);
    return parsedContent;
}

function increaseViews () {
    // read current views
    let currentViews = getCurrentViews();
    // get current view count
    let count = currentViews.count;
    // increment count by 1
    count = count + 1;
    // update view variable
    currentViews['count'] = count;
    // save the updated count in file
    const jsonString = JSON.stringify(currentViews);
    writeFileSync("views.json", jsonString, { encoding: "utf-8" })
    return getCurrentViews();
}

// exporting modules
export { getCurrentViews, increaseViews }