var now = dayjs();

var containerEl = $(".container");

// display current day
$("#currentDay").text(now.format("dddd, MMMM Do"));

var dayHour = Array.from(new Array(9)).map(function (v,i){
    var text = dayjs().hour(i+9).format("h:00 A");
    return (text);
});

dayHour.forEach(function(hour){
    var timeBlock = $("<form>")
        .addClass("row time-block");

    var hourTab = $("<div>")
        .addClass("col-2 hour")
        .text(hour);

    var task = $("<textarea>")
        .addClass("col-9 description");
    
    var saveBtn = $("<button class='saveBtn col-1'><i class='fas fa-save'></i></button>");

    containerEl.append(timeBlock);
    timeBlock.append(hourTab);
    timeBlock.append(task);
    timeBlock.append(saveBtn);
    
});