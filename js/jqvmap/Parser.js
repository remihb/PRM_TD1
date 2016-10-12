/**
 * getCSV() method
 */
function getCSV() {
    /*Papa.parse("/data/data.csv", {
        download: true,
        complete: function(results) {
            console.log(results);
            parseCSV(results.data);
        }
    });*/
}

/**
 * parseCSV() method
 *
 * @param csv_str
 */
function parseCSV(csv_str) {
    for (var i = 0; i < csv_str.length; i++) {
        for(var line = 0; line <csv_str[i].length; line++)
        {
            console.log("LINE : " + csv_str[i][line]);
        }
    }
}