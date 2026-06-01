import { useEffect, useState, useRef, useCallback } from 'react';
import { FiSearch, FiLayers, FiImage, FiType, FiCircle, FiFile } from 'react-icons/fi';
import { AiOutlineEnter } from 'react-icons/ai';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../constants/Categories';
import { fuzzyMatch } from '../../utils/fuzzy';
import { useSearch } from '../context/SearchContext/useSearch';
import './SearchDialog.css';

function searchComponents(query) {
  if (!query || query.trim() === '') return [];
  const results = [];
  CATEGORIES.forEach(category => {
    const { name: categoryName, subcategories } = category;
    if (fuzzyMatch(categoryName, query)) {
      subcategories.forEach(component => results.push({ categoryName, componentName: component }));
    } else {
      subcategories.forEach(component => {
        if (fuzzyMatch(component, query)) results.push({ categoryName, componentName: component });
      });
    }
  });
  return results;
}

const AnimatedResult = ({ children, delay = 0, dataIndex, onMouseEnter, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.5, triggerOnce: false });
  return (
    <motion.div
      ref={ref}
      data-index={dataIndex}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  );
};

const categoryIconMapping = {
  'Get Started': FiFile,
  'Text Animations': FiType,
  Animations: FiCircle,
  Components: FiLayers,
  Backgrounds: FiImage
};

const SearchDialog = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const resultsRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { toggleSearch } = useSearch();

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchValue(inputValue);
      setSelectedIndex(-1);
    }, 500);
    return () => clearTimeout(t);
  }, [inputValue]);

  const results = searchComponents(searchValue);

  const handleScroll = e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDist = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDist / 50, 1));
  };

  useEffect(() => {
    if (!resultsRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = resultsRef.current;
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min((scrollHeight - (scrollTop + clientHeight)) / 50, 1)
    );
  }, [results]);

  const handleSelect = useCallback(
    result => {
      const slug = str => str.replace(/\s+/g, '-').toLowerCase();
      navigate(`/${slug(result.categoryName)}/${slug(result.componentName)}`);
      setInputValue('');
      setSearchValue('');
      setSelectedIndex(-1);
      onClose();
    },
    [navigate, onClose]
  );

  useEffect(() => {
    const onKey = e => {
      if (!searchValue) return;
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(p => Math.min(p + 1, results.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(p => Math.max(p - 1, 0));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [results, searchValue, selectedIndex, handleSelect]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !resultsRef.current) return;
    const container = resultsRef.current;
    const item = container.querySelector(`[data-index="${selectedIndex}"]`);
    if (!item) return;

    const margin = 50;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;
    if (itemTop < container.scrollTop + margin) {
      container.scrollTo({ top: itemTop - margin, behavior: 'smooth' });
    } else if (itemBottom > container.scrollTop + container.clientHeight - margin) {
      container.scrollTo({
        top: itemBottom - container.clientHeight + margin,
        behavior: 'smooth'
      });
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === '/') {
        e.preventDefault();
        toggleSearch();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleSearch, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setInputValue('');
      setSearchValue('');
      setSelectedIndex(-1);
      setTopGradientOpacity(0);
      setBottomGradientOpacity(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="search-backdrop" onClick={onClose}>
      <div className="search-dialog" onClick={e => e.stopPropagation()}>
        <div className="search-input-row">
          <FiSearch className="search-input-icon" size={16} />
          <input
            ref={inputRef}
            className="search-input"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Search components, categories, or keywords..."
          />
          <kbd className="search-kbd" onClick={onClose}>esc</kbd>
        </div>

        <AnimatePresence>
          {searchValue && (
            <motion.div
              key="results"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="search-results-wrapper">
                <div
                  ref={resultsRef}
                  className="search-results"
                  onScroll={handleScroll}
                >
                  {results.length > 0 ? (
                    results.map((r, i) => {
                      const IconComp = categoryIconMapping[r.categoryName] || FiSearch;
                      const selected = i === selectedIndex;
                      return (
                        <AnimatedResult
                          key={`${r.categoryName}-${r.componentName}-${i}`}
                          delay={0.05}
                          dataIndex={i}
                          onMouseEnter={() => setSelectedIndex(i)}
                          onClick={() => handleSelect(r)}
                        >
                          <div className={`search-result-item${selected ? ' selected' : ''}`}>
                            <div className="search-result-icon">
                              <IconComp size={20} />
                            </div>
                            <div className="search-result-text">
                              <span className="search-result-name">{r.componentName}</span>
                              <span className="search-result-category">in {r.categoryName}</span>
                            </div>
                            <div className="search-result-enter">
                              <AiOutlineEnter size={16} />
                            </div>
                          </div>
                        </AnimatedResult>
                      );
                    })
                  ) : (
                    <p className="search-no-results">
                      No results found for <strong>{searchValue}</strong>
                    </p>
                  )}
                </div>

                <div
                  className="search-gradient search-gradient-top"
                  style={{ opacity: topGradientOpacity }}
                />
                <div
                  className="search-gradient search-gradient-bottom"
                  style={{ opacity: bottomGradientOpacity }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchDialog;
