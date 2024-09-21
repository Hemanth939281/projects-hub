const Shimmer = () => {
    return (
      <div className="space-y-4 animate-pulse shadow-md shadow-black h-52 mb-4 p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
      </div>
    );
  };

  export default Shimmer;