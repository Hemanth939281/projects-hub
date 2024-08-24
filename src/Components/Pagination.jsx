import PropTypes from "prop-types";

const Pagination = ({ totalIdeas, ideasPerPage, setcurrentPage }) => {
  const pages = [];
  
  for (let i = 1; i <= Math.ceil(totalIdeas / ideasPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="mt-8 text-center">
      {pages.map((page, index) => (
        <button 
          key={index} 
          className="p-2 font-bold text-white border-4 border-white focus:bg-white focus:border-4 focus:border-blue-500 focus:text-blue-500"
          onClick={() => setcurrentPage(page)} 
        >
          {page}
        </button>
      ))}
    </div>
  );
  
};

Pagination.propTypes = {
  totalIdeas: PropTypes.number.isRequired,
  ideasPerPage: PropTypes.number.isRequired,
  setcurrentPage: PropTypes.func.isRequired,
}
export default Pagination;
