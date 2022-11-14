export default function Footer() {
  return (
    <div className="flex flex-col w-full items-center justify-center text-sm py-10 text-gray-400">
      <p>Built by Adam Richardson</p>
      <p>All Rights Reserved {new Date().getFullYear()}</p>
    </div>
  );
}
