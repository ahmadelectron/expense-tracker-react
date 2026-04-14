<img width="915" height="708" alt="Annotation 2026-04-14 225348" src="https://github.com/user-attachments/assets/82a68a31-79f5-4eb7-afa8-25a09b8797b2" />


# Expense Tracker - Redux Version 🚀

یک اپلیکیشن حرفه‌ای مدیریت هزینه‌ها که با **React** و **Redux Toolkit** بازنویسی شده است. این پروژه دارای سیستم احراز هویت، نمودارهای تحلیلی و قابلیت مدیریت داده‌ها با اکسل است.

## ✨ قابلیت‌های کلیدی (Features)
- **State Management:** مدیریت وضعیت پیشرفته با Redux Toolkit.
- **Authentication:** سیستم ثبت‌نام و ورود کاربر (AuthContext Refactored).
- **Data Export/Import:** خروجی گرفتن از تراکنش‌ها در قالب فایل **Excel** و وارد کردن مجدد داده‌ها.
- **Charts:** تحلیل بصری درآمدها و هزینه‌ها با استفاده از Recharts.
- **Modern UI:** رابط کاربری مدرن با استفاده از Sass و طراحی Sidebar برای تنظیمات.
- **Responsive:** کاملاً واکنش‌گرا برای موبایل و دسکتاپ.

## 🛠 تکنولوژی‌های استفاده شده (Tech Stack)
- React.js
- Redux Toolkit (Slices, Store)
- React Router DOM
- Recharts (نمودارها)
- XLSX (مدیریت فایل اکسل)
- Sass (استایل‌دهی)
- React Hook Form & Yup (مدیریت فرم‌ها و اعتبارسنجی)

## 🚀 راه اندازی پروژه (Installation)

```
git clone https://github.com
cd expense-tracker-react
git checkout redux-version
npm install
npm run dev
```
📈 ساختار پروژه (Project Structure)
پروژه از معماری Feature-based استفاده می‌کند:
src/store: شامل اسلایس‌های ریداکس (Auth & Transactions).
src/components: کامپوننت‌های بازمصرف‌پذیر (Sidebar, Button, Charts).
src/hooks: هوک‌های اختصاصی برای محاسبات مالی.

