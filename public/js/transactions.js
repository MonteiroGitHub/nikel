const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions:   []
};

//Quando clicar no botão "sair" efetuar o logout//
document.getElementById("button-logout").addEventListener("click", logout)

//Adcionar um lançamento//
//pegar um documento do elemento transaction- form e add um evento (submit), criar a função de um evento (e) ai pegamos o evento (e) e colocamos ele preso nessa pagina pra ele n ser enviado pra outra pagina ou aplicação.//
document.getElementById("transaction-form").addEventListener("submit", function(e){
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
//para pegar o documento checkado que esta no input de nome = type-input e eu quero pegar o checked e disso o valor//
    const type = document.querySelector('input[name="type-input"]:checked').value;

//função para pegar os valore, tipos, descrições e datas//
    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();//limpar o form//
    myModal.hide();//fecha a modal//

    getTrasactions();//atualizar a lista//

    alert("Lançamento adicionado com sucesso");

})

//Checar se esta logado//
checkLogged() ;

function checkLogged(){
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged){
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser){
        data = JSON.parse(dataUser);
    }

    getTrasactions();

}





//Função para deslogar e mandar pra pagina inicial//
function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTrasactions(){
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length){
        transactions.forEach((item)=>{
           
            let type = "Entrada";
           
            if(item.type === "2")    {
                type = "Saída"
           } 
           transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
           `
        })
    }
    document.getElementById("trasactions-list").innerHTML = transactionsHtml;
}


//função para salvar os valore, tipos, descrições e datas//    
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data))
}
