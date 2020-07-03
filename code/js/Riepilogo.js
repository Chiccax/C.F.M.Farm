const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
let years = [];

let currMonth;
let currYear;

$(document).ready(() => {
    let prevMonthsButton, nextMonthsButton;
    prevMonthsButton = $("#prev-months");
    nextMonthsButton = $("#next-months");

    prevMonthsButton.click(onPrevMonthClick);
    nextMonthsButton.click(onNextMonthClick);

    nextMonthsButton.addClass("disabled");
    nextMonthsButton.prop("disabled", true);

    const now = new Date();
    const fullYear = now.getFullYear();

    currMonth = now.getMonth();

    for(let i = 0, currYear = fullYear - 5; i <= 5; i++, currYear++)
        years[i] = currYear;

    currYear = years.length - 1;
    console.log(currYear, years);
    
    const monthElement = $("#months");
    const yearElement = $("#years");

    monthElement.text(months[currMonth]);
    yearElement.text(years[currYear]);
});

const onPrevMonthClick = () => {
    currMonth--;
    
    if(currMonth < 0) {
        currMonth = 11;
        currYear--;
        if(currYear < 0)
            currYear = 0;
    }

    const monthElement = $("#months");
    const yearElement = $("#years");

    monthElement.text(months[currMonth]);
    yearElement.text(years[currYear]);

    nextMonthsButton = $("#next-months");
    nextMonthsButton.removeClass("disabled");
    nextMonthsButton.prop("disabled", false);

    reloadProgressBars();
}

const onNextMonthClick = () => {
    currMonth++;
    
    if(currMonth > 11) {
        currMonth = 0;
        currYear++;
        if(currYear > years.length)
            currYear = 0;
    }

    const now = new Date();
    if(now.getMonth() == currMonth && now.getFullYear() == years[currYear]) {
        nextMonthsButton = $("#next-months");
        nextMonthsButton.addClass("disabled");
        nextMonthsButton.prop("disabled", true);
    }

    const monthElement = $("#months");
    const yearElement = $("#years");

    monthElement.text(months[currMonth]);
    yearElement.text(years[currYear]);

    reloadProgressBars();
}

const reloadProgressBars = () => {
    const foodBar = $("#progress-bar-food");
    const productBar = $("#progress-bar-product");

    const foodValue = Math.floor(Math.random() * 100) + 1;
    const productValue = Math.floor(Math.random() * 100) + 1;

    foodBar.css("width", foodValue + "%");
    productBar.css("width", productValue + "%");

    foodBar.removeClass("bg-danger");
    foodBar.removeClass("bg-success");
    foodBar.removeClass("bg-warning");

    productBar.removeClass("bg-danger");
    productBar.removeClass("bg-success");
    productBar.removeClass("bg-warning");

    if(foodValue <= 25 )
        foodBar.addClass("bg-danger");
    else if(foodValue >= 65)
        foodBar.addClass("bg-success");
    else
        foodBar.addClass("bg-warning");

    if(productValue <= 25 )
        productBar.addClass("bg-danger");
    else if(productValue >= 65)
        productBar.addClass("bg-success");
    else
        productBar.addClass("bg-warning");
}