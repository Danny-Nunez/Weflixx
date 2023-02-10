import useOnClickOutside from "hooks/useClickOutside";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from "react";

interface IDropdownContext {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}
interface IDropdownProviderProps {
  placeholder?: string;
  children: React.ReactNode;
}

const DropdownContext = createContext<IDropdownContext>({} as IDropdownContext);
const DropdownProvider = ({
  children,
  placeholder = "Select",
  ...props
}: IDropdownProviderProps) => {
  const dropdownRef = useRef(null);
  const [title, setTitle] = useState(placeholder);
  const [show, setShow] = useState(false);
  const toggle = useCallback(() => {
    setShow((isShow) => !isShow);
  }, []);
  const values = useMemo(() => ({ show, setShow, toggle, title, setTitle }), [show, toggle, title]);
  useOnClickOutside(dropdownRef, () => setShow(() => false));
  return (
    <DropdownContext.Provider value={values} {...props}>
      <div ref={dropdownRef}>{children}</div>
    </DropdownContext.Provider>
  );
};
function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}
export { useDropdown, DropdownProvider };
