export default function Hamburger({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle menu"
      className="flex flex-col justify-center items-center w-8 h-8 gap-1 p-1 focus:outline-none"
    >
      <span className="block w-6 h-0.5 bg-black rounded"></span>
      <span className="block w-6 h-0.5 bg-black rounded"></span>
      <span className="block w-6 h-0.5 bg-black rounded"></span>
    </button>
  );
}