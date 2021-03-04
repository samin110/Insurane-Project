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

// Show Alert prototype
UI.prototype.showAlert = function (message, className) {
    const div = document.createElement('div');
    div.className = `${className}`;
    div.appendChild(document.createTextNode(message));
    form.appendChild(div);
    form.insertBefore(div, document.querySelector('.form-group'));
    // remove Alert
    setTimeout(function () {
        document.querySelector('.error').remove();
    }, 2000)

}

// Show Result 

UI.prototype.showResult = function (price, insurance) {
    const result = document.querySelector('#result');
    const div = document.createElement('div');
    // append insurance to factor
    let make = insurance.make;
    switch (make) {
        case '1':
            make = 'پراید';
            break;
        case '2':
            make = 'اپتیما';
            break;
        case '3':
            make = 'پورشه';
            break;
    }

    let level = insurance.level;
    if (insurance.level == 'basic') {
        level = 'ساده';
    } else {
        level = 'کامل';
    }

    div.innerHTML = `
    <p class="header">خلاصه فاکتور</p>
    <p class="total"> مدل خودرو: ${make}</p>
    <p class="total"> سال ساخت: ${insurance.year}</p>
    <p class="total"> نوع بیمه: ${level}</p>
    <p class="total"> قیمت نهایی: ${price}</p>
    `;
    const spiner = document.querySelector('#loading img');
    spiner.style.display = 'block';
    setTimeout(function(){
        spiner.style.display = 'none';
        result.appendChild(div);
    },2500)
}

// =========================== //
/** Object Insurance  **/
function Insurance(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;
}

Insurance.prototype.calculatePrice = function (info) {
    let price;
    let basePrice = 2_000_000;
    // Get the value make
    const make = info.make;

    switch (make) {
        case '1':
            price = basePrice * 1.15;
            break;
        case '2':
            price = basePrice * 1.30;
            break;
        case '3':
            price = basePrice * 1.80;
            break;
    }

    // Calculate difference year
    const year = info.year;
    const difference = this.getYearDifference(year);

    // 3% cheaper for each year

    price = price - (((difference * 3) / 100) * price);

    // Calculate price Based on level
    const level = info.level;
    price = this.calculateLevel(level, price);
    return price;
}

// Difference year prototype
Insurance.prototype.getYearDifference = function (year) {
    let now = new Date().toLocaleDateString('fa-IR');

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
    let nowYear = now.slice(0, 4);

    // call fixnumber function & pass arguments
    let currentYear = fixNumbers(nowYear);
    currentYear = parseInt(currentYear);             /* conver String to Number fot parseInt() */

    // Get difference year
    const difference = currentYear - year;
    return difference;
}

// Calculate price based on level
Insurance.prototype.calculateLevel = function (level, price) {
    if (level == 'basic') {
        price = price * 1.30;
    } else {
        price = price * 1.50;
    }
    return price;
}







// ** Variable 
const ui = new UI();
const form = document.getElementById('request-quote');








// ** Event Listeners
eventListeners();
function eventListeners() {
    // get option tag
    document.addEventListener('DOMContentLoaded', function () {
        // Show <option>
        ui.showYear();
    });

    // Get value when click 'submit'
    form.addEventListener('submit', function (e) {
        const make = document.getElementById('make').value;
        const year = document.getElementById('year').value;
        const level = document.querySelector('input[name="level"]:checked').value;

        // Cehck Correct input for form
        if (make === '' || year === '' || level === '') {
            ui.showAlert('Please Fill All fields!!!', 'error');
        } else {
            // remove factor repeat
            let resultDiv = document.querySelector('#result div');
            if(resultDiv !== null){
                resultDiv.remove();
            }

            const insurance = new Insurance(make, year, level);
            const price = insurance.calculatePrice(insurance);
            ui.showResult(price, insurance);
        }
        e.preventDefault();
    })

}