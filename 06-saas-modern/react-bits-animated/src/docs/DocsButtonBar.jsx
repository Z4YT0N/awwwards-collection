import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const DocsButtonBar = ({ next = null, previous = null }) => {
  return (
    <div className="docs-button-bar">
      {previous && (
        <Link to={previous.route} className="docs-button docs-button-primary">
          <FaArrowLeft />
          <span>{previous.label}</span>
        </Link>
      )}

      {next && (
        <Link to={next.route} className="docs-button docs-button-secondary">
          <span>{next.label}</span>
          <FaArrowRight />
        </Link>
      )}
    </div>
  );
};

export default DocsButtonBar;
