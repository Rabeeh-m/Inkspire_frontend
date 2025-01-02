import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Index from "./views/core/Index";
import Detail from "./views/core/Detail";
import Search from "./views/core/Search";
import Category from "./views/core/Category";
import About from "./views/pages/About";
import Contact from "./views/pages/Contact";
import Register from "./views/auth/Register";
import OTPVerification from "./views/auth/OTPVerification";
import Login from "./views/auth/Login";
import ForgotPassword from "./views/auth/ForgotPassword";
import ResetPassword from "./views/auth/ResetPassword";
import VerifyOTP from "./views/auth/VerifyOTP";
import ChangePassword from "./views/auth/ChangePassword";
import Dashboard from "./views/dashboard/Dashboard";
import Posts from "./views/dashboard/Posts";
import AddPost from "./views/dashboard/AddPost";
import EditPost from "./views/dashboard/EditPost";
import Comments from "./views/dashboard/Comments";
import Notifications from "./views/dashboard/Notifications";
import Profile from "./views/dashboard/Profile";
import PrivateRoute from "./layouts/PrivateRoute";

import AdminLogin from "./views/admin/AdminLogin";
import AdminDashboard from "./views/admin/AdminDashboard";
import UserManagement from "./views/admin/UserManagement";
import PostManagement from './views/admin/PostManagement'
import AdminEditPost from "./views/admin/AdminEditPost";
function App() {
    return (
        <>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/:slug/" element={<Detail />} />
                        <Route path="/category/:slug/" element={<Category />} />
                        <Route path="/search/" element={<Search />} />

                        {/* Authentication */}
                        <Route path="/register/" element={<Register />} />
                        <Route path="/otp-verification/" element={<OTPVerification />} />
                        <Route path="/login/" element={<Login />} />
                        
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/verify-otp" element={<VerifyOTP/>} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/change-password" element={<ChangePassword />} />

                        {/* Dashboard */}
                        <Route path="/dashboard/" element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }/>

                        <Route path="/posts/" element={
                                <PrivateRoute>
                                    <Posts />
                                </PrivateRoute>
                            }/>

                        <Route path="/add-post/" element={
                                <PrivateRoute>
                                    <AddPost />
                                </PrivateRoute>
                            }/>

                        <Route path="/edit-post/:id/" element={
                                <PrivateRoute>
                                    <EditPost />
                                </PrivateRoute>
                            }/>

                        <Route path="/comments/" element={
                                <PrivateRoute>
                                    <Comments />
                                </PrivateRoute>
                            }/>

                        <Route path="/notifications/" element={
                                <PrivateRoute>
                                    <Notifications />
                                </PrivateRoute>
                            }/>

                        <Route path="/profile/" element={
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            }/>

                        {/* Pages */}
                        <Route path="/about/" element={<About />} />
                        <Route path="/contact/" element={<Contact />} />
                        
                        {/* Admin */}
                        <Route path="/admin/dashboard/" element={<AdminDashboard />} />
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/user-management" element={<UserManagement />} />
                        <Route path="/admin/post-management" element={<PostManagement />} />
                        <Route path="/admin/post-edit/:id" element={<AdminEditPost />} />

                    </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;