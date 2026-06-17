"use client";

import React, { useState, useEffect } from "react";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const [studentName, setStudentName] = useState("طالب مجهول");
  const [commentInputs, setCommentInputs] = useState({}); // لحفظ نصوص التعليقات لكل بوست

  useEffect(() => {
    // 👤 جلب اسم الطالب الحقيقي عشان يظهر لما يكتب بوست أو كومنت
    const savedData = localStorage.getItem("temp_student_data");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setStudentName(`${parsed.firstName} ${parsed.lastName}`);
    }

    // 💬 جلب المنشورات من الـ localStorage لو موجودة، لو مش موجودة بنحط أسئلة افتراضية صايعة
    const savedPosts = localStorage.getItem("tammam_forum_posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      const defaultPosts = [
        {
          id: "p1",
          author: "عبد الرحمن محمد",
          text: "يا شباب هو ليه هرمون الـ ADH بيزيد لما بنعمل مجهود بدني كبير وعرق؟ إيه العلاقة البيانية هنا بالظبط؟ 🤔",
          createdAt: "منذ ساعتين",
          comments: [
            { id: "c1_1", author: "د. أحمد تمام (مساعد)", text: "أهلاً يا بطل، لأن العرق بيقلل مياه البلازما (زيادة الأسموزية)، فالجسم بيفرز ADH عشان يعيد امتصاص الماء من الكلية ويحافظ على توازن جسمك!Relation طردية مع الأسموزية." }
          ]
        },
        {
          id: "p2",
          author: "مريم علي",
          text: "حد معاه تلخيص لـ عظام الحزام الحوضي والفرق بينه وبين التجويف الأروق؟ تلخبطت فيهم في امتحان السنتر اليوم 😫",
          createdAt: "منذ 4 ساعات",
          comments: []
        }
      ];
      localStorage.setItem("tammam_forum_posts", JSON.stringify(defaultPosts));
      setPosts(defaultPosts);
    }
  }, []);

  // 📝 نشر سؤال جديد
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: `p_${Date.now()}`,
      author: studentName + " 👑", // شارة تميز للطالب الحالي
      text: newPostText.trim(),
      createdAt: "الآن",
      comments: []
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("tammam_forum_posts", JSON.stringify(updatedPosts));
    setNewPostText(""); // تصفير الخانة
  };

  // 💬 إضافة تعليق/إجابة على سؤال
  const handleAddComment = (e, postId) => {
    e.preventDefault();
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim()) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `c_${Date.now()}`,
              author: studentName,
              text: commentText.trim()
            }
          ]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem("tammam_forum_posts", JSON.stringify(updatedPosts));
    
    // تصفير خانة التعليق للبوست ده بس
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* هيدر الصفحة */}
      <div className="border-b border-white/5 pb-4">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <span>💬</span> منتدى رفاق الدكتور أحمد تمام
        </h2>
        <p className="text-gray-400 text-xs mt-1">ساحة تفاعلية حرة لطرح الأسئلة الصعبة في منهج الأحياء والمناقشة بين الطلاب والمعلمين.</p>
      </div>

      {/* 📥 فورم إضافة منشور جديد */}
      <div className="p-5 rounded-2xl bg-[#0D1524]/60 border border-white/5 backdrop-blur-md shadow-xl">
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#C8D749]/20 text-[#C8D749] flex items-center justify-center text-xs font-black">👤</span>
            <span className="text-sm font-bold text-white">اسأل رفاقك ومدرّسك يا {studentName.split(" ")[0]}..</span>
          </div>
          <textarea
            required
            rows={3}
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            placeholder="اكتب سؤالك أو الفكرة اللي واقفة معاك في الأحياء هنا..."
            className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors text-sm resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#C8D749] text-[#070B14] font-black text-xs hover:bg-[#b5c43d] transition-all duration-300 shadow-[0_0_15px_rgba(200,215,73,0.1)]"
            >
              🚀 انشر سؤالك الحين
            </button>
          </div>
        </form>
      </div>

      {/* 📋 عرض قائمة المنشورات */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="p-6 rounded-2xl bg-[#0D1524]/40 border border-white/5 space-y-4 shadow-lg backdrop-blur-sm">
            
            {/* معلومات كاتب البوست */}
            <div className="flex justify-between items-center text-xs border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-sm">👨‍💻</span>
                <span className="font-black text-gray-200">{post.author}</span>
              </div>
              <span className="text-gray-500 font-medium">{post.createdAt}</span>
            </div>

            {/* نص البوست */}
            <p className="text-white text-sm leading-relaxed whitespace-pre-wrap px-1">
              {post.text}
            </p>

            {/* سيكشن التعليقات الجاهزة جوه البوست */}
            {post.comments.length > 0 && (
              <div className="p-4 rounded-xl bg-[#070B14]/50 border border-white/5 space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="text-xs space-y-1 border-r-2 border-[#C8D749] pr-3 py-1">
                    <span className="font-black text-[#C8D749] block">{comment.author} :</span>
                    <p className="text-gray-300 leading-relaxed">{comment.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* فورم إضافة رد/تعليق سريع على البوست ده */}
            <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex gap-2 pt-2">
              <input 
                type="text"
                required
                value={commentInputs[post.id] || ""}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                placeholder="اكتب إجابتك أو تعليقك هنا..."
                className="flex-1 px-4 py-2 rounded-xl bg-[#070B14] border border-[#1A263D] text-white placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-bold text-xs hover:bg-white/10 hover:text-white transition-colors"
              >
                رد 💬
              </button>
            </form>

          </div>
        ))}
      </div>

    </div>
  );
}