//! Imported Libraries -------------------------
//None at this time
//! --------------------------------------------

//! Imported Components/Variables---------------
//None at this time
//! --------------------------------------------


export default function HideFeature({visible, setVisible}) {

  const handleClick = () => {
    setVisible(!visible);
  };

  return (<>
    {visible ?
        <div className="hideFeatureButton" onClick={handleClick}>
            <p className="hideExpandMessage" >HIDE</p>
        </div> :
        <div className="hideFeatureButton" onClick={handleClick}>
            <p className="hideExpandMessage" >EXPAND</p>
        </div>}
    </>);
}
