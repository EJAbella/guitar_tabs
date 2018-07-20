// Add in Create Tab option
// Add in Delete Tab option
// Fix double-digit fret entries

let currentTab = 1;

const tabTitle = document.querySelectorAll('#tabTitle')
const tablinks = document.querySelectorAll('.tablinks')
const chordSelector = document.querySelectorAll('#chordSelector')
const chordFingering = document.querySelectorAll('#chordFingering')
const majorMinor = document.querySelectorAll('#majorMinor')
const addToTab = document.querySelectorAll('#addToTab')
const addChord = document.querySelectorAll('#addChord')
const reset = document.querySelectorAll('#reset')
const removeLast = document.querySelectorAll('#removeLast')
const tabs = document.querySelectorAll('#tabs')
const stringSelect = document.querySelectorAll('#stringSelect')
const fret = document.querySelectorAll('#fret')
const save = document.querySelectorAll('#save')
const message = document.querySelectorAll('#message')
const pageTab = document.querySelector('.pageTab')
const createTab = document.querySelector('#createTab')
const mainCont = document.querySelector('#mainCont')

// Toggles active tab
function openTab(evt, tabName) {
  var i,
    tabcontent,
    tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  currentTab = evt.currentTarget.id
}

// Loads up saved tabs[i] from prior session
window.addEventListener('load', () => {
  for (let i = 0; i < tablinks.length; i++) {
    if (localStorage.getItem(`title[${i}]`)) {
      tabTitle[i].innerHTML = localStorage.getItem(`title[${i}]`)
      tablinks[i].innerHTML = localStorage.getItem(`tabTitle[${i}]`)
    }
    if (localStorage.getItem(`tabs[${i}]`)) {
      tabs[i].innerHTML = '<p>' + localStorage.getItem(`tabs[${i}]`) + '</p>'
    }
  }
})

// Updates Tab Titles
for (let i = 0; i < tablinks.length; i++) {
  tabTitle[i].addEventListener('keyup', () => {
    tablinks[i].innerHTML = tabTitle[i].textContent
  })
}

// Updates chord frets when changing the note
for (let i = 0; i < tablinks.length; i++) {
  chordSelector[i].addEventListener('change', () => {
    let chord = chordSelector[i].value
    let majMin = majorMinor[i].value
    console.log('test1')
    axios.get(`http://pargitaru.id.lv/api/?request=chords&chord=${chord}&modf=${majMin}`).then(response => {
      console.log(response)
      let chord = response.data.chords[0]
      chordFingering[i].innerHTML = `<p>e: ${chord.e2}<br>B: ${chord.b}<br>G: ${chord.g}<br>D: ${chord.d}<br>A: ${chord.a}<br>E: ${chord.e}</p>`
    })
  })
}

// Updates the chord frets when toggling between Major and Minor
for (let i = 0; i < tablinks.length; i++) {
  majorMinor[i].addEventListener('change', () => {
    let chord = chordSelector[i].value
    let majMin = majorMinor[i].value
    axios.get(`http://pargitaru.id.lv/api/?request=chords&chord=${chord}&modf=${majMin}`).then(response => {
      let chord = response.data.chords[0]
      chordFingering[i].innerHTML = `<p>e: ${chord.e2}<br>B: ${chord.b}<br>G: ${chord.g}<br>D: ${chord.d}<br>A: ${chord.a}<br>E: ${chord.e}</p>`
    })
  })
}

// Adds current string and fret[i] to tab when clicking 'Add!'
for (let i = 0; i < tablinks.length; i++) {
  addToTab[i].addEventListener('click', () => {
    if (!fret[i].value) {
      tabs[i].innerHTML += `<p> - - <br> - - <br> - - <br> - - <br> - - <br> - - </p>`
    } else if (stringSelect[i].value === 'e') {
      tabs[i].innerHTML += `<p> ${fret[i].value} - <br> - - <br> - - <br> - - <br> - - <br> - - </p>`
    } else if (stringSelect[i].value === 'B') {
      tabs[i].innerHTML += `<p> - - <br> ${fret[i].value} - <br> - - <br> - - <br> - - <br> - - </p>`
    } else if (stringSelect[i].value === 'G') {
      tabs[i].innerHTML += `<p> - - <br> - - <br> ${fret[i].value} - <br> - - <br> - - <br> - - </p>`
    } else if (stringSelect[i].value === 'D') {
      tabs[i].innerHTML += `<p> - - <br> - - <br> - - <br> ${fret[i].value} - <br> - - <br> - - </p>`
    } else if (stringSelect[i].value === 'A') {
      tabs[i].innerHTML += `<p> - - <br> - - <br> - - <br> - - <br> ${fret[i].value} - <br> - - </p>`
    } else if (stringSelect[i].value === 'E') {
      tabs[i].innerHTML += `<p> - - <br> - - <br> - - <br> - - <br> - - <br> ${fret[i].value} - </p>`
    }
  })
}

