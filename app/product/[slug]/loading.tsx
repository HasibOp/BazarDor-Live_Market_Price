export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="skeleton h-5 w-64"></div>
      <div className="skeleton h-44 w-full"></div>
      <div className="grid grid-cols-3 gap-3">
        <div className="skeleton h-20"></div>
        <div className="skeleton h-20"></div>
        <div className="skeleton h-20"></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="skeleton h-32"></div>
        <div className="skeleton h-32"></div>
        <div className="skeleton h-32"></div>
      </div>
      <div className="skeleton h-80 w-full"></div>
    </div>
  );
}
