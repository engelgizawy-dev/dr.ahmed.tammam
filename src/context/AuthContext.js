"use client"; // ضروري جداً لأننا بنتعامل مع State في الكلاينت

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase"; // بنستدعي الـ auth اللي لسه عاملينه في الخطوة اللي فاتت
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

// عمل الـ Context الأساسي
const AuthContext = createContext({});

// الـ Provider اللي هيلف حولين التطبيق كله عشان يوزع البيانات
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // مراقبة حالة المستخدم أول ما يفتح الموقع (هل هو مسجل دخول ولا لا؟)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // دالة إنشاء حساب جديد
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // دالة تسجيل الدخول
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // دالة تسجيل الخروج
  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// الـ Hook اللي هنستخدمه في الصفحات بعد كده عشان نلقط الدواند دي في ثانية
export const useAuth = () => useContext(AuthContext);