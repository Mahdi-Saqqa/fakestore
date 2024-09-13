import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
const SearchBox = (props) => {
  const { setSearchParams } = props;
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <Paper
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        minWidth: 400,
        width: "30%",
        borderRadius: "25px",
        borderColor: "black",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="search for product"
        inputProps={{ "aria-label": "search for product" }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <IconButton
        onClick={() => {
          setSearchParams(() => {
            const params = new URLSearchParams();
            params.set("search", searchQuery);
            setSearchQuery("");
            return params;
          });
        }}
        type="button"
        sx={{ padding: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBox;
