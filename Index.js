var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var DBName = "STU-DB";
var RelationName = "StuData";
var connToken = "90938208|-31949273252441139|90954927";

$("#Sturoll").focus();

function saveRec2LS(jsonOBj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getSturollAsJsonObj() {
    var Sturoll = $("#Sturoll").val();
    var jsonStr = {
        id: Sturoll
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRec2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#StuName").val(record.name);
    $("#StuClass").val(record.Class);
    $("#StuDOB").val(record.DOB);
    $("#StuAddress").val(record.Address);
    $("#EnrollDate").val(record.EnrollDate);
}

function resetForm() {
    $("#StuRoll").val("");
    $("#StuName").val("");
    $("#StuClass").val("");
    $("#StuDOB").val("");
    $("#StuAddress").val("");
    $("#EnrollDate").val("");
    $("#StuRoll").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#StuRoll").focus();
}

function validateData() {
    var StuRoll, StuName, StuClass, StuDOB, StuAddress, EnrollDate;
    StuRoll = $("#StuRoll").val();
    StuName = $("#StuName").val();
    StuClass = $("#StuClass").val();
    StuDOB = $("#StuDOB").val();
    StuAddress = $("#StuAddress").val();
    EnrollDate = $("#EnrollDate").val();

    if (StuRoll === "") {
        alert("Student Roll Number Missing");
        $("#StuRoll").focus();
        return "";
    }
    if (StuName === "") {
        alert("Student Name Missing");
        $("#StuName").focus();
        return "";
    }
    if (StuClass === "") {
        alert("Student Class Missing");
        $("#StuClass").focus();
        return "";
    }
    if (StuDOB === "") {
        alert("Student Birth date Missing");
        $("#StuDOB").focus();
        return "";
    }
    if (StuAddress === "") {
        alert("Student Address Missing");
        $("#StuAddress").focus();
        return "";
    }
    if (EnrollDate === "") {
        alert("Enrollment Date Missing");
        $("#EnrollDate").focus();
        return "";
    }

    var jsonStrObj = {
        id: StuRoll,
        name: StuName,
        Class: StuClass,
        DOB: StuDOB,
        Address: StuAddress,
        EnrollDate: EnrollDate
    };
    return JSON.stringify(jsonStrObj);
}

function getStu() {
    var StuRollJsonObj = getSturollAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, DBName, RelationName, StuRollJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#StuName").focus();

    } else if (resJsonObj.status === 200) {
        $("#StuRoll").prop("disabled", true);
        fillData(resJsonObj);

        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#StuName").focus();
    }
}

function saveData(){
    var jsonStrObj = validateData();
    if (jsonStrObj === ""){
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, DBName, RelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#StuRoll").focus();
}

function changeData(){
    $("#change").prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, DBName, RelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#StuRoll").focus();
}
