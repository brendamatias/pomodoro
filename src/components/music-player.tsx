import lofi from "@/assets/sounds/lofi.mp3";

const MusicPlayer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full px-4 py-2 shadow-md flex items-center gap-4">
      <audio src={lofi} controls className="w-full h-8" />
    </div>
  );
};

export { MusicPlayer };
