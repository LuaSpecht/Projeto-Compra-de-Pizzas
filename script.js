const q = (el) => document.querySelector(el);
const qs= (el) => document.querySelectorAll(el);
let modalQt = 1;



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
    
});
q('.pizzaInfo--qtmenos').addEventListener('click', () => {

});