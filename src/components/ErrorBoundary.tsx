import React from 'react';
import MyButton from './UI/MyButton';

interface IError {
  hasError: boolean;
}

interface IProps {
  children: JSX.Element;
}

class ErrorBoundary extends React.Component<IProps, IError> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <>
          <h1>Something went wrong.</h1>
          <MyButton
            click={() => {
              this.setState({
                hasError: false,
              });
            }}
            color="blue"
            message="Return"
          />
        </>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
