const TruncatedCell = ({ children, className = "", trunc = "1" }) => {
  return (
    <td className={`text-center ${className}`}>
      <div className={`line-clamp-${trunc}`}>{children}</div>
    </td>
  );
};

export default TruncatedCell;
