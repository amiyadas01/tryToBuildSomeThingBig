import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";

function App() {
  const [loading, setLoading] = useState(true);  // Fixed useState syntax
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        
        if (userData) {
          dispatch(login({userData}));
        } else {
          console.log("No user data found");
          dispatch(logout());
        }
      })
      
      .finally(() => setLoading(false));
  }, []);  // Added dispatch to dependency array

  if (loading) return null;  // More explicit loading check

  return (
    <div className="h-screen w-full bg-orange-900 text-center">
      <div className="w-full h-screen bg-orange-600">
        <Header />
        <main className="h-[584px] bg-orange-950">
          outlet
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;