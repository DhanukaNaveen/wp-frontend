// src/components/GalleryPaginator.jsx
export default function GalleryPaginator({
  currentPage,
  totalPages,
  setCurrentPage,
  limit,
  setLimit,
  setLoading
}) {
  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-700">
      {/* Page Selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="page" className="font-medium">Page:</label>
        <select
          id="page"
          value={currentPage}
          onChange={(e) => {
            setLoading(true);
            setCurrentPage(parseInt(e.target.value));
          }}
          className="border border-gray-300 rounded-md px-3 py-1"
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <span className="text-gray-500">of {totalPages}</span>
      </div>

      {/* Limit Selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="limit" className="font-medium">Photos per page:</label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => {
            setLoading(true);
            setLimit(parseInt(e.target.value));
          }}
          className="border border-gray-300 rounded-md px-3 py-1"
        >
          <option value={6}>6</option>
          <option value={9}>9</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
        </select>
      </div>
    </div>
  );
}