const getOrderForm = async () => {
  try {
    const response = await fetch('/api/checkout/pub/orderForm', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orderForm:', error);
    return null;
  }
};

const getFirstProductId = (orderForm) => {
  if (!orderForm || !orderForm.items || orderForm.items.length === 0) {
    console.error('No hay productos en el orderForm');
    return null;
  }

  const firstProductId = orderForm.items[0].productId;
  return firstProductId;
};

const getCrossSelling = async () => {
  console.log("entre a getCrossSelling");
  try {
    const orderForm = await getOrderForm();
    if (!orderForm) {
      console.error('No se pudo obtener el orderForm');
      return;
    }

    const firstProductId = getFirstProductId(orderForm);
    if (!firstProductId) {
      console.error('No se pudo obtener el ID del primer producto');
      return;
    }

    const response = await fetch(`/api/catalog_system/pub/products/crossselling/whosawalsosaw/${firstProductId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Error al obtener productos recomendados:', response.status, response.statusText);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo productos recomendados:', error);
  }
};

const renderProduct = (product, orderFormId) => {
  const productImage = product.items[0].images[0].imageUrl;
  const productName = product.productName;
  const productPrice = product.items[0].sellers[0].commertialOffer.Price;
  const productListPrice = product.items[0].sellers[0].commertialOffer.ListPrice;
  const skuId = product.items[0].itemId;
  const sellerId = product.items[0].sellers[0].sellerId;

  const productContainer = document.createElement("div");
  productContainer.className = "recommended-product";

  productContainer.innerHTML = `
    <div class="product-recommended">
      <h2 class="product-recommended-title">Recomendado para vos</h2>
      <img src="${productImage}" alt="${productName}" class="product-recommended-image" />
      <h3 class="product-recommended-name">${productName}</h3>
      <div class="product-recommended-price">
          <p class="product-recommended-price-final">$${productPrice.toFixed(2)}</p>
          <p class="product-recommended-list-price">$${productListPrice.toFixed(2)}</p>
      </div>
      <button class="add-to-cart-button-product-recommended" data-sku-id="${skuId}" data-seller-id="${sellerId}" data-order-form-id="${orderFormId}">Agregar al carrito</button>
    </div>
  `;

  const container = document.querySelector(".summary-template-holder");
  if (container) {
    container.appendChild(productContainer);
  } else {
    return
  }
};

const addToCart = async (orderFormId, skuId, sellerId) => {
  try {
    const response = await fetch(`/api/checkout/pub/orderForm/${orderFormId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderItems: [
          {
            quantity: 1,
            seller: sellerId,
            id: skuId,
            index: 0
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error('Error al agregar el producto al carrito:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Respuesta del servidor:', errorText);
      return;
    }

    const data = await response.json();
    window.location.reload();
  } catch (error) {
    console.error('Error al intentar agregar el producto al carrito:', error);
  }
};

const init = async () => {
  const orderForm = await getOrderForm();
  const recommendedProducts = await getCrossSelling();

  if (recommendedProducts && recommendedProducts.length > 0) {
    renderProduct(recommendedProducts[1], orderForm.orderFormId);

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("add-to-cart-button-product-recommended")) {
        const skuId = event.target.getAttribute("data-sku-id");
        const sellerId = event.target.getAttribute("data-seller-id");
        const orderFormId = event.target.getAttribute("data-order-form-id");
        addToCart(orderFormId, skuId, sellerId);
      }
    });
  } else {
    console.error("No se encontraron productos recomendados");
  }
};

document.addEventListener("DOMContentLoaded", init);