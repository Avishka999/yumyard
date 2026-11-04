// Reusable button that keeps shared interaction styling consistent.
function Button({ children, type = 'button', disabled = false, ...props }) {
  return (
    <button className="button" type={type} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

export default Button;
