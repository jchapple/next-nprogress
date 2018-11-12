import React from "react";
import NProgress from "nprogress";
import { withRouter } from "next/router";

class NProgressContainer extends React.Component {
  static defaultProps = {
    color: "#2299DD",
    showAfterMs: 300,
    spinner: true
  };

  timer = null;

  routeChangeStart = () => {
    const { showAfterMs } = this.props;
    clearTimeout(this.timer);
    this.timer = setTimeout(NProgress.start, showAfterMs);
  }

  routeChangeEnd = () => {
    clearTimeout(this.timer);
    NProgress.done();
  }

  componentDidMount() {
    const { options, router, showAfterMs } = this.props;

    if (options) {
      NProgress.configure(options);
    }

    router.events.on('routeChangeStart', this.routeChangeStart);
    router.events.on('routeChangeComplete', this.routeChangeEnd);
    router.events.on('routeChangeError', this.routeChangeEnd);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    router.events.off('routeChangeStart', this.routeChangeStart);
    router.events.off('routeChangeComplete', this.routeChangeEnd);
    router.events.off('routeChangeError', this.routeChangeEnd);
  }

  render() {
    const { color, spinner } = this.props;

    return (
      <style jsx global>{`
        #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          background: ${color};

          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;

          width: 100%;
          height: 2px;
        }

        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
          opacity: 1;

          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
        }

        #nprogress .spinner {
          display: ${spinner ? "block" : "none"};
          position: fixed;
          z-index: 1031;
          top: 15px;
          right: 15px;
        }

        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;

          border: solid 2px transparent;
          border-top-color: ${color};
          border-left-color: ${color};
          border-radius: 50%;

          -webkit-animation: nprogresss-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
        }

        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }

        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }

        @-webkit-keyframes nprogress-spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes nprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    );
  }
}

export default withRouter(NProgressContainer);
