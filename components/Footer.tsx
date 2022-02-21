import { useContext } from "react";
import UserContext from "contexts/User";

const Footer: React.FC = () => {
  const user = useContext(UserContext);

  const getYear = () => new Date().getFullYear();

  if (!user) {
    return null;
  }

  return (
    <footer className="sticky-footer bg-white mt-5">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>Copyright © Ikura {getYear}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
