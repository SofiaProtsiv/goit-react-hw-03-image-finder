export default function ErrorMessage({ message }) {
  return (
    <div role="alert">
      <p className="errorMessage">{message}</p>
    </div>
  );
}
