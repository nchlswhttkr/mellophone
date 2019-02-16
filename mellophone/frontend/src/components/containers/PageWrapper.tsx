import React from "react";

import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";

interface Props {
  children: React.ReactNode;
}

class PageWrapper extends React.Component<Props> {
  render() {
    const { children } = this.props;
    return (
      <>
        <Header isAuthenticated={false} />
        <Main>{children}</Main>
        <Footer />
      </>
    );
  }
}

export default PageWrapper;
