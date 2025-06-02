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
import PostManagement from "./views/admin/PostManagement";
import AdminEditPost from "./views/admin/AdminEditPost";
import AdminSubscription from "./views/admin/AdminSubscription";

import Upgrade from "./views/payment/Upgrade";
import PaymentSuccess from "./views/payment/PaymentSuccess";
import PaymentCancel from "./views/payment/PaymentCancel";
import Checkout from "./views/payment/Checkout";
import ChatPage from "./views/chat/ChatPage";
import AdminSubscriptionDetail from "./views/admin/AdminSubscriptionDetail";
import UserDetail from "./views/core/UserDetail";
import VC_Lobby from "./views/chat/VC_Lobby";
import VC_RoomPage from "./views/chat/VC_RoomPage";
import Categories from "./views/dashboard/Categories";

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
                    <Route
                        path="/otp-verification/"
                        element={<OTPVerification />}
                    />
                    <Route path="/login/" element={<Login />} />

                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/verify-otp" element={<VerifyOTP />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route
                        path="/change-password"
                        element={<ChangePassword />}
                    />

                    {/* Dashboard */}
                    <Route
                        path="/dashboard/"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/posts/"
                        element={
                            <PrivateRoute>
                                <Posts />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/add-post/"
                        element={
                            <PrivateRoute>
                                <AddPost />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/edit-post/:id/"
                        element={
                            <PrivateRoute>
                                <EditPost />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/comments/"
                        element={
                            <PrivateRoute>
                                <Comments />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/categories/"
                        element={
                            <PrivateRoute>
                                <Categories />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/notifications/"
                        element={
                            <PrivateRoute>
                                <Notifications />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/profile/"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/about/"
                        element={
                            <PrivateRoute>
                                <About />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/contact/"
                        element={
                            <PrivateRoute>
                                <Contact />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/upgrade/"
                        element={
                            <PrivateRoute>
                                <Upgrade />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/user/:userId/"
                        element={
                            <PrivateRoute>
                                <UserDetail />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/checkout/"
                        element={
                            <PrivateRoute>
                                <Checkout />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/payment-success/"
                        element={
                            <PrivateRoute>
                                <PaymentSuccess />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/payment-cancel/"
                        element={
                            <PrivateRoute>
                                <PaymentCancel />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/chat/:profileId"
                        element={
                            <PrivateRoute>
                                <ChatPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/vc-lobby"
                        element={
                            <PrivateRoute>
                                <VC_Lobby />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/vc-lobby/vc-room"
                        element={
                            <PrivateRoute>
                                <VC_RoomPage />
                            </PrivateRoute>
                        }
                    />

                    {/* Admin */}
                    <Route
                        path="/admin/dashboard/"
                        element={<AdminDashboard />}
                    />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />
                    <Route
                        path="/admin/user-management"
                        element={<UserManagement />}
                    />
                    <Route
                        path="/admin/post-management"
                        element={<PostManagement />}
                    />
                    <Route
                        path="/admin/post-edit/:id"
                        element={<AdminEditPost />}
                    />
                    <Route
                        path="/admin/subscriptions"
                        element={<AdminSubscription />}
                    />
                    <Route
                        path="/admin/subscriptions/:id/view"
                        element={<AdminSubscriptionDetail />}
                    />;

                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
