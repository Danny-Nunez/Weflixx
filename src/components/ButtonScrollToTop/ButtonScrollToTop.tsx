import { useEffect, useState } from "react";
import styles from "./buttonScrollToTop.module.scss";

const ButtonScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const checkShowButtonScrollToTop = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", checkShowButtonScrollToTop);
    return () => window.removeEventListener("scroll", checkShowButtonScrollToTop);
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  if (!showTopBtn) return null;
  return (
    <div className={styles.button} onClick={goToTop}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="48"
        height="48"
        viewBox="0 0 48 48"
      >
        <defs>
          <circle id="b" cx="20" cy="20" r="20" />
          <filter
            id="a"
            width="137.5%"
            height="137.5%"
            x="-18.8%"
            y="-13.8%"
            filterUnits="objectBoundingBox"
          >
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius=".5"
              result="shadowSpreadOuter1"
            />
            <feOffset dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
            <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2" />
            <feComposite
              in="shadowBlurOuter1"
              in2="SourceAlpha"
              operator="out"
              result="shadowBlurOuter1"
            />
            <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0" />
          </filter>
        </defs>
        <g fill="none" fillRule="evenodd">
          <g transform="matrix(-1 0 0 1 44 2)">
            <use fill="#000" filter="url(#a)" xlinkHref="#b" />
            <use fill="#995aff" stroke="#995aff" xlinkHref="#b" />
          </g>
          <path d="M32 14v16H16V14z" />
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M25.5 17.5L21 22l4.5 4.5"
          />
        </g>
      </svg>
    </div>
  );
};
export default ButtonScrollToTop;
