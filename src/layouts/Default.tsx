import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <main className="min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto w-full">
        <Outlet />
      </div>
    </main>
  );
};

export { DefaultLayout };
