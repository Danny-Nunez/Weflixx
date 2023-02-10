import WrapLink from "components/WrapLink";
import { IconSearch } from "components/Icons";
import axiosClient from "configs/axiosClient";
import { PATH } from "constants/path";
import useClickOutside from "hooks/useClickOutside";
import { useDebounce } from "hooks/useDebounce";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, HTMLAttributes, useEffect, useRef, useState } from "react";
import classNames from "utils/classNames";
import styles from "./searchBox.module.scss";

interface SearchBoxProps extends HTMLAttributes<HTMLDivElement> {}

const SearchBox = ({ className = "" }: SearchBoxProps) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [suggests, setSuggests] = useState<string[]>([]);
  const debouncedKeyword = useDebounce(keyword, 500);
  const searchResultsRef = useRef(null);
  useClickOutside(searchResultsRef, () => setSuggests([]));
  const fetchSuggestsKeyword = async () => {
    const { data } = await axiosClient(`/api/search/suggest?keyword=${keyword}`);
    setSuggests(data);
  };
  const handleChangeKeyword = async (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${PATH.search}?keyword=${keyword}`);
    setKeyword("");
  };
  useEffect(() => {
    fetchSuggestsKeyword();
  }, [debouncedKeyword]);

  return (
    <div className={classNames(styles.searchBox, className)}>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          className={styles.searchInput}
          placeholder="Search movie..."
          onChange={handleChangeKeyword}
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
        />
        <button type="submit" className={styles.searchButton}>
          <IconSearch />
        </button>
      </form>
      <ul className={classNames(styles.searchResults, "scrollbar")} ref={searchResultsRef}>
        {suggests.map((suggest) => {
          const removeTag = suggest.replaceAll("<em>", "").replaceAll("</em>", "");
          const name = encodeURIComponent(removeTag);
          return (
            <li key={name}>
              <WrapLink
                href={`${PATH.search}?keyword=${name}`}
                dangerouslySetInnerHTML={{ __html: suggest }}
                className={styles.suggest}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchBox;
