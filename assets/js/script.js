var now = dayjs();

var containerEl = $(".container");

// display current day
$("#currentDay").text(now.format("dddd, MMMM Do"));

// Creating an array with the hours of the day
var dayHour = Array.from(new Array(9)).map(function (v,i){
    var hr12 = dayjs().hour(i+9).format("h:00 A");
    var hr24 = dayjs().hour(i+9).format("H");
    return {hr12,hr24};
});

// time-block: hour of the day, text, save button
dayHour.forEach(function(hour){
    var timeBlock = $("<form>")
        .addClass("row time-block");

    var hourTab = $("<div>")
        .addClass("hour col-2");
    
    var hourText = $("<p>")
        .addClass("m-4")
        .text(hour.hr12);
        
    var task = $("<textarea>")
        .addClass("col-9 description form-control")
        .attr("id",hour.hr24);
    
    var saveBtn = $("<button class='saveBtn col-1'><i class='fas fa-save'></i></button>");

    containerEl.append(timeBlock);
    timeBlock.append(hourTab);
    timeBlock.append(task);
    timeBlock.append(saveBtn); 
    hourTab.append(hourText)
});

// Color Coding Time-Blocks
$(".description").each(function(){
    var block = parseInt($(this).attr("id"));
    var time = parseInt(now.format("H"));

    if(block===time){
        $(this).addClass("present");
    }
    else if(block<time)
    {
        $(this).addClass("past");
    }
    else{
        $(this).addClass("future");
    }
})
