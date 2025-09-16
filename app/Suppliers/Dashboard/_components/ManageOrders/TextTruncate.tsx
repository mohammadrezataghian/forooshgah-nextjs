import * as React from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const TruncatedText = ({ text, limit = 40 }) => {
    const [expanded, setExpanded] = React.useState(false);
  
    if (!text) return null;
  
    const isTruncated = text.length > limit;
    const displayedText = expanded ? text : text.slice(0, limit);
  
    const handleToggle = () => {
      setExpanded((prev) => !prev);
    };
  
    return (
      <span>
        {displayedText}
        {isTruncated && !expanded && (
          <span
            onClick={handleToggle}
            style={{ color: 'blue', cursor: 'pointer', marginLeft: '4px',textDecoration:'underline',fontSize:'14px' }}
          >
            ...
          </span>
        )}
        {isTruncated && expanded && (
          <span
            onClick={handleToggle}
            style={{ color: 'blue', cursor: 'pointer', marginLeft: '4px',textDecoration:'underline' }}
          >
            <ChevronRightIcon className="text-blue-600"/>
          </span>
        )}
      </span>
    );
  };
  export default TruncatedText