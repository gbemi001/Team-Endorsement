import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsement-list-bf12a-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

let publishBtn = document.getElementById('publish-btn')
let textAreaEl = document.getElementById('text-area')
let endorsementItems = document.getElementById('endorsement-list')

publishBtn.addEventListener(
    'click', function() {
        let textAreaValue =  textAreaEl.value
        push(endorsementsInDB, textAreaValue)
        clearTextArea()
    }
)

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementsArray = Object.values(snapshot.val())

        clearEndorsementItemsList()
        
        for (let i = 0; i < endorsementsArray.length; i++){
        addEndorsement(endorsementsArray[i])
        }
    } else
        {
            endorsementItems.innerHTML = "No endorsements yet.."
        }
    
})

function addEndorsement(endorsementValue) {
    let newEl = document.createElement('p')
    newEl.textContent = endorsementValue
    endorsementItems.append(newEl)
    
}

function clearEndorsementItemsList() {
    endorsementItems.innerHTML = ''
}

function clearTextArea() {
    textAreaEl.value = ''
}