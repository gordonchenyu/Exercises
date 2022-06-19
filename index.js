 // Yuhong Chen
 //5 May 2022
 //The purpose of program is for gaming on real engine

 console.log("Connection successful!");

 document.getElementById("btn-login").addEventListener("click", () => {
     let loginInfo = {
         username: document.getElementById("username-login").value,
         password: document.getElementById("password-login").value
     };
     if ((!loginInfo.username) || (!loginInfo.password))
     {
         alert("Username and/or password can't be blank.");
     }
     else
     {
        let loginInfoToString = JSON.stringify(loginInfo);
        let options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: loginInfoToString
        };
        fetch("/login", options)
        .then(response => response.json())
        .then(json => alert(json.result));
     }
     document.getElementById("username-login").value = "";
     document.getElementById("password-login").value = "";
});

 document.getElementById("btn-register").addEventListener("click", () => {
    let registerInfo = {
        username: document.getElementById("username-register").value,
        password: document.getElementById("password-register").value
    };
    if ((!registerInfo.username) || (!registerInfo.password))
    {
        alert("Username and/or password can't be blank.");
    }
    else
    {
       let registerInfoToString = JSON.stringify(registerInfo);
       let options = {
           method: "POST",
           headers: {"Content-Type": "application/json"},
           body: registerInfoToString
       };
       fetch("/register", options)
       .then(response => response.json())
       .then(json => alert(json.result));
    }
    document.getElementById("username-register").value = "";
    document.getElementById("password-register").value = "";
});

document.getElementById("btn-generate-password").addEventListener("click", () => {
    let passwordInclusion = {
        length: document.getElementById("password-length").value,
        numbers: document.getElementById("include-numbers").checked,
        symbols: document.getElementById("include-symbols").checked,
        lowercase: document.getElementById("include-lower").checked,
        uppercase: document.getElementById("include-uppercase").checked
    };
    let passwordInclusionToString = JSON.stringify(passwordInclusion);
    let options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: passwordInclusionToString
    };
    fetch("/generate-password", options)
    .then(response => response.json())
    .then(json => {document.getElementById("password-register").value = json.password});
});

document.getElementById("btn-view-accounts").addEventListener("click", () => {
    fetch("/users")
    .then(response => response.json())
    .then(json => {
        document.getElementById("user-info").innerHTML = null;
        document.getElementById("file-download-link").innerHTML = null;
        for (let user of json)
        {
            document.getElementById("user-info").innerHTML 
            += `<p>Username: "${user.username}" Password: "${user.password}"</p>`;
        }
    });
});

document.getElementById("btn-exit").addEventListener("click", () => {
    let confirmation = confirm("Are you sure to exit?");
    if (confirmation)
    {
        fetch("/exit")
        .then(response => response.json())
        .then(json => alert(json.message));
        setTimeout("location.reload(true);", 2100); 
    };
});