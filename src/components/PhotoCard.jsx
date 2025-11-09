export default function PhotoCard({ photo }) {
  return (
    <div className="group relative w-full h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <img
        src={photo.imageUrl}
        alt={photo.title}
        className="w-full h-full object-cover transform group-hover:scale-107 transition duration-300"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
        <h3 className="text-md font-semibold">{photo.title}</h3>
        <p className="text-sm text-gray-200">{photo.description}</p>
      </div>
    </div>
  );
}