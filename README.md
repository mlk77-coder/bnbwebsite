# BNB Store — storefront (Next.js)

## Stack

- **Next.js** 16 (App Router؛ **Turbopack** مفعّل صراحةً في `npm run dev` و`npm run build` عبر `--turbopack` لأن `next dev` الافتراضي ما زال webpack)
- **React** 19
- **Tailwind CSS** 4 (ثيم عبر `src/app/[locale]/globals.css`: `@theme`, `@source`, `@plugin`)
- **next-intl** 4 (توجيه وترجمة)
- **next-auth** 4
- **TypeScript** 5

## التشغيل المحلي

```bash
npm install
npm run dev
```

يفتح المشروع على المنفذ الافتراضي لـ Next (غالباً `http://localhost:3000`). المسارات تحت `[locale]` (مثل `/en`، `/ar`).

## أوامر مفيدة

```bash
npm run build   # بناء إنتاج (Turbopack) + فحص TypeScript
npm run lint    # ESLint (flat config: eslint.config.mjs)
npm run start   # تشغيل بعد build
```

## ملاحظات

- **بيئة التشغيل:** انسخ المتغيرات إلى `.env` أو `.env.local` (الملفات محظورة في Git).
- **صور الـ CDN:** عرّف `NEXT_PUBLIC_IMAGE_REMOTE_HOSTS` بقائمة نطاقات مفصولة بفواصل (مثل `cdn.example.com,api.example.com`) لأن `next/image` يسمح فقط بهذه النطاقات عبر `remotePatterns`.
- **تثبيت الحزم:** المشروع يستخدم `legacy-peer-deps` (انظر `.npmrc`) بسبب بعض المكتبات مع React 19.
- **shadcn:** الإعداد في `components.json`؛ مسار Tailwind v4 يشير إلى نفس ملف `globals.css`.

## النشر

مناسب لـ Vercel أو أي استضافة تدعم Node لـ Next.js 16. راجع [توثيق نشر Next.js](https://nextjs.org/docs/app/building-your-application/deploying).
