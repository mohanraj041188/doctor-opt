import React from "react";
import "./SearchBannerForm.scss";
import Typewriter from "../TypeWritter/TypeWritter";
import { useNavigate } from "@remix-run/react";
import { slugify } from "~/utlis/slugify";
import { SearchIcon } from "../icons";

const SearchBannerForm = ({ suggestions }) => {
  const [search, setSearch] = React.useState("");
  const [visible, setVisibility] = React.useState(false);
  const [animateSearch, setAnimeSearch] = React.useState(false);
  const [hideTyping, setHideTyping] = React.useState(false);
  const navigate = useNavigate(); // Import and initialize useNavigate

  const searchSuggestText = [
    "Search by doctor name ...",
    "Search by clinic name ...",
    "Search by hospital ...",
    "Search for speciality ...",
  ];

  const handleSearch = (event) => {
    setVisibility(true);
    setSearch(event.target.value);
    if (event.target.value.length > 0) {
      setHideTyping(true);
      setAnimeSearch(true);
    } else {
      setHideTyping(false);
      setVisibility(false);
      event.target.blur();
    }
  };

  const selectOption = (value) => {
    setSearch(value);
    setVisibility(false);
    const slug = slugify(value);
    // Navigate to a new page with the selected search item as a query or route parameter
    navigate(`/search/${slug}`);
  };

  const hideSuggestions = () => {
    setAnimeSearch(false);
  };

  const animeSearch = () => {
    setAnimeSearch(true);
    setHideTyping(true);
  };

  const typingHide = () => {
    setHideTyping(false);
  };

  return (
    <section className="search">
      <div className="search__auto--complete">
        <div
          className={
            "search__input " + (animateSearch ? "search__input--focused" : "")
          }
        >
          <SearchIcon className="search__input--icon" />
          <input
            className="search__input--input"
            type="text"
            value={search}
            onChange={handleSearch}
            onFocus={animeSearch}
            onMouseLeave={hideSuggestions}
            onBlur={typingHide}
          />
          <div
            className={
              "search__input--suggestionanimte " +
              (hideTyping ? "search__input--focused" : "")
            }
          >
            <Typewriter
              cursor="|"
              texts={searchSuggestText}
              delay={100}
              infinite={true}
            />
          </div>
          <div className="search__input--keyboard"></div>
        </div>
        {visible && (
          <div className="search__suggestions">
            <ul className="search__suggestions--list">
              {suggestions
                .filter((i) => i.toLowerCase().includes(search.toLowerCase()))
                .map((i, v) => (
                  <li
                    className="search__suggestions--list_item"
                    key={v}
                    onClick={() => selectOption(i)}
                  >
                    {i}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchBannerForm;
