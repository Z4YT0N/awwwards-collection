import useScrollToTop from '../hooks/useScrollToTop';
import DocsButtonBar from './DocsButtonBar';

const Introduction = () => {
  useScrollToTop();

  return (
    <section className="docs-section">
      <h3 className="docs-category-title">Introduction</h3>

      <p className="docs-paragraph dim">
        React Bits is an open-source collection of carefully designed UI components that aim to enhance your React web
        applications.
      </p>
      <p className="docs-paragraph">
        This is not your typical component library, which means you won&apos;t find a set of generic buttons, inputs, or
        other common UI elements here.
      </p>
      <p className="docs-paragraph">
        Basically, these components are here to help you stand out and make a statement visually by adding a touch of
        creativity to your projects.
      </p>

      <hr className="docs-separator" />

      <h3 className="docs-category-title">Mission</h3>

      <p className="docs-paragraph dim">
        The goal of React Bits is simple - provide flexible, visually stunning and most importantly, free components
        that take web projects to the next level.
      </p>
      <p className="docs-paragraph">To make that happen, the project is committed to the following principles:</p>

      <ul className="docs-list">
        <li className="docs-list-item">
          <span className="docs-highlight">Free For All:</span> You own the code, and it&apos;s free to use in your
          projects
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">Prop-First Approach:</span> Easy customization through thoughtfully exposed
          props
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">Fully Modular:</span> Install strictly what you need, React Bits is not a
          dependency
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">Free Choice:</span> JS or TS, plain CSS or Tailwind, the code is all here
        </li>
      </ul>

      <h4 className="docs-category-subtitle">Free For All</h4>

      <p className="docs-paragraph">
        Every component you choose to bring into your project is yours to modify or extend, because you get full
        visibility of the code, not just an import.
      </p>

      <h4 className="docs-category-subtitle">Prop-First Approach</h4>

      <p className="docs-paragraph">
        Every component is designed to be flexible and customizable, with props that allow you to adjust the look and
        feel without having to always dive into the code.
      </p>

      <h4 className="docs-category-subtitle">Fully Modular</h4>

      <p className="docs-paragraph">
        React Bits is not your classic NPM library, you install only the components you need by either copying the code
        or using the CLI, without pulling in a whole library.
      </p>

      <h4 className="docs-category-subtitle">Free Choice</h4>

      <p className="docs-paragraph">
        I don&apos;t want to dictate how you build your projects. Whether you prefer JavaScript or TypeScript, plain CSS
        or Tailwind, it&apos;s all here for you to use as you see fit.
      </p>

      <p className="docs-paragraph dim">
        P.S. The header has a neat dropdown to help you choose your preferred technologies.
      </p>

      <hr className="docs-separator" />

      <h3 className="docs-category-title">Performance</h3>

      <p className="docs-paragraph dim">
        While we do everything possible to optimize components and offer the best experience, here are some tips to keep
        in mind when using React Bits:
      </p>

      <ul className="docs-list">
        <li className="docs-list-item">
          <span className="docs-highlight">Less Is More:</span> Using more than 2-3 components on a page is not advised,
          it can overload your page with animations, potentially impacting performance or UX
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">Mobile Optimization:</span> Consider disabling certain effects on mobile and
          replacing them with static placeholders instead
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">Test Thoroughly:</span> Your device may be high-end, but be considerate of
          your users - always test on multiple devices before going live
        </li>
      </ul>

      <DocsButtonBar next={{ label: 'Installation', route: '/get-started/installation' }} />
    </section>
  );
};

export default Introduction;