// Toggles between strings when using their respective keyboard keys
document.addEventListener('keydown', (e) => {
  if (e.key === 'b' || e.key === 'g' || e.key === 'd' || e.key === 'a' || e.key === 'E') {
    stringSelect[currentTab - 1].value = e.key.toUpperCase()
  } else if (e.key === 'e') {
    stringSelect[currentTab - 1].value = e.key
  } else if (e.keyCode === 38 || e.keyCode === 40) {
    stringSelect[currentTab - 1].focus()
  }
})

// Adds current string to tab with a fret[i] of the number pressed on the keyboard
document.addEventListener('keydown', (e) => {
  if (e.keyCode < 58 && e.keyCode > 47 && e.target.isContentEditable === false && e.target.localName !== 'input') {
    if (stringSelect[currentTab - 1].value === 'e') {
      tabs[currentTab - 1].innerHTML += `<p> ${e.key} - <br> - - <br> - - <br> - - <br> - - <br> - - </p>`
    } else if (stringSelect[currentTab - 1].value === 'B') {
      tabs[currentTab - 1].innerHTML += `<p> - - <br> ${e.key} - <br> - - <br> - - <br> - - <br> - - </p>`
    } else if (stringSelect[currentTab - 1].value === 'G') {
      tabs[currentTab - 1].innerHTML += `<p> - - <br> - - <br> ${e.key} - <br> - - <br> - - <br> - - </p>`
    } else if (stringSelect[currentTab - 1].value === 'D') {
      tabs[currentTab - 1].innerHTML += `<p> - - <br> - - <br> - - <br> ${e.key} - <br> - - <br> - - </p>`
    } else if (stringSelect[currentTab - 1].value === 'A') {
      tabs[currentTab - 1].innerHTML += `<p> - - <br> - - <br> - - <br> - - <br> ${e.key} - <br> - - </p>`
    } else if (stringSelect[currentTab - 1].value === 'E') {
      tabs[currentTab - 1].innerHTML += `<p> - - <br> - - <br> - - <br> - - <br> - - <br> ${e.key} - </p>`
    }
  }
})

// Adds current chord to tab when clicking 'Add Current Chord'
for (let i = 0; i < tablinks.length; i++) {
  addChord[i].addEventListener('click', () => {
    let chord = chordSelector[i].value
    let majMin = majorMinor[i].value
    axios.get(`http://pargitaru.id.lv/api/?request=chords&chord=${chord}&modf=${majMin}`).then(response => {
      let chord = response.data.chords[0]
      tabs[i].innerHTML += `<p> ${chord.e2} - <br> ${chord.b} - <br> ${chord.g} - <br> ${chord.d} - <br> ${chord.a} - <br> ${chord.e} - </p>`
    })
  })
}

// Adds current chord to tab when pressing Enter
document.addEventListener('keypress', (e) => {
  if (e.keyCode === 13 && e.target.isContentEditable === false) {
    let chord = chordSelector[currentTab - 1].value
    let majMin = majorMinor[currentTab - 1].value
    axios.get(`http://pargitaru.id.lv/api/?request=chords&chord=${chord}&modf=${majMin}`).then(response => {
      let chord = response.data.chords[0]
      tabs[currentTab - 1].innerHTML += `<p> ${chord.e2} - <br> ${chord.b} - <br> ${chord.g} - <br> ${chord.d} - <br> ${chord.a} - <br> ${chord.e} - </p>`
    })
  }
})

//Removes last tab entry when clicking 'Remove Last Tab'
for (let i = 0; i < tablinks.length; i++) {
  removeLast[i].addEventListener('click', () => {
    tabs[i].removeChild(tabs[i].childNodes[tabs[i].childNodes.length - 1])
  })
}

//Removes last tab entry when pressing Backspace
document.addEventListener('keydown', (e) => {
  if (e.keyCode === 8 && e.target.isContentEditable === false && tabs[currentTab - 1].children.length > 1) {
    tabs[currentTab - 1].removeChild(tabs[currentTab - 1].childNodes[tabs[currentTab - 1].childNodes.length - 1])
  }
})

