import "@/styles/globals.css";
import PropTypes from "prop-types";
import { AuthProvider } from "@/contexts";
import { ReactQueryProvider } from "@/contexts/ReactQuery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = Component.Layout || Noop;

  return (
    <AuthProvider pageProps={pageProps}>
      <ReactQueryProvider pageProps={pageProps}>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </ReactQueryProvider>
    </AuthProvider>
  );
}

Noop.propTypes = {
  children: PropTypes.any,
};

export default MyApp;
