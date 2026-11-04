// Calculate and display the cart subtotal, delivery fee, and total.
function CartSummary({ items }) {
  const total = items.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0);

  return (
    <section className="cart-summary">
      <h2>Cart summary</h2>
      <p>{items.length} item(s)</p>
      <strong>Total: {total.toFixed(2)}</strong>
    </section>
  );
}

export default CartSummary;
