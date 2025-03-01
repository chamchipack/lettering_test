// import * as React from 'react';
// import MainNavigator from './src/navigation/Navigation';
// import BeforeInitiativeWebView from './src/screen/splash/BeforeInitiativeWebView';

// function App() {
//   const [isWebViewFinished, setIsWebViewFinished] = React.useState(false);

//   return (
//     <>
//       {isWebViewFinished ? (
//         <MainNavigator />
//       ) : (
//         <BeforeInitiativeWebView
//           onWebViewFinished={() => setIsWebViewFinished(true)}
//         />
//       )}
//     </>
//   );
// }

// export default App;
import * as React from 'react';
import {useEffect} from 'react';
import {View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import MainNavigator from './src/navigation/Navigation';
import BeforeInitiativeWebView from './src/screen/splash/BeforeInitiativeWebView';

function App() {
  const [isWebViewFinished, setIsWebViewFinished] = React.useState(false);

  // useEffect(() => {
  //   SplashScreen.hide(); // ✅ 앱이 시작되면 스플래시 숨기기
  // }, []);
  const hideSplash = () => {
    setTimeout(() => {
      SplashScreen.hide(); // ✅ 웹뷰가 끝났을 때도 스플래시 숨기기
      setIsWebViewFinished(true);
    }, 1000);
  };

  return (
    <View style={{flex: 1}}>
      {isWebViewFinished ? (
        <MainNavigator />
      ) : (
        <BeforeInitiativeWebView
          onWebViewFinished={() => {
            hideSplash();
          }}
        />
      )}
    </View>
  );
}

export default App;
