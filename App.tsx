import * as React from 'react';
import MainNavigator from './src/navigation/Navigation';
import BeforeInitiativeWebView from './src/screen/splash/BeforeInitiativeWebView';

function App() {
  const [isWebViewFinished, setIsWebViewFinished] = React.useState(false);

  return (
    <>
      {isWebViewFinished ? (
        <MainNavigator />
      ) : (
        <BeforeInitiativeWebView
          onWebViewFinished={() => setIsWebViewFinished(true)}
        />
      )}
    </>
  );
}

export default App;
