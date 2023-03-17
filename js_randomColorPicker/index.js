//add '.' when use querySelector
const container = document.querySelector('.container');
const refreshBtn = document.querySelector('.btn');

const cardArrNum = 16;

const generatePlatte = () => {
    container.innerHTML = ""; //clear container

    for (let i = 0; i < cardArrNum; i++) {
        //generate a random hex color code
        let randomHex = Math.floor(Math.random() * 0xffffff).toString(16)
        //0xffffff is 16进制, toString can transfer number to string,toString() 方法也接受 radix 或 base 参数。radix 允许你将一个数字从十进制数字系统（基数为 10）转换为代表该数字的其他数字系统的字符串。
        console.log("randomHex:", randomHex, "white", 0xffffff)
        //padStart可以在字符串的开头进行字符补全, in case of randomHex maybe encount to 5 numbers， 1st parameter is targetLength, 2st is the string to add
        randomHex = `#${randomHex.padStart(6, '0')}`
        console.log("randomHex:", randomHex)

        // creating a new 'li' element and inserting it to the container
        const color = document.createElement('li');
        // 使用 classList API 移除、添加类值.div.classList.remove("foo");div.classList.add("anotherclass");
        color.classList.add('color')
        color.innerHTML = `<div class="rect-box" style="background: ${randomHex}"></div>
        <span class="hex-value">${randomHex}</span>`
        //appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。例如将list2的最后一个项目转移至list1：var node=document.getElementById("myList2").lastChild; document.getElementById("myList1").appendChild(node)；
        console.log(color)
        container.appendChild(color)

        //adding click event to current li element to copy the color, no matter click color rec-box or hex-value
        color.addEventListener('click', () => copied(color, randomHex))
    }
}

generatePlatte();


const copied = (elem, hexVal) => {
    let copiedCard = elem.querySelector('.hex-value')
    // Copying the hex value, updating the text to copied
    navigator.clipboard.writeText(hexVal).then(() => {
        copiedCard.innerHTML = "Copied!";
        console.log(copiedCard)
        // and changing text back to original hex value 
        setTimeout(() => {copiedCard.innerHTML = hexVal}, 1000)
    }).catch((err) => alert("Failed to copy the color code:",err))
    
}


refreshBtn.addEventListener('click', generatePlatte)