let cart = [];
let modalQt = 1;
let modalKey = 0;

const q = (el) => document.querySelector(el);
const qs= (el) => document.querySelectorAll(el);



//Listagem das pizzas
pizzaJson.map((pizza, index) => {
   let pizzaItem = q('.models .pizza-item').cloneNode(true); //Este código copia não o item, mas tudo o que há dentro dele

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = pizza.img;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description;

    
    //Para abrir o Modal
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault(); //Este código tira a ação padrão do botão
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 0;
        modalKey = key;

        q('.pizzaBig img').src = pizzaJson[key].img;
        q('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        q('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        q('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        q('.pizzaInfo--size.selected').classList.remove('selected');
        qs('.pizzaInfo--size').forEach( (size, sizeIndex) => {
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

        });

        q('.pizzaInfo--qt').innerHTML = modalQt;

        q('.pizzaWindowArea').style.opacity = 0;
        q('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            q('.pizzaWindowArea').style.opacity = 1;
        },300)
    })

    q('.pizza-area').append( pizzaItem ); // append ao contrario do innerHTML não substitui o que está no código, mas sim, adiciona.



});

//Eventos do Modal

 function closeModal() {
     q('.pizzaWindowArea').style.opacity = 0;
      setTimeout(() => {
        q('.pizzaWindowArea').style.display = 'none';
        },500);
    }
qs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((pizza=>{
    pizza.addEventListener('click', closeModal);
}));

q('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    q('.pizzaInfo--qt').innerHTML = modalQt;
});
q('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 1) {
        modalQt--;
    q('.pizzaInfo--qt').innerHTML = modalQt;
    }
});

qs('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        q('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
});

//Carrinho de compras

q('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(q('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey].id + '@' + size;

    let key = cart.findIndex((pizza) => pizza.identifier == identifier);

    if (key > -1) {

        cart[key].qt += modalQt;

    } else{
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt
        });
    }
    
    updateCart();
    closeModal();
});

q('.menu-oppener').addEventListener('click', () => {
    if(cart.length > 0){
        q('aside').style.left = '0';
    }
});

q('menu-closer').addEventListener('click', () => {
    cart('aside').style.left = '100vw';
})


function updateCart() {

        q('.menu-oppener span').innerHTML = cart.length;


        if(cart.length > 0) {
            q('aside').classList.add('show');
            q('.cart').innerHTML = '';

            let subtotal = 0;
            let desconto = 0;
            let total = 0;

            for(let i in cart) {
                let pizzaItem = pizzaJson.find((pizza) => pizza.id == cart[i].id);
                subtotal += pizzaItem.price * cart[i].qt;


                let cartItem = q('.models .cart--item').cloneNode(true);

                let pizzaSizeName;
                switch(cart[i].size) {
                    case 0:
                        pizzaSizeName = 'P';
                        break;
                    case 1:
                        pizzaSizeName = 'M';
                        break;
                    case 2:
                        pizzaSizeName = 'G';
                        break;
                }
                let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

                cartItem.querySelector('img').src = pizzaItem.img;
                cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
                cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
                cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                    cart[i].qt++;
                    updateCart();
                })
                cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                    if(cart[i].qt > 1){
                        cart[i].qt--;
                    } else{
                        cart.splice(i, 1);
                    }
                    updateCart();
                })
                
                q('.cart').append(cartItem);
            }

            desconto = subtotal * 0.1;
            total = subtotal - desconto;


            q('#subtotal').innerHTML = `R$ ${subtotal.toFixed(2)}`;
            q('#desconto').innerHTML = `R$ ${desconto.toFixed(2)}`;
            q('#total').innerHTML = `R$ ${total.toFixed(2)}`;

           

        }else{
            q('aside').classList.remove('show');
            q('aside').style.left = '100vw';

        }
   }
