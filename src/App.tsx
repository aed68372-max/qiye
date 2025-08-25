import { Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import Home from "@/pages/Home"; 
import CropDetail from "@/pages/CropDetail";
import NotificationPage from "@/pages/NotificationPage";
import ProfilePage from "@/pages/ProfilePage";
import WeatherMonitoring from "@/pages/WeatherMonitoring";
import { useState, useEffect } from "react";
import { AuthContext } from "@/contexts/authContext";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  
  const { setIsAuthenticated } = useContext(AuthContext);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');
    
    // 简单表单验证
    if (!username || !password) {
      setFormError('用户名和密码不能为空');
      setIsLoading(false);
      return;
    }
    
    // 模拟登录请求
    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        setIsAuthenticated(true);
        toast.success('登录成功！');
      } else {
        setFormError('用户名或密码错误');
        // 添加输入框抖动动画
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
          input.classList.add('animate-shake');
          setTimeout(() => input.classList.remove('animate-shake'), 500);
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-3 rounded-full transform transition-transform duration-300 hover:scale-110">
              <i className="fa-solid fa-leaf text-green-600 text-2xl"></i>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">智慧农业助手</h2>
          <p className="text-center text-gray-500 mb-6">企业级农场管理系统</p>
          
          {formError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm flex items-center">
              <i className="fa-solid fa-exclamation-circle mr-2"></i>
              {formError}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">用户名</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-user text-gray-400"></i>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="请输入用户名"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">密码</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-lock text-gray-400"></i>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="请输入密码"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  记住我
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                  忘记密码?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  <span>登录中...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <i className="fa-solid fa-sign-in-alt mr-2"></i>
                  <span>登录系统</span>
                </div>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>演示账号: <span className="font-mono bg-gray-100 px-2 py-1 rounded">admin</span> / <span className="font-mono bg-gray-100 px-2 py-1 rounded">password</span></p>
          </div>
        </div>
        
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
          <div className="text-center text-sm">
            <span className="text-gray-600">还没有账号? </span>
            <a href="#" className="font-medium text-green-600 hover:text-green-500 transition-colors">
              立即注册
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟验证登录状态
    setTimeout(() => {
      // 这里可以从localStorage或其他地方检查登录状态
      const savedAuth = localStorage.getItem('isAuthenticated');
      setIsAuthenticated(savedAuth === 'true');
      setLoading(false);
    }, 1000);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    // 登录成功后重定向到主页
    window.location.href = '/';
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <i className="fa-solid fa-leaf text-green-600 text-2xl animate-pulse"></i>
          </div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated: login, logout }}
    >
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/crops/:id" element={isAuthenticated ? <CropDetail /> : <Login />} /> 
        <Route path="/notifications" element={isAuthenticated ? <NotificationPage /> : <Login />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Login />} />
        <Route path="/weather-monitoring" element={isAuthenticated ? <WeatherMonitoring /> : <Login />} />
          <Route path="/weather-monitoring" element={isAuthenticated ? <WeatherMonitoring /> : <Login />} />
          <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
          {/* 404页面 - 客户端路由支持 */}
          <Route path="*" element={isAuthenticated ? <Home /> : <Login />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;