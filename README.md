# ระบบติดตามการบ้าน (Homework Tracker)

ระบบติดตามการบ้านสำหรับนักเรียน พัฒนาด้วย Next.js, Prisma, MySQL และ Line Messaging API

## ✨ ฟีเจอร์หลัก

- 🔐 **ระบบ Authentication** - ลงทะเบียนและเข้าสู่ระบบด้วย username/password
- 📚 **จัดการการบ้าน** - เพิ่ม แก้ไข ลบ และติดตามสถานะการบ้าน
- 🔔 **ระบบแจ้งเตือน** - ส่งข้อความแจ้งเตือนไปยัง Line เมื่อการบ้านใกล้หมดเวลา
- ⏰ **Cron Jobs** - ตรวจสอบการบ้านอัตโนมัติทุก 30 นาที, 1 ชั่วโมง และ 6 ชั่วโมง
- 📱 **Line Integration** - ส่งข้อความไปยังทุกคนที่แอด Line Bot เป็นเพื่อน

## 🚀 การติดตั้ง

### 1. Clone โปรเจค
```bash
git clone <repository-url>
cd homework
```

### 2. ติดตั้ง Dependencies
```bash
npm install
```

### 3. ตั้งค่า Database
```bash
# สร้างไฟล์ .env จาก env.example
cp env.example .env

# แก้ไข DATABASE_URL ในไฟล์ .env
DATABASE_URL="mysql://username:password@localhost:3306/homework_tracker"
```

### 4. ตั้งค่า Prisma
```bash
# สร้าง database และ tables
npx prisma db push

# สร้าง Prisma Client
npx prisma generate
```

### 5. ตั้งค่า Line Bot (สำหรับระบบแจ้งเตือน)
1. สร้าง Line Bot Channel ที่ [Line Developers Console](https://developers.line.biz/)
2. คัดลอก Channel Access Token
3. เพิ่มในไฟล์ .env:
```env
LINE_CHANNEL_ACCESS_TOKEN="your-channel-access-token-here"
```

### 6. รันโปรเจค
```bash
npm run dev
```

## 📱 การใช้งาน Line Bot

### ข้อดีของการใช้ Broadcast:
- **ไม่ต้องหา LINE_USER_ID** ของแต่ละคน
- **ส่งข้อความได้ง่าย** เพียงแค่แอด Bot เป็นเพื่อน
- **รองรับผู้ใช้หลายคน** โดยอัตโนมัติ

### วิธีการใช้งาน:
1. สร้าง Line Bot ตามคู่มือใน `LINE_SETUP.md`
2. แอด Line Bot เป็นเพื่อน
3. ตั้งค่า Channel Access Token ในไฟล์ .env
4. ระบบจะส่งข้อความไปยังทุกคนที่แอด Bot เป็นเพื่อน

## 🔧 การตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์หลัก:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/homework_tracker"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# Line Messaging API Configuration
LINE_CHANNEL_ACCESS_TOKEN="your-line-channel-access-token-here"
```

## 📋 ฟีเจอร์ระบบแจ้งเตือน

### ความถี่การตรวจสอบ:
- **ทุก 30 นาที** - สำหรับการบ้านที่ใกล้หมดเวลา (1 ชั่วโมง)
- **ทุก 1 ชั่วโมง** - สำหรับการบ้านที่เหลือเวลา 1 วัน
- **ทุก 6 ชั่วโมง** - สำหรับการบ้านที่เหลือเวลา 2 วัน

### ข้อความแจ้งเตือน:
- 🚨 การบ้านที่เหลือเวลา 1 ชั่วโมง
- ⚠️ การบ้านที่เหลือเวลา 1 วัน
- 📚 การบ้านที่เหลือเวลา 2 วัน

## 🛠️ การพัฒนา

### โครงสร้างโปรเจค:
```
src/
├── app/
│   ├── api/           # API routes
│   ├── admin/         # Admin pages
│   ├── homework/      # Homework pages
│   ├── login/         # Authentication pages
│   └── register/
├── lib/
│   ├── db.js         # Prisma client
│   ├── auth.js       # Authentication utilities
│   └── cron.js       # Cron jobs
└── components/       # React components
```

### คำสั่งที่มีประโยชน์:
```bash
# ดู Prisma Studio
npx prisma studio

# Reset database
npx prisma db push --force-reset

# Generate Prisma client
npx prisma generate
```

## 📚 เอกสารเพิ่มเติม

- [LINE_SETUP.md](./LINE_SETUP.md) - คู่มือการตั้งค่า Line Bot
- [CHANGELOG.md](./CHANGELOG.md) - ประวัติการเปลี่ยนแปลง
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - การแก้ไขปัญหา

## 🤝 การมีส่วนร่วม

1. Fork โปรเจค
2. สร้าง Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📄 License

โปรเจคนี้อยู่ภายใต้ MIT License - ดูรายละเอียดในไฟล์ [LICENSE](LICENSE)
