const tableBody = document.querySelector(".tableBody")

/* Code for getting the data from localstorage */
const StudentDetails = JSON.parse(localStorage.getItem("Student"));

/* This function is used for create a dynamic row and insert into tablebody dynamically. */
function appendRow(data) {
    const Row = document.createElement("tr");
        Row.className = "table-data";
        Row.innerHTML = 
        `<tr class="table-data" >
            <td>${data['id']}</td>
            <td>${data['firstname']}</td>
            <td>${data['lastname']}</td>
            <td>${data['village']}</td>
            <td>${data['age']}</td>
            <td class="update" >
                <p>Update </p> 
                <i class="fa-solid fa-pen-to-square"></i>
            </td>
            <td class="delete">
                <div class="box">
                <p>Delete</p>
                <i class="fa-regular fa-trash-can"></i>
                </div>
            </td>
    </tr>`
        tableBody.appendChild(Row);
}

/* In initaial faze we upload data from localstorage and according to data we create number of row dynamically. */
Object.keys(StudentDetails).forEach((key) =>{
    const data = StudentDetails[key];
    appendRow(data);
})

/** Now we appply search funcanility. */
const searchBox = document.querySelector(".search");

const deleteList = document.querySelectorAll(".delete");
let deleteButtonList = [...deleteList];
deleteRow(deleteButtonList);

const updateList = document.querySelectorAll(".update");
let updateArr = [...updateList];
updateRow(updateArr);

function removeAllRow() {
    const tableDataArr = document.querySelectorAll(".table-data");
    const tableData = [...tableDataArr];
        tableData.forEach( (row) =>{
            row.remove();
            deleteButtonList = [];
            updateArr = [];
            
        })
}

searchBox.addEventListener("input" , () =>{
    
    const StudentDetails = JSON.parse(localStorage.getItem("Student"));
    const stId = Object.keys(StudentDetails);

    removeAllRow();

    stId.forEach((obj) =>{
        if(((StudentDetails[obj]['firstname']).toLowerCase()).includes((searchBox.value).toLowerCase().trim())){
            appendRow(StudentDetails[obj])
            
        }
    })
    
    const deletebtn = document.querySelectorAll(".delete");
    deleteButtonList = [...deletebtn];
    deleteRow(deleteButtonList);

    const update = document.querySelectorAll(".update");
    updateArr = [...update];
    updateRow(updateArr);
    
})


/* Now we apply filter funcanility */
const filterBox = document.querySelector(".filter");
filterBox.addEventListener("change" , () =>{
    const StudentDetails = JSON.parse(localStorage.getItem("Student"));
    const stIdList = Object.keys(StudentDetails);

    const filteredVillageId = stIdList.filter((stId) =>{
        if(StudentDetails[stId]['village'].toLowerCase().includes(filterBox.value.trim().toLowerCase())){
            return true;
        }
    })
    removeAllRow();

    filteredVillageId.forEach((id) => {
        appendRow(StudentDetails[id]);
    })

    const deletebtn = document.querySelectorAll(".delete");
    deleteButtonList = [...deletebtn];
    deleteRow(deleteButtonList);

    const update = document.querySelectorAll(".update");
    updateArr = [...update];
    updateRow(updateArr);
})

/*Here the end of the filter funcnality */

/* This code is only used for handle addData page like visible or hide this page. */
const crossButton = document.querySelector(".cross");
const addPage = document.querySelector(".add-page");
const addSign = document.querySelector(".add");
const updateCross = document.querySelector(".update-cross");
const updatePage = document.querySelector(".update-form-page");

crossButton.addEventListener("click",() =>{
    addPage.classList.remove("show");
})
addSign.addEventListener("click" , () =>{
    addPage.classList.add("show");
})
updateCross.addEventListener("click" ,() =>{
    updatePage.classList.remove("show")
})


/* Now we write code for add student in student List */

const addButton = document.querySelector(".add-button")
const idError = document.querySelector(".id-error")
const firstError = document.querySelector(".first-error")
const lastError = document.querySelector(".last-error")
const villageError = document.querySelector(".village-error")
const ageError = document.querySelector(".age-error")

const Validate = (value , error1 , error2 , errorfield) =>{
    if(value===""){
        errorfield.innerText = error1;
        errorfield.style.color = "red";
        return false;
    }
    else if(value.length <=2){
        errorfield.innerText = error2;
        errorfield.style.color = "red";
        return false;
    }
    else{
        errorfield.innerText = "";
        return true;
    }
}
const ValidateField = {

    idValidate : (id_value) =>{
        if(id_value==""){
            idError.innerText = "Id can't be empty !";
            idError.style.color = "red";
            return false;
        }
        else if(id_value[0]==0){
            idError.innerText = "Id can't be start from Zero !";
            idError.style.color = "red";
            return false;
        }
        else{
            const StudentDetails = JSON.parse(localStorage.getItem("Student"));
            const keys = Object.keys(StudentDetails);
            let flag = true;
            keys.forEach((key) =>{
                console.log(id_value , key)
                if(key==id_value){
                    idError.innerText = "Id already exixts !"
                    idError.style.color = "red";
                    flag = false;
                    return false;
                }
            })
            if(flag){
                idError.innerText = ""
                return true;
            }
        }
    },

    firstnameValidate : (firstname_value , firstError) =>{
        if(Validate(firstname_value ,  "firstname can't be empty!" ,"firstname must be greaterthan 2 letter !" ,firstError)) return true;
        else return false;
    },

    lastnameValidate : (lastname_value , lastError) =>{
        if(Validate(lastname_value ,  "lastname can't be empty!" ,"lastname must be greaterthan 2 letter !" ,lastError)) return true;
        else return false;
    },

    villageValidate : (village_value , villageError) =>{
        if(Validate(village_value ,  "village can't be empty!" ,"village must be greaterthan 2 letter !" ,villageError)) return true;
        else return false;
    },

    ageValidate : (age_value) =>{
        if(age_value >= 18 && age_value <=80){
            ageError.innerText = "";
            return true;
        }
        else{
            ageError.innerText = "Age must be >= 18 and <= 80 years !";
            ageError.style.color = "red";
            return false;
        }
    },

    reset : () =>{
        document.querySelector(".id").value = "";
        document.querySelector(".firstname").value = "";
        document.querySelector(".lastname").value = "";
        document.querySelector(".village").value = "";
        document.querySelector(".age").value = "";
    },

    reset_up : () =>{
        document.querySelector(".f-name").value = "";
        document.querySelector(".l-name").value = "";
        document.querySelector(".v-name").value = "";
        document.querySelector(".a-name").value = "";
    }

}

