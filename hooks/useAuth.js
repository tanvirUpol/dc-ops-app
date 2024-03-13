import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getStorage, removeItem, setStorage } from './useStorage';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const API_URL = 'https://shwapnooperation.onrender.com/api/user/login';

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      setStorage('token', data.token);
      setStorage('user', data.user);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Login failed');
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeItem('user');
    removeItem('token');
    setIsLoading(false);
  };

  const isLoggedIn = () => {
    try {
      console.log('checking is logged in');
      setIsLoading(true);

      let storedUser = getStorage('user', setUser, 'object');
      let storedToken = getStorage('token', setToken);

      if (storedUser?.user) {
        console.log({storedUser, storedToken});
        setUser(storedUser);
        setToken(storedToken);
        setIsLoading(false);
        console.log('user is now logged in');
      } else {
        setIsLoading(false);
        setUser(null);
        setToken(null);
        console.log('user not logged in');
      }
    } catch (error) {
      Alert.alert(error);
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const authInfo = {
    login,
    logout,
    isLoading,
    user,
    token,
  };

  return authInfo;
};

export default useAuth;
