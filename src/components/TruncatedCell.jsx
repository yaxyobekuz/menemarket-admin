const TruncatedCell = ({
  children,
  className = "",
  trunc = "line-clamp-1",
}) => {
  return (
    <td className={`text-center ${className}`}>
      <div className={trunc}>{children}</div>
    </td>
  );
};

export default TruncatedCell;
