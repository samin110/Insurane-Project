//**  Object constructor
function UI() { }

// Show Year
UI.prototype.showYear = function () {
    // Get Current Year
    let year = new Date().toLocaleDateString('fa-IR');

    // convert pearsian number to english number by function fixNumber
    var
        persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
        fixNumbers = function (str) {
            if (typeof str === 'string') {
                for (var i = 0; i < 10; i++) {
                    str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                }
            }
            return str;
        };

    // slice 4 letters from date
    year = year.slice(0, 4);

    // call fixnumber function & pass arguments
    let currentYear = fixNumbers(year);
    currentYear = parseInt(currentYear);             /* conver String to Number fot parseInt() */

    // Get 20 years ago
    const twentyYears = currentYear - 20;


    // Access to select tag
    const selectTag = document.querySelector('#year');

    // for loop for show 20 years ago in page by option
    for (let i = currentYear; i >= twentyYears; i--) {
        // create Element option and append to parent
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        selectTag.appendChild(option);
    }




}











// ** Variable







// ** Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // Show <option>
    const ui = new UI();
    ui.showYear();

})