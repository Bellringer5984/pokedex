import React, { useState, useEffect } from "react";

const Header = ({ onSearch }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const visible = prevScrollPos > currentScrollPos;

    setPrevScrollPos(currentScrollPos);
    setVisible(visible);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <header className={`header ${visible ? "visible" : ""}`}>
      header
      <input
        type="text"
        placeholder="Search by name or type"
        value={searchTerm}
        onChange={handleSearchChange}
      ></input>
    </header>
  );
};

export default Header;
