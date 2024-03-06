import React from 'react';

const QuickNav: React.FC = () => {
  return (
    <div className="quick-nav">
      <div className="container text-center d-flex align-items-center">
        <ul className="mr-auto ml-auto list-group list-group-horizontal">
          <li className="list-group-item">
            <a href="/en-qa/help/delivery-information.html">
              <img src="https://cdnqa.toysrusmena.com/storefront/tru/usp-shipping.svg" alt="FREE shipping on orders above QAR 99" />
              <span>FREE shipping on orders above QAR 99</span>
            </a>
          </li>
          <li className="list-group-item">
            <a href="/en-qa/help/returns-and-refunds.html">
              <img src="https://cdnqa.toysrusmena.com/storefront/tru/usp-return.svg" alt="FREE 30-day returns" />
              <span>FREE 30-day returns</span>
            </a>
          </li>
          <li className="list-group-item">
            <a href="/en-qa/help/click-and-collect.html">
              <img src="https://cdnqa.toysrusmena.com/content/media/cc8136fa-a575-452e-8056-c7cfa1a62aa5.png" alt="Click & Collect - ready for collection in 3 hours" />
              <span>Click & Collect - ready for collection in 3 hours</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default QuickNav;
