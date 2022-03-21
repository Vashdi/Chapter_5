const HeaderLeft = () => {
  return (
    <ul className="leftList">
      <li>
        <a className="Logo" href="/#">
          <i class="fab fa-github"></i>
        </a>
      </li>
      <li>
        <select name="whyGithub" value="whyGithub">
          <option>Why GitHub?</option>
        </select>
      </li>
      <li>
        <a href="/#">Enterprise</a>
      </li>
      <li>
        <select name="explore" value="explore">
          <option>Explore</option>
        </select>
      </li>
      <li>
        <a href="/#">MarketPlace</a>
      </li>
      <li>
        <select name="pricing" value="pricing">
          <option>Pricing</option>
        </select>
      </li>
    </ul>
  );
};

export default HeaderLeft;
