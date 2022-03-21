import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";

const HeaderRight = () => {
  const [search, setSearch] = useState(" ");

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };
  const backgroundColor = { backgroundColor: "grey" };
  const infoCursor = { cursor: "pointer", color: "white" };

  return (
    <ul className="rightList">
      <li>
        <FormControl
          style={backgroundColor}
          sx={{ m: 1, width: "20ch" }}
          variant="outlined"
        >
          <OutlinedInput
            id="github-search"
            value={search}
            style={infoCursor}
            onChange={handleChange}
            size="small"
            placeholder="Search GitHub"
            endAdornment={
              <InputAdornment position="end">
                <i class="fas fa-info"></i>
              </InputAdornment>
            }
          />
        </FormControl>
      </li>
      <li>
        <a href="/#">Sign in</a>
      </li>
      <li>
        <a href="/#">Sign up</a>
      </li>
    </ul>
  );
};

export default HeaderRight;
