const Spinner = () => {
  return (
    <div className="flex justify-center items-center pt-8">
      <div
        className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
