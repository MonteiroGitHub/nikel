const myModal = new bootstrap.Modal("#register-modal");//CONST mudar o valor//
let logged = sessionStorage.getItem("logged"); // LET pode mudar o valor//
const session = localStorage.getItem("session"); //CONST mudar o valor//

checkLogged();

//logar no sisema//
document.getElementById("login-form").addEventListener("submit",    function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account)    {
        alert("Opps! Verifique o usuário ou a senha.");
        return;
    }
    if(account)     {
        if(account.password !== password){
            alert("Opps! Verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }
});

//criar conta//
document.getElementById("creat-form").addEventListener("submit",function(e)   {
    e.preventDefault();

    const email = document.getElementById("email-creat-input").value;
    const password = document.getElementById("password-creat-input").value;

    if(email.length < 7)    {
        alert("Insira um e-mail válido");
        return;
    }

    if(password.length < 4)     {
        alert("Insira uma senha válida com pelo menos 4 digitos");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso")

});

//Checar se ja esta logado//

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);
        window.location.href = "home.html"
    }
}

//Salvar a conta//

function saveAccount(data)  {
    localStorage.setItem(data.login, JSON.stringify(data) )
}

function saveSession(data, saveSession)     {
    if(saveSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

//Salvar a conta em uma chave, no caso, o email//

function getAccount(key)    {
    const account = localStorage.getItem(key)

    if(account){
        return JSON.parse(account);
    }

    return"";
}

