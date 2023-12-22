import { useState } from "react";

export default function HideFeature() {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };
  return (
    <>
      <div className="hideFeatureButton" onClick={handleClick}></div>
    </>
  );
}
