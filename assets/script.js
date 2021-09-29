var currentDayEl = $('#currentDay');
var activitiesEl = $('.activities');



function init(){
    renderCalender();
    clearStorage();
    renderActivities();
}

// date display on the header
setInterval(function(){
    var rightNow = moment().format('dddd, MMMM Do YYYY');
    currentDayEl.text(rightNow);
},1000);


// function that change the background color of the hour depending whether it is in the past, present or future
function renderCalender(){
    var timeNow = moment().format('k');
    console.log(timeNow);
    var childrens = activitiesEl.children().children('input')
    for (var i=0; i<childrens.length; i++){
        var timeID = childrens.eq(i).attr('id');

        if (parseInt(timeID) == parseInt(timeNow)){
            console.log('current')
            $("#"+timeID).css('background', 'red');
        }else if (parseInt(timeID) < parseInt(timeNow)){
            console.log('past')
            $("#"+timeID).css('background', 'gray');
        }else{
            console.log('future')
            $("#"+timeID).css('background', 'green');
        }
    }
}
    

// function that gets called whenever a user saves the activity
function saveActivities(event){

    // get the hour window that is selected
    var timeEl = event.currentTarget.previousElementSibling.id
    console.log(timeEl)

    // get the activity that is being inputed
    var activity = $('#'+timeEl).val();
    console.log(activity);

    // var dateNow = moment("09/27/21", "MM-DD-YY").format('dddd, MMMM Do YYYY');
    var dateNow = moment().format('dddd, MMMM Do YYYY');

    const activitiesData = (() => {
        const activities = localStorage.getItem('activities');
        return activities === null ? []: JSON.parse(activities);
      })();
    
    //   add activity in the local storage
    activitiesData.push({"time":timeEl,"activity":activity, "date": dateNow})

    localStorage.setItem("activities", JSON.stringify(activitiesData));
    renderActivities();

}

// function to display the activities that are saved
function renderActivities(){
    console.log('renderActivities');
    // get data from localstorage
    var activities = JSON.parse(localStorage.getItem('activities'));
    console.log(activities)

    // for loop to render each activity
    if (activities !== null){
        for (var i=0;i<activities.length;i++){
            console.log(activities[i].time);
            var time = activities[i].time;
            console.log(activities[i].activity);
            var activity = activities[i].activity;
            var rightNow = moment().format('dddd, MMMM Do YYYY');
            var storedDate = activities[i].date;
            if (storedDate === rightNow){
                // add the activity in the element based on the time window
                $('#'+time).val(activity);
                console.log('added');
            }
        }
    }
}

// clear localStorage if not the same day
function clearStorage(){
    console.log('init clearStorage')
    var activities = JSON.parse(localStorage.getItem('activities'));
    console.log(activities)

    // for loop to remove activities that are not in today's date
    if (activities !== null){
        for (var i=0;i<activities.length;i++){
            var time = activities[i].time;
            console.log(time)
            var rightNow = moment().format('dddd, MMMM Do YYYY');
            console.log(rightNow)
            var storedDate = activities[i].date;
            console.log(storedDate)
            // check whether the activity in the local storage has today's date, and if not the activity would be removed from the local storage
            if (storedDate !== rightNow){
                activities.splice(i,1);
                localStorage.setItem('activities', JSON.stringify(activities));
            } 
        }
    }
}

// event listener for the save button
activitiesEl.on('click','.saveBtn', saveActivities);

init()