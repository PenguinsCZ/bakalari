let alldata = []

fetch("http://localhost:8080")
    .then((response) => response.json())
    .then((data) => {
        alldata = data
        alldata.forEach(
            arr => arr.forEach(
                subj => subj.add = true
            )
        )
    })


//when user changes the chosen teacher
function submit(val) {
    document.querySelectorAll("td").forEach(item => item.innerHTML = "")
    teacherdata = []

    //fill teacherdata with only relevant subjects to the teacher
    alldata.forEach(
        (arr) => {
            classdata = arr.filter(
                subj => subj.teacher == val
            )
            if (classdata.length != 0) {
                classdata.forEach(item => teacherdata.push(item))
            }
        }
    )
    temporarydata = []
    teacherdata.forEach(
        subj => {
            temporarydata.forEach(subjtwo => {
                if (subjtwo.day === subj.day && subjtwo.lessonnumber === subj.lessonnumber && subjtwo.add) {
                    subj.classname = `${subj.classname}, ${subjtwo.classname}`
                    subjtwo.add = false
                }

            })
            temporarydata.push(subj)

        }
    )
    
    //output the data in the timetable
    teacherdata.forEach(
        item => {
            document.getElementById(`${item.day}${item.lessonnumber}`).innerHTML = `<div class="name">${item.name} </div> 
             <div class="class">${item.classname}</div> 
             <div class="room">${item.room}</div>
             <div class="teacher"> ${item.teacher} </div>
             `
        }
    )
}


