import React, { useState } from 'react';
import DOMPurify from 'dompurify';

type TruncatedTextProps = {
  text: string;
  maxLength?: number;
};

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, maxLength = 300 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => setIsExpanded(!isExpanded);

  const sanitizeHTML = (html: string) => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <div>
      {text.length > maxLength ? (
        <div>
          <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(isExpanded ? text : truncateText(text, maxLength)) }} />
          <span className="text-blue-400 dark:text-white dark:hover:text-primary hover:text-primary cursor-pointer" onClick={toggleExpansion}>
            {isExpanded ? ' view less' : ' view more'}
          </span>
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(text) }} />
      )}
    </div>
  );
};

export default TruncatedText;
