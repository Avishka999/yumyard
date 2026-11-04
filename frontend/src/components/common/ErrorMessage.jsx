// Render an accessible error only when a request or validation failed.
function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <p className="status-message status-message--error" role="alert">
      {message}
    </p>
  );
}

export default ErrorMessage;
