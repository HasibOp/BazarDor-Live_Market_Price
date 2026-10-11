"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
      <div className="text-7xl">⚠️</div>
      <h1 className="mt-4 text-2xl font-bold text-gray-800">কিছু একটা সমস্যা হয়েছে</h1>
      <p className="mt-2 text-gray-600">ডেটা লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।</p>
      <button onClick={() => reset()} className="btn btn-primary mt-6">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
