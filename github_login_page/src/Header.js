import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const Header = () => {
  return (
    <div id="Header">
      <nav>
        <HeaderLeft />
        <HeaderRight />
      </nav>
    </div>
  );
};

export default Header;
