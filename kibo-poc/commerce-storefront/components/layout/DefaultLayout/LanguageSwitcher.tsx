import React from 'react';

const LanguageSwitcher: React.FC = () => {
  return (
    <div className="language-switcher visible">
      <div className="d-flex justify-content-center align-items-center w-100">
        <div className="flex-grow-1">
          <div className="language-switcher-list">
            <div className="language-switcher-item">
              <span className="pr-1">Stay in</span>
              <a href="/en">English</a>
            </div>
            <div className="language-switcher-item">
              <span> التبديل إلى</span>
              <a href="/ar"> اللغة العربية</a>
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="pr-4 close" aria-label="Cancel">
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
      <div className="language-switcher-message d-none">
        You can change your language and country at the bottom of every page
      </div>
    </div>
  );
};

export default LanguageSwitcher;
