export default function Footer() {
  return (
    <div className="flex flex-col w-full items-center justify-center text-sm h-32 text-gray-400">
      <p>Built by Adam Richardson</p>
      <p>All Rights Reserved {new Date().getFullYear()}</p>
    </div>
  );
}
