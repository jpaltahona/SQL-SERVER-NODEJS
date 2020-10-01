const API = "http://localhost:3000"
async function getOrdesNumbers(){
   const data = await fetch(`${API}/api/v1/order/number`);
   const result = await data.json();
   return result
};
async function getUsers(){
    const data = await fetch(`${API}/api/v1/user/list`);
    const result = await data.json();
    return result
};

async function totals(){
    const info = await getOrdesNumbers();
    $("#state1").text(`Pagadas: ${info.statusOne}`);
    $("#state2").text(`Anuladas: ${info.statusTwo}`)
    $("#total").text(`Total: ${info.total}`)
}
function loginActions(){
    const user = $("#user").val();
    const pass = $("#pss").val();
    console.log(user,pass );
}
async function getUsers(){
    const data = await fetch(`${API}/api/v1/user/list`);
    const result = await data.json();
    return result
}

async function comprarAction(id,name,img, precio){
    const dataUsers = await getUsers()

    $(`<div class="popform">
            <div class="popConten">
                <button class="closeModal">x</button>
                <h1>formulario</h1>
                <div class="row">
                    <div class="col-sm-6">
                        <img src="${img}" width="100%"/>
                    </div>
                    <div class="col-sm-6">
                        <h5>${name}</h5>
                        <h6>Precio: ${precio}</h6>
                        <label>Cantidad</label>
                        <select class="form-control form-control-lg" id="cantidad">
                            <option value"1">1</option>
                            <option value"2">2</option>
                            <option value"3">3</option>
                            <option value"4">4</option>
                            <option value"5">5</option>
                        </select>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <label class="w-100">Cliente</label>
                    <select class="form-control form-control-lg" id="selectUsers">
                    <option selected value="0">Selecciona una opcion</option>
                    </select>
                </div>
                <div class="input-group mb-3">
                    <label class="w-100">Vendedor</label>
                    <select class="form-control form-control-lg" id="selecSellers">
                        <option selected value="0">Selecciona una opcion</option>
                    </select>
                </div>
                <button class="btn btn-primary w-100" id="comprar">COMPRAR</button>
            </div>
        </div> `
    ).appendTo("body");
    await dataUsers.users.map( i => {
        $("#selectUsers").append( `<option value="${i.ID}">${i.NAME} ${i.APELLIDO}</option>` )
    });

    await dataUsers.sellers.map( i => {
        $("#selecSellers").append( `<option value="${i.ID}">${i.NAME} ${i.APELLIDO}</option>` )
    });


    $(".closeModal").click( () => $(".popform").remove() );
    $("#comprar").click(() => {
        let sellers = $("#selecSellers").val();
        let user=  $("#selectUsers").val();
        let cantidad = $("#cantidad").val();
        let producID = id;

        let obj = {
            "user": user,
            "seller": sellers,
            "product": {
                "id": producID,
                "quantity": cantidad,
                "valor": precio
            },
            "fecha": new Date(),
            "state": "1"
        }

        fetch(`${API}/api/v1/order/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then( data =>  data.json() )
        .then( data => {
           
            window.location.href = "http://localhost:3000/welcome";
        } ).catch (err => {
            console.log("errrr"),
            alert("Error al generar la orden")
        });
    });
}
$("#login-action").click( () => loginActions() );

$(document).ready( async function() {
    await totals();
});
if( window.location.href == "http://localhost:3000/store" ){
    $(".dashboar").removeClass("active");
    $(".comprar").addClass("active");
}

