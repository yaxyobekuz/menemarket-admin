const StickyCell = ({ children, className = "", isActive }) => {
  return (
    <td
      className={`${
        isActive ? "custom-active-border-r" : null
      } ${className} sticky left-0 inset-y-0 bg-neutral-50 text-center transition-colors duration-200 group-even:bg-white`}
    >
      {children}
    </td>
  );
};

export default StickyCell;
