import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-redux";
import store from "./redux/store";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import CreatePost from "./admin/CreatePost";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Layout from "./admin/global/Layout";
import EditPost from "./admin/EditPost";
import UserDashboard from "./user/UserDashboard";
import SinglePost from "./pages/Singlepost";

//HOC
const AdminDashboardHOC = Layout(AdminDashboard);
const CreatePostHOC = Layout(CreatePost);
const EditPostHOC = Layout(EditPost);
const UserDashboardHOC = Layout(UserDashboard);

const App = () => {
  const [homeData, setHomeData] = useState({});
  const [singlePostData, setSinglePostData] = useState({});

  useEffect(() => {
    fetchHomeData();
    fetchSinglePostData("post_id"); // Ganti "post_id" dengan ID post yang ingin Anda tampilkan
  }, []);

  const fetchHomeData = async () => {
    try {
      const response = await axios.get(`https://project-tugas-akhir.vercel.app/api/home`);
      setHomeData(response.data);
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };

  const fetchSinglePostData = async (postId) => {
    try {
      const response = await axios.get(`https://project-tugas-akhir.vercel.app/api/post/${postId}`);
      setSinglePostData(response.data);
    } catch (error) {
      console.error("Error fetching single post data:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <ProSidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home data={homeData} />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/post/:id" element={<SinglePost data={singlePostData} />}/>
              <Route path="*" element={<NotFound />} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardHOC /></AdminRoute>}/>
              <Route path="/admin/post/create" element={<AdminRoute><CreatePostHOC /></AdminRoute>}/>
              <Route path="/admin/post/edit/:id" element={<AdminRoute><EditPostHOC /></AdminRoute>}/>
              <Route path="/user/dashboard"element={<UserRoute><UserDashboardHOC /></UserRoute>}/>
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider>
      </Provider>
    </>
  );
};

export default App;
