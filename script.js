const parent = document.getElementsByClassName("time")[0];

const elements = parent.getElementsByTagName("span");
const elementArray = []



getData().then((data) => {
    eventListeners(data);
})

async function getData() {
    return fetch("data.json")
        .then(response => response.json())
        .then(json => {
            return json;
        });
}

function eventListeners(data) {
    for (const element of elements) {
        elementArray.push(element);
    }

    elementArray.forEach(element => {
        element.addEventListener("click", function () {
            elementArray.forEach(item => {
                item.style.fontWeight = 300;
                item.style.color = "#bdc1ff";
            });

            this.style.fontWeight = 400;
            this.style.color = "white";

            

            changeValues(data, this.textContent.toLowerCase());
        });
    });
}

function changeValues(data, time) {
    const timeElements = document.getElementsByClassName("activity-time");
    const previousTimeElements = document.getElementsByClassName("activity-previous-time");

    data.forEach((set, i) => {
        const timeframe = set.timeframes;

        switch(time) {
            case "daily":
                timeElements[i].textContent = `${timeframe.daily.current}hrs`;
                previousTimeElements[i].textContent = `Last Day - ${timeframe.daily.previous}hrs`;
                break;

            case "weekly": 
                timeElements[i].textContent = `${timeframe.weekly.current}hrs`
                previousTimeElements[i].textContent = `Last Week - ${timeframe.weekly.previous}hrs`;
                break;
            
            case "monthly": 
                timeElements[i].textContent = `${timeframe.monthly.current}hrs`
                previousTimeElements[i].textContent = `Last Month - ${timeframe.monthly.previous}hrs`;
                break;
        }
        
    })
}