import WrapLink from "components/WrapLink";
import { Icon404 } from "components/Icons";
import { PATH } from "constants/path";
import React, { Component, ErrorInfo } from "react";
import styles from "./errorBoundary.module.scss";

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  public static getDerivedStateFromError() {
    return { hasError: true };
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error: ", error);
    console.error("Error info: ", errorInfo);
  }
  public render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className={styles.error}>
          <Icon404 />
          <span className={styles.message}>Something went wrong, please try again later !</span>
          <WrapLink href={PATH.home} className={styles.backlink}>
            Return Home
          </WrapLink>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