addButton.addEventListener("click" , () =>{
    const id_value = document.querySelector(".id").value.trim();
    const firstname_value = document.querySelector(".firstname").value.trim();
    const lastname_value = document.querySelector(".lastname").value.trim();
    const village_value = document.querySelector(".village").value.trim();
    const age_value = document.querySelector(".age").value.trim();

    let idflag = ValidateField.idValidate(id_value);
    let firstflag = ValidateField.firstnameValidate(firstname_value , firstError);
    let lastflag = ValidateField.lastnameValidate(lastname_value,lastError);
    let villageflag = ValidateField.villageValidate(village_value,villageError);
    let ageflag = ValidateField.ageValidate(age_value);

    if(idflag && firstflag && lastflag && villageflag && ageflag){
        const student = {
            id : id_value,
            firstname : firstname_value,
            lastname : lastname_value,
            village : village_value,
            age : age_value
        }
    
        StudentDetails[id_value] = student;
        let uploadData = JSON.stringify(StudentDetails)
        localStorage.setItem("Student",uploadData);
    
        appendRow(student);
        addPage.classList.remove("show");
        ValidateField.reset();
    }
})
/* Here End the code of add funcnality */


/** Now we write the code for update the student List */

let update;
function updateRow(updateArr) {
    updateArr.forEach((updateBtn) =>{
        updateBtn.addEventListener("click",() =>{
            update = updateBtn;
            updatePage.classList.add("show");
            console.log("Hii")
            document.querySelector(".f-name").value = updateBtn.parentElement.children[1].innerText;
            document.querySelector(".l-name").value = updateBtn.parentElement.children[2].innerText;
            document.querySelector(".v-name").value = updateBtn.parentElement.children[3].innerText;
            document.querySelector(".a-name").value = updateBtn.parentElement.children[4].innerText;
        })
    })
}


const fError = document.querySelector(".f-error")
const lError = document.querySelector(".l-error")
const vError = document.querySelector(".v-error")
const aError = document.querySelector(".a-error")
const updateButton = document.querySelector(".update-button");

function ageValidate(age_value){
    if(age_value === ""){
        aError.innerText = "Please Enter Age !";
        return false;
    }
    else if(age_value <= 80 && age_value >= 18){
        aError.innerText = ""
        return true;
    }
    else{
        aError.innerText = "Age must be between 18 and 80 years !"
        return false;
    }
}

updateButton.addEventListener("click" , () => {
    const firstname_value = document.querySelector(".f-name").value.trim();
    const lastname_value = document.querySelector(".l-name").value.trim();
    const village_value = document.querySelector(".v-name").value.trim();
    const age_value = document.querySelector(".a-name").value.trim();

    let firstflag = ValidateField.firstnameValidate(firstname_value , fError);
    let lastflag = ValidateField.lastnameValidate(lastname_value,lError);
    let villageflag = ValidateField.villageValidate(village_value,vError);
    let ageflag = ageValidate(age_value);
    console.log(firstflag , lastflag ,villageflag , ageflag)
    if(firstflag && lastflag && villageflag && ageflag){
        // console.log(update)
        id_value = update.parentElement.children[0].innerText;
        update.parentElement.children[1].innerText = firstname_value;
        update.parentElement.children[2].innerText = lastname_value;
        update.parentElement.children[3].innerText = village_value;
        update.parentElement.children[4].innerText = age_value;

        student = JSON.parse(localStorage.getItem("Student"));

        const st = {
            id : id_value,
            firstname : firstname_value,
            lastname : lastname_value,
            village : village_value,
            age : age_value
        }
        student[id_value] = st;
        localStorage.setItem("Student" , JSON.stringify(student));
        ValidateField.reset_up();
        updatePage.classList.remove("show");

    }

})

/** Here end the implement of funcanility of update */


/* Now we apply delete funcnality on our page  */

function deleteRow(deleteButtonList) {
    deleteButtonList.forEach((deleteButton) =>{
        deleteButton.addEventListener("click" , () =>{
            
            const deletedRow = deleteButton.parentElement;
            const deleteRowId = deleteButton.parentElement.children[0].innerText;
            console.log(deleteRowId);
            tableBody.removeChild(deletedRow);
            student = JSON.parse(localStorage.getItem("Student"));
            student[deleteRowId] = undefined;
            localStorage.setItem("Student" , JSON.stringify(student));

        })
    })
}

/** Here end the apply on delete funcanality.*/



