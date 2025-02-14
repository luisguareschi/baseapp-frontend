import { BarLoader } from "./bar-loader";

const FullScreenLoading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <BarLoader className="min-w-[300px]" />
    </div>
  );
};

export default FullScreenLoading;
