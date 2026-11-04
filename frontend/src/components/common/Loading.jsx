// Announce asynchronous loading state to customers and screen readers.
function Loading({ message = 'Loading...' }) {
  return (
    <p className="status-message" role="status">
      {message}
    </p>
  );
}

export default Loading;
