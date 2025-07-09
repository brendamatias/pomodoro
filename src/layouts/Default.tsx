import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <main className="min-h-screen px-4 py-10 bg-primary flex items-center justify-center text-[#F4EDDB]">
      <Outlet />
    </main>
  );
};

export { DefaultLayout };
