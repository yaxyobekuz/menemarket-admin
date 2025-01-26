import React, { useState } from "react";

// Toaster (For notification)
import { notification } from "../notification";

const CopyButton = ({
  text,
  className = "",
  children = null,
  disabledDelay = 1500,
  notificationText = "Nusxa olindi",
}) => {
  const [disabled, setDisabled] = useState(false);

  const handleCopyId = () => {
    setDisabled(true);

    navigator.clipboard.writeText(text).then(() => {
      notification.success(notificationText);
    });

    setTimeout(() => setDisabled(false), disabledDelay);
  };

  return (
    <button disabled={disabled} onClick={handleCopyId} className={className}>
      {children}
    </button>
  );
};

export default CopyButton;
