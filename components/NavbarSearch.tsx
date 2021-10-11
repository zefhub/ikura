const NavbarSearch: React.FC = () => {
  return (
    <form className="form-inline me-4 d-none d-lg-flex">
      <div className="input-group input-group-rounded input-group-merge input-group-reverse">
        <input
          type="search"
          className="form-control dropdown-toggle list-search"
          data-bs-toggle="dropdown"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="input-group-text">
          <i className="fe fe-search"></i>
        </div>
      </div>
    </form>
  );
};

export default NavbarSearch;
