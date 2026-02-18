
const testStrings = [
    "Photo by Daniel Altafi on February 05, 2026. This is a real caption.",
    "Photo by fiturmadrid on January 27, 2026. Another caption.",
    "Photo by Daniel Altafi on February 04, 2026 tagging @tepoztlanoficial.",
    "Photo by Some User.",
    "Photo shared by User on January 1st. Just a date.",
    "May be an image of 3 people.",
    "Photo by Daniel Altafi on February 05, 2026.", // No caption
];

function clean(alt) {
    let cleanTitle = alt
        .replace(/^Photo by .+? on .+?\.?/, '') // Old Regex
        .replace(/^Photo by .+?\.?/, '')
        .replace(/^Photo shared by .+?\.?/, '')
        .replace(/^Reel by .+?\.?/, '')
        .replace(/^Video by .+?\.?/, '')
        .replace(/May be an image of.*$/, '')
        .replace(/May be a.*$/, '')
        .replace(/^.*? on Instagram:.*?"/, '')
        .replace(/"$/, '')
        .trim();
    return cleanTitle;
}

function newClean(alt) {
    let cleanTitle = alt
        // Improved regexes: use .*? and match until dot+space or end of string.
        // Also handle the case where there is no space after dot if end of string.
        .replace(/^Photo by .+? on .*?(\.|$)/, '')
        .replace(/^Photo by .+?(\.|$)/, '')
        .replace(/^Photo shared by .+?(\.|$)/, '')
        .replace(/^Reel by .+?(\.|$)/, '')
        .replace(/^Video by .+?(\.|$)/, '')
        .replace(/May be an image of.*$/, '')
        .replace(/May be a.*$/, '')
        .replace(/^.*? on Instagram:.*?"/, '')
        .replace(/"$/, '')
        .trim();
    return cleanTitle;
}

console.log("--- OLD REGEX RESULTS ---");
testStrings.forEach(s => console.log(`'${s}' -> '${clean(s)}'`));

console.log("\n--- NEW REGEX RESULTS ---");
testStrings.forEach(s => console.log(`'${s}' -> '${newClean(s)}'`));
