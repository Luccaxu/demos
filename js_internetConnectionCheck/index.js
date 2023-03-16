const popup = document.querySelector(".popup"),
    calculateNum = document.querySelector(".popup_content"),
    icon = document.querySelector(".icon i"),
    title = document.querySelector(".popup_title"),
    desc = document.querySelector(".popup_content"),
    btn = document.querySelector(".btn")

let connectionStatus = true, intervalId, timer = 10

const checkConnection = async () => {
    try {
        //try to fetch random data from the API.If the status code is between 200 and 300,the network connection is considered online.
        const res = await fetch("https://jsonplaceholder.typicode.com/posts")
        connectionStatus = res.status >= 200 && res.status < 300
        console.log(connectionStatus)
    } catch (err) {
        connectionStatus = false
        console.log("lose connection:", err)
    }
    timer = 10
    clearInterval(intervalId)
    handlePopup(connectionStatus)
}

const handlePopup = (status) => {
    if (status) {
        //if the status is true(online),update all elements
        icon.className = "connect_icon"
        console.log("connect_icon:", icon)
        //innerText returns all text contained by an element and all its child elements. innerHtml returns all text, including html tags, that is contained by an element.
        title.innerText = "Restored Connection"
        desc.innerHTML = "Your device is now successfullt connected to the internet."
        popup.classList.add("online")
        console.log(popup)
        return setTimeout(() => { popup.classList.remove("show") }, 2000)

    } else {
        icon.className = "disconnect_icon"
        title.innerText = "Lost Connection"
        desc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds."
        console.log("disconnect_icon:", icon)
        //set an interval to decrease the timer by 1 everysecond, then change the text belong to calculateNum
        popup.className = "popup show"
        //className can reset style, add classList just push a new style after the former one 

        intervalId = setInterval(() => {
            timer--
            //once the timer reaches 0, try to reconnect and clear the interval, reset the timer
            if (timer === 0) checkConnection()
            calculateNum.querySelector("b").innerText = timer
        }, 1000)
    }


}

// execute checkConnection() every 3 seconds，这个setinterval需要传入的是个函数参数，加了括号即需要执行，所以不能加括号
//setTimeout 允许我们将函数推迟到一段时间间隔之后再执行。 setInterval 允许我们重复运行一个函数，从一段时间间隔之后开始运行，之后以该时间间隔连续重复运行该函数。
setInterval(() => connectionStatus && checkConnection(), 3000)

btn.addEventListener("click", checkConnection)