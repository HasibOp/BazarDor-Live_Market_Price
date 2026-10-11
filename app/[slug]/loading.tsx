import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="skeleton h-14 w-14"></div>
        <div>
          <div className="skeleton h-8 w-40"></div>
          <div className="skeleton mt-2 h-4 w-56"></div>
        </div>
      </div>
      <div className="skeleton mb-4 h-10 w-full sm:w-72"></div>
      <ProductSkeleton count={4} />
    </div>
  );
}
