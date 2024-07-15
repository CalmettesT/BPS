let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

/*NAVBAR TELEPHONE*/
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open')
}

/*Affichage Tableau*/
function afficherTarifs() {
    const tableauTarifs = document.querySelector(".container-tableau");
    tableauTarifs.classList.toggle("show");
  }

/*NOMBRE DE STERES et total*/
const inputs = document.querySelectorAll('.nb-steres');

function calculateTotal(input) {
    const row = input.closest('tr');
    const price = parseInt(row.querySelector('td:nth-child(2)').textContent.slice(0, -1), 10);
    const livraison = parseInt(row.querySelector('.tarif-livraison').textContent.slice(0, -1), 10) || 0;
    row.querySelector('.total').textContent = ((price * input.value) + livraison) + '€';
}

inputs.forEach(input => {
    input.addEventListener('input', e => {
        calculateTotal(e.target);
    });
});

/*Prix Livraison*/

// Récupération de la liste des tarifs de livraison
const tarifs = document.querySelectorAll(".tarif-livraison");

// Récupération du sélecteur
const select = document.querySelector("#region-select");

// Ajout de l'événement "change" au sélecteur
select.addEventListener("change", function() {
  // Récupération de la valeur sélectionnée
  const selectedValue = select.value;

  // Boucle sur tous les tarifs de livraison
  tarifs.forEach(tarif => {
    // Mise à jour du tarif de livraison en fonction de la valeur sélectionnée
    switch (selectedValue) {
      case "Sur Place":
        tarif.textContent = "0€";
        break;
      case "Pau":
        tarif.textContent = "10€";
        break;
      case "Tarbes":
        tarif.textContent = "15€";
        break;
      case "Lourdes":
        tarif.textContent = "20€";
        break;
      default:
        tarif.textContent = "0€";
    }
    const row = tarif.closest('tr');
    const input = row.querySelector('.nb-steres');
    calculateTotal(input);
  });
});





document.querySelectorAll('.quantity-increase').forEach(btn => {
  btn.addEventListener('click', function() {
      let quantityInput = this.parentElement.querySelector('.quantity-input');
      quantityInput.value = parseInt(quantityInput.value) + 1;
      updateTotal();
  });
});

document.querySelectorAll('.quantity-decrease').forEach(btn => {
  btn.addEventListener('click', function() {
      let quantityInput = this.parentElement.querySelector('.quantity-input');
      if (parseInt(quantityInput.value) > 0) {
          quantityInput.value = parseInt(quantityInput.value) - 1;
          updateTotal();
      }
  });
});

document.querySelector('#delivery-select').addEventListener('change', function() {
  let deliveryPrice = this.value;
  document.querySelector('.delivery-price span').textContent = deliveryPrice + '€';
  updateTotal();
});

function updateTotal() {
  let totalQuantity = 0;
  let totalPrice = 0;

  document.querySelectorAll('.quantity-input').forEach(input => {
      let quantity = parseInt(input.value);
      totalQuantity += quantity;

      let pricePerStere = parseInt(input.parentElement.previousElementSibling.textContent.split('- ')[1].slice(0, -7));
      totalPrice += pricePerStere * quantity;
  });

  let deliveryPrice = parseInt(document.querySelector('.delivery-price span').textContent.slice(0, -1));
  totalPrice += deliveryPrice;

  document.querySelector('.total-price span').textContent = totalPrice + '€';
}