// Creates a new tab page
// createTab.addEventListener('click', () => {
//   pageTab.innerHTML += `<button class='tablinks' onclick='openTab(event, "tab${tablinks.length+1}")' id='${tablinks.length+1}'>New Tab</button>`
//
//   mainCont.innerHTML += `<div class="tabcontent col-10" id='tab${tablinks.length+1}' style='display: none'>
//     <h2 contenteditable="true" id='tabTitle'>Song Name - Song Artist</h2>
//     <div class="row">
//       <div class="chordBtns col-2">
//         <select class="chordBtn chordSelector" id='chordSelector' name="">
//           <option value="A">A</option>
//           <option value="A%23">A#/Bb</option>
//           <option value="B">B</option>
//           <option value="C">C</option>
//           <option value="C%23">C#/Db</option>
//           <option value="D">D</option>
//           <option value="D%23">D#/Eb</option>
//           <option value="E">E</option>
//           <option value="F">F</option>
//           <option value="F%23">F#/Gb</option>
//           <option value="G">G</option>
//           <option value="G%23">G#/Ab</option>
//         </select>
//         <select class="chordBtn majorMinor" name="" id='majorMinor'>
//           <option value="major">Major</option>
//           <option value="minor">Minor</option>
//         </select>
//         <div id="chordFingering">
//           <p>e: 0<br>B: 2<br>G: 2<br>D: 2<br>A: 0<br>E: x</p>
//         </div>
//       </div>
//       <div class="col-9 instructions">
//         <h5>Tips for Tabs</h5>
//         <ul>
//           <li>Select a chord from the list to the left to get the chord structure. If you would like to add it to your tab, press Enter.</li>
//           <li>Select a string by either pressing the string letter or using the up/down keys. Press a number to enter in that fret for the selected string.</li>
//           <li>You can remove the last entry by pressing the Backspace key.</li>
//         </ul>
//       </div>
//     </div>
//     <p id='message'>placeholder</p>
//
//     <div class="tabCont">
//       <select class="stringSelect" name="" id='stringSelect'>
//         <option value="e">e</option>
//         <option value="B">B</option>
//         <option value="G">G</option>
//         <option value="D">D</option>
//         <option value="A">A</option>
//         <option value="E">E</option>
//       </select>
//       <input class='fret' type="" name="" value="" id='fret'>
//       <button type="button" name="button" id='addToTab'>Add!</button>
//       <button type="button" name="button" id='addChord'>Add Current Chord</button>
//       <button type="button" name="button" id='removeLast'>Remove Last Tab</button>
//       <button type="button" name="button" id='reset'>Reset Tab</button>
//       <button type="button" name="button" id='save'>Save</button>
//       <div class="tabs" id='tabs'>
//         <p>e -<br>B -<br>G -<br>D -<br>A -<br>E -</p>
//       </div>
//     </div>
//   </div>`
// })

//Resets current tab when clicking 'Reset Tab' && prompts for confirmation
for (let i = 0; i < tablinks.length; i++) {
  reset[i].addEventListener('click', () => {
    let conf = confirm('Are you sure you would like to clear your current Tab?')
    if (conf) {
      tabs[i].innerHTML = '<p>e - <br>B - <br>G - <br>D - <br>A - <br>E - </p>'
      tablinks[i].innerHTML = 'New Tab'
      tabTitle[i].innerHTML = 'Song Name - Song Artist'
      localStorage.removeItem(`title[${i}]`)
      localStorage.removeItem(`tabTitle[${i}]`)
      localStorage.removeItem(`tabs[${i}]`)
    }
    reset[i].blur()
  })
}

//Saves the current tab information
for (let i = 0; i < tablinks.length; i++) {
  save[i].addEventListener('click', () => {
    localStorage.setItem(`title[${i}]`, tabTitle[i].innerHTML)
    localStorage.setItem(`tabTitle[${i}]`, tablinks[i].innerHTML)
    localStorage.setItem(`tabs[${i}]`, tabs[i].innerHTML)
    message[i].style.backgroundColor = 'hsl(140, 50%, 50%)'
    message[i].style.animationName = 'fadeIn'
    message[i].style.animationDuration = '3s';
    message[i].textContent = `Tab saved successfully!`
    setTimeout(function() {
      message[i].style.animationName = ''
      message[i].style.animationDuration = '';
    }, 3000)
  })
}
