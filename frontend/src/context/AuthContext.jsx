import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in via localStorage
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('auth_token');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = async (response) => {
    try {
      setLoading(true);
      // In live mode, we would call our Cloudflare Worker auth endpoint:
      // const userData = await api.auth.googleLogin(response.credential);
      
      // Simulate Google Login decode and verify
      const simulatedUser = {
        id: 'google-12345',
        email: 'santhosh@example.com',
        name: 'Santhosh Kumar',
        picture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
      };

      localStorage.setItem('user', JSON.stringify(simulatedUser));
      localStorage.setItem('auth_token', 'simulated-google-jwt-token');
      
      setUser(simulatedUser);
      return simulatedUser;
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
