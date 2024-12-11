import { Menu } from "@headlessui/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import MainMenu from "../Menu";
import MobileMenu from "../MobileMenu";
const ThemeSwitch = dynamic(() => import("@/components/elements/ThemeSwitch"), {
  ssr: false,
});
export default function Header3({ scroll, isMobileMenu, handleMobileMenu }) {
  return (
    <>
      <header
        id="header_main"
        className={`header ${scroll ? "is-fixed is-small" : ""}`}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="header__body d-flex justify-content-between">
                <div className="header__left">
                  <div className="logo">
                    <Link className="light" href="/">
                      <img
                        src="/assets/images/logo/logo.png"
                        alt=""
                        width={118}
                        height={42}
                        data-retina="assets/images/logo/logo@2x.png"
                        data-width={118}
                        data-height={42}
                      />
                    </Link>
                    <Link className="dark" href="/">
                      <img
                        src="/assets/images/logo/logo-dark.png"
                        alt=""
                        width={118}
                        height={42}
                        data-retina="assets/images/logo/logo-dark@2x.png"
                        data-width={118}
                        data-height={42}
                      />
                    </Link>
                  </div>
                </div>
                <div className="header__right">
                  <ThemeSwitch />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
