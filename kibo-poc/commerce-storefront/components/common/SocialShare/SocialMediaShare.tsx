import React from "react";

import Nav from "@core/Nav";
import NavItem from "@core/NavItem";
import NavLink from "@core/NavLink";
import {
  PinterestShareButton,
  FacebookShareButton,
  EmailShareButton,
} from "react-share";

const SocialMediaShare: React.FC = () => {

  return (
    <>
      <Nav className="social-media">
        <NavItem>
          <NavLink href="#">
            <FacebookShareButton url="/">
              <img title="Share on Facebook" src="/images/tru/svg/facebook.svg" alt="" />
            </FacebookShareButton>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <PinterestShareButton url="/" media="">
              <img title="Share on Twitter" src="/images/tru/svg/twitter.svg" alt="" />
            </PinterestShareButton>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <PinterestShareButton url="/" media="">
              <img title="Share on Pinterest" src="/images/tru/svg/pinterest.svg" alt="" />
            </PinterestShareButton>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <EmailShareButton url="/">
              <img title="Share through Email" src="/images/tru/svg/email.svg" alt="" />
            </EmailShareButton>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <EmailShareButton url="/">
              <img title="Share through Instagram" src="/images/tru/svg/instagram.svg" alt="" />
            </EmailShareButton>
          </NavLink>
        </NavItem>
      </Nav>
    </>
  );
};

export default SocialMediaShare;