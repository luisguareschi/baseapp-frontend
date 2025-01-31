import Spinner from "./spinner";

const FullScreenLoading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Spinner className="size-10 text-blue-500" />
    </div>
  );
};

export default FullScreenLoading;
