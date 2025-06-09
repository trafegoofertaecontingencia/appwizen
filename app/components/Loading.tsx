export default function Loading() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* Anel giratório */}
        <div className="absolute w-full h-full border-4 border-t-[#c8fe04] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
        
        {/* Texto central */}
        <span className="text-zinc-700 text-xl font-bold">Wizen</span>
      </div>
    </div>
  );
}
