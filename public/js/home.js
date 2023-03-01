const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions:   []
};

//Quando clicar no botão "sair" efetuar o logout//
document.getElementById("button-logout").addEventListener("click", logout)

//Quando clicar no botão "ver mais" enviar o usuário para o transactions.html//
document.getElementById("transactions-button").addEventListener("click", function(){
    
    window.location.href = "transactions.html"
})

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

    getCashIn();
    getCashOut();
    getTotal();
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

    getCashIn();
    getCashOut();
    getTotal();
}

//Função para deslogar e mandar pra pagina inicial//

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}
//uma função para o dinheiro que ENTRA//
function getCashIn(){
    const transactions = data.transactions;
//pegar tudo que tem na transação e filtrar por item, o item é do type e eu só quero o 1, isso será o cashIn//
    const cashIn = transactions.filter((item) => item.type === "1");

    if(cashIn.length){
        let cashInHtml = ``;
        let limit = 0;

        if(cashIn.length > 5){
            limit = 5;
        }   else{
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml +=`
            <div class="row mb-4">
                          <div class="col-12">
                            <h3 class="fs-2"> ${cashIn[index].value.toFixed(2)}</h3>
                            <div class="container p-0">
                              <div class="row">
                                <div class="col-12 col-md-8">
                                  <p>${cashIn[index].description}</p>
                                </div>
                                <div  class="col-12 col-md-3 d-flex justify-content-end">
                                  ${cashIn[index].date}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>            
            `            
        }
//dentro desse elemento do html colocar o cashInHtml//
        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    } 
}


//uma função para o dinheiro que SAI//
function getCashOut(){
    const transactions = data.transactions;
//pegar tudo que tem na transação e filtrar por item, o item é do type e eu só quero o 2, isso será o cashOut//
    const cashIn = transactions.filter((item) => item.type === "2");

    if(cashIn.length){
        let cashInHtml = ``;
        let limit = 0;

        if(cashIn.length > 5){
            limit = 5;
        }   else{
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml +=`
            <div class="row mb-4">
                          <div class="col-12">
                            <h3 class="fs-2"> ${cashIn[index].value.toFixed(2)}</h3>
                            <div class="container p-0">
                              <div class="row">
                                <div class="col-12 col-md-8">
                                  <p>${cashIn[index].description}</p>
                                </div>
                                <div  class="col-12 col-md-3 d-flex justify-content-end">
                                  ${cashIn[index].date}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>            
            `            
        }
//dentro desse elemento do html colocar o cashInHtml//
        document.getElementById("cash-out-list").innerHTML = cashInHtml;
    } 
}

//uma função para o dinheiro TOTAL//
function getTotal() {
    const transactions = data.transactions;
    let total = 0;

//se a transação for 1 soma ao total, se não, subtrai//
        transactions.forEach((item) => {
        if(item.type === "1"){
            total += item.value;
        } 
        else {
            total -= item.value;
        }
    });
    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}



//função para salvar os valore, tipos, descrições e datas//    
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data))
}










//.push sempre vai adicionar as informações no final da lista já o .unshift por sua vez vai colocar no começo//