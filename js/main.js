'use strict'
var elNext = document.querySelector('.next-Num')
var display = document.querySelector('.time')
var isRuning = false
var startTime = 0
var timer = null
var elapsedTime = 0 
var nums 
var lestSize 


function onInit(baordSize = lestSize) {
    elNext.innerHTML = '1'
    nums = boardNums(baordSize)
    creatBoard(baordSize)
    nums = boardNums(baordSize)
    resetTimer()
    lestSize = baordSize
}


function onCellClicked(elTd,clickedNum) {
    if (clickedNum === 1) {
       onTimer()
    }

    if (clickedNum === nums[0]) {
        elTd.classList.add('clicked')
        elTd.classList.remove('hover')
        nums.splice(0,1)
        var nextNum = nums[0]
        elNext.innerHTML = (nums.length === 0) ? 'finished!' : nextNum
        if (nums.length === 0) {
            stopTimer()
         }
    }
}
   

function creatBoard(baordSize) {
    var elTable = document.querySelector('table')
    var strHtml = ''
    for (let i = 0; i < Math.sqrt(baordSize); i++) {
        strHtml += '\n <tr>'
        for (let j = 0; j < Math.sqrt(baordSize); j++) {
        var currNum = SelectNum()
        strHtml += `<td class="color hover" onclick="onCellClicked(this,${currNum})">${currNum}</td>`
        }
        strHtml += '</tr>'
    }
    elTable.innerHTML = strHtml
}

/////////////////////////////
function boardNums(size) {
    var res = []
    for (let i = 1; i <= size; i++) {
        res.push(i) 
    }
    return res    
}

function SelectNum() {
    var currNumIdx = getRandomInt(0, nums.length)
    var currNum = nums[currNumIdx]
    nums.splice(currNumIdx,1)
    return currNum
}

//////////////////////////////

function onTimer() {
    if (!isRuning) {
        startTime = Date.now()
        timer = setInterval(update,31)
        isRuning = true
    }
  }

  function update() {
    var currentTime = Date.now()
    elapsedTime = currentTime - startTime
    var minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
    var seconds  = Math.floor(elapsedTime / 1000 % 60)
    var milliSeconds  = Math.floor(elapsedTime % 1000 )
    minutes = String(minutes).padStart(2,'0')
    seconds = String(seconds).padStart(2,'0')
    milliSeconds= String(milliSeconds).padStart(3,'0')

    display.textContent = `${minutes}:${seconds}:${milliSeconds}`

  }

  function stopTimer() {
    if (isRuning) {
        clearInterval(timer)
        elapsedTime = Date.now - startTime
        isRuning = false
    }
  }

  function resetTimer() {
    clearInterval(timer)
    isRuning = false
    startTime = 0
    elapsedTime = 0 
    display.textContent = '00:00:000'
  }

/////////////////////////////////

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }


